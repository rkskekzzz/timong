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
import { updateSignedCalendarListByElement } from 'src/Hooks/firebaseRelation';
import { addUserInCalendar } from 'src/Hooks/userController';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { UserService } from 'src/Network/UserService';
import { Calendar } from 'src/Interface/CalendarType';

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
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  const handleCopyTrue = () => setIsCopy(true);
  const handleCopyFalse = () => setIsCopy(false);

  const addUser = async (user: User) => {
    console.log(user.name);
    await addUserInCalendar(
      user,
      state.users,
      '/' + state.calendarList[selectedIndex]._id,
      state.isSigned !== null
    );
    await updateSignedCalendarListByElement(
      state,
      updateCalendarList(state, selectedIndex, user.name)
    );
  };

  const actionAddModalOpen = () => {
    handleModalOpen();
  };

  const actionEdit = () => {
    dispatch({ type: 'SETSELECTEDUSER', user: state.users[isUserCreated] });
  };

  const actionEditProfile = () => {
    if (confirm('유저를 삭제하시겠습니까?')) {
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

  const actionFindUser = () => alert('개발중입니다!');

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
    { icon: <ShareIcon />, name: '프로필만들기', action: actionAddModalOpen },
  ];
  const actionAftereUserSettup = [
    { icon: <EventAvailableIcon />, name: '날짜선택', action: actionEdit },
    {
      icon: <ManageAccountsOutlinedIcon />,
      name: '프로필삭제',
      action: actionEditProfile,
    },
    { icon: <SearchIcon />, name: '유저검색', action: actionFindUser },
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
        placeholder="유저 이름을 입력해주세요..."
        action={addUser}
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
          'transition': 'all 0.5s ease-out 0s',
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
