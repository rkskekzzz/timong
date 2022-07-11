import React, { useState, useMemo, useEffect, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import { useTheme } from '@mui/material';
import { User } from 'src/Interface/UserType';
import { UserContext } from 'src/App';
import AddModal from 'src/Components/Modal';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation } from 'react-router-dom';
import MySnackbar from './MySnackbar';
import { updateCalendarList } from 'src/Hooks/calendarController';
import {
  updateSignedCalendarListByElement,
  updateSignedCalendarProfile,
} from 'src/Hooks/firebaseRelation';
import {
  addUserInCalendar,
  updateUserInCalendar,
} from 'src/Hooks/userController';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SearchIcon from '@mui/icons-material/Search';
import { UserService } from 'src/Network/UserService';
import { Calendar } from 'src/Interface/CalendarType';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditButton: React.FC<{
  userDrawerRef: React.RefObject<HTMLDivElement>;
  timePickerRef: React.RefObject<HTMLDivElement>;
  isUserCreated: number;
  isShowEdit: boolean;
  isShow: boolean;
  selectedIndex: number;
  handleDrawerClose: () => void;
}> = ({
  userDrawerRef,
  timePickerRef,
  isUserCreated,
  isShowEdit,
  isShow,
  selectedIndex,
  handleDrawerClose,
}) => {
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  const [height, setHeight] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  const handleCopyTrue = () => setIsCopy(true);
  const handleCopyFalse = () => setIsCopy(false);

  const addUser = async (user: User) => {
    for (const _user of state.users) {
      if (_user.name === user.name) {
        alert('User name is aready exist');
        return;
      }
    }
    await addUserInCalendar(
      user,
      '/' + state.calendarList[selectedIndex]._id,
      state.isSigned !== null
    );
    await updateSignedCalendarListByElement(
      state,
      updateCalendarList(state, selectedIndex, user.name)
    );
  };

  const editUser = async (user: User) => {
    await updateUserInCalendar(
      user,
      state.users[isUserCreated]._id,
      '/' + state.calendarList[selectedIndex]._id
    );
    await updateSignedCalendarProfile(
      state.calendarList[selectedIndex]._id,
      user,
      state
    );
  };

  const handleModal = useMemo(() => {
    if (type) {
      return addUser;
    } else {
      return editUser;
    }
  }, [type]);

  /*  Action Function */
  const actionAddProfile = () => {
    setType(true);
    handleModalOpen();
  };

  const actionEditProfile = () => {
    setType(false);
    handleModalOpen();
  };

  const actionEdit = () => {
    dispatch({ type: 'SETSELECTEDUSER', user: state.users[isUserCreated] });
  };

  const actionDeleteProfile = () => {
    if (
      confirm(`프로필(${state.users[isUserCreated].name})을 삭제하시겠습니까?`)
    ) {
      UserService.deleteUser(
        '/' + state.calendarList[selectedIndex]._id,
        state.users[isUserCreated]._id
      );
      const newList = state.calendarList.map((calendar: Calendar) => {
        if (calendar.user_name === state.users[isUserCreated].name) {
          calendar.user_name = '';
        }
        return calendar;
      });
      dispatch({ type: 'SIGNED_SET_CALENDARLIST', calendarList: newList });
    } else {
      return;
    }
  };

  const actionFindProfile = () => alert('개발중입니다!');

  const actionShare = () => {
    const id = location.search.split('=')[1];
    const url =
      window.location.hostname +
      '/invite?id=' +
      id +
      '&?by=' +
      state.calendarList[selectedIndex].user_name;
    navigator.clipboard.writeText(url).then(
      function () {
        console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
    handleCopyTrue();
  };

  const actionBeforeUserSettup = [
    { icon: <ShareIcon />, name: '프로필만들기', action: actionAddProfile },
  ];
  const actionAftereUserSettup = [
    { icon: <EventAvailableIcon />, name: '날짜선택', action: actionEdit },
    {
      icon: <DeleteForeverIcon />,
      name: '프로필삭제',
      action: actionDeleteProfile,
    },
    {
      icon: <EditIcon />,
      name: '프로필수정',
      action: actionEditProfile,
    },
    { icon: <SearchIcon />, name: '유저검색', action: actionFindProfile },
    { icon: <ShareIcon />, name: '초대하기', action: actionShare },
  ];

  const actions = useMemo(() => {
    if (isUserCreated !== -1) {
      return actionAftereUserSettup;
    } else {
      return actionBeforeUserSettup;
    }
  }, [isUserCreated]);

  const handleCloseEdit = () => {
    dispatch({ type: 'SETSELECTEDUSER', user: null });
  };

  useEffect(() => {
    if (isShow) setHeight(userDrawerRef.current.clientHeight);
    if (isShowEdit) setHeight(timePickerRef.current.clientHeight);
    if (!isShow && !isShowEdit) setHeight(0);
  }, [isShow, isShowEdit]);

  return (
    <>
      <Backdrop
        open={open}
        sx={{ bgcolor: theme.myPalette.backDrop, zIndex: 200 }}
      />
      <AddModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
        placeholder={
          type ? '유저 이름을 입력해주세요...' : '수정할 이름을 입력해주세요...'
        }
        action={handleModal}
      />
      <MySnackbar isCopy={isCopy} handleCopyFalse={handleCopyFalse} />
      {/* dial 컴포넌트 분리 */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          'position': 'absolute',
          'bottom':
            isShow || (isShowEdit && state.selectedDate) ? height + 16 : 16,
          'right': 16,
          'zIndex': 200,
          'transition': 'all 0.5s ease-in-out 0s',
          '& .MuiButtonBase-root': {
            backgroundColor: state.users[isUserCreated]
              ? state.users[isUserCreated].color ===
                theme.myPalette.foregroundAddButton
                ? theme.myPalette.backgroundAddButton
                : state.users[isUserCreated].color
              : theme.main.theme,
            color: theme.myPalette.foregroundAddButton,
          },
        }}
        icon={state.selectedUser ? <CheckIcon /> : <SpeedDialIcon />}
        onClose={handleClose}
        onOpen={state.selectedUser ? () => null : handleOpen}
        onClick={state.selectedUser ? handleCloseEdit : () => null}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              action.action();
              handleClose();
              handleDrawerClose();
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default EditButton;
