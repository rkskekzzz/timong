import React, { useState, useMemo, useEffect, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { useTheme } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { UserService } from 'src/Network/UserService';
import { User } from 'src/Interface/UserType';
import { UserContext } from 'src/App';
import AddModal from 'src/Components/Modal';
import CheckIcon from '@mui/icons-material/Check';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

const selectdateName = '날짜선택';
const shareName = '공유하기';
const newprofileName = '프로필만들기';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const actionAftereUserSettup = [
  { icon: <FileCopyIcon />, name: selectdateName },
  // { icon: <SaveIcon />, name: '프로필 수정' },
  // { icon: <PrintIcon />, name: '유저 검색' },
  { icon: <ShareIcon />, name: shareName },
];

const actionBeforeUserSettup = [{ icon: <ShareIcon />, name: newprofileName }];

const EditButton: React.FC<{
  userDrawerRef: React.RefObject<HTMLDivElement>;
  timePickerRef: React.RefObject<HTMLDivElement>;
  isUserCreated: number;
  updateCalendar: (name: string) => void;
  isShowEdit: boolean;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  userDrawerRef,
  timePickerRef,
  isUserCreated,
  updateCalendar,
  isShowEdit,
  isShow,
  setIsShow,
}) => {
  const { state, dispatch } = useContext(UserContext);
  const [height, setHeight] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const database_id = location.pathname.includes('calendar')
    ? location.search.substring(4)
    : location.pathname;
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  const handleCopyTrue = () => setIsCopy(true);
  const handleCopyFalse = () => setIsCopy(false);

  const addUser = async (user: User) => {
    if (!dispatch) throw new Error('no dispatch');
    for (const _user of state.users) {
      if (_user.name === user.name) {
        alert('User name is aready exist');
        return;
      }
    }
    await UserService.createUser('/' + database_id, {
      name: user.name,
      color: user.color,
    });
    updateCalendar(user.name);
  };

  const actions = useMemo(() => {
    if (isUserCreated !== -1) {
      return actionAftereUserSettup;
    } else {
      return actionBeforeUserSettup;
    }
  }, [isUserCreated]);

  const editSchedule = () => {
    console.log('edit');
    console.log(state.users[isUserCreated]);
    dispatch({ type: 'SETSELECTEUSER', user: state.users[isUserCreated] });
  };

  // const editProfile = () => {
  //   console.log('editProfile');
  // };

  // const findUser = () => {
  //   console.log('findUser');
  // };

  const share = () => {
    const url = window.location.href;

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

  const addUserModalOpen = () => {
    handleModalOpen();
  };

  const handleCloseEdit = () => {
    dispatch({ type: 'SETSELECTEUSER', user: null });
  };

  const handleActions = (name: string) => {
    switch (name) {
      case selectdateName:
        editSchedule();
        break;
      // case '프로필 수정':
      //   editProfile();
      //   break;
      // case '유저 검색':
      //   findUser();
      //   break;
      case shareName:
        share();
        break;
      case newprofileName:
        addUserModalOpen();
        break;
      default:
        break;
    }
    setIsShow(false);
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
        addUser={addUser}
        placeholder="유저 이름을 입력해주세요..."
      />
      <div style={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isCopy}
          autoHideDuration={2000}
          onClose={handleCopyFalse}
        >
          <Alert
            onClose={handleCopyFalse}
            severity="success"
            sx={{ width: '100%' }}
          >
            복사되었습니다!
          </Alert>
        </Snackbar>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          'position': 'absolute',
          'bottom':
            isShow || (isShowEdit && state.selectedDate) ? height + 76 : 76,
          'right': 16,
          'zIndex': 200,
          'transition': 'all 0.5s ease-out 0s',
          '& .MuiButtonBase-root': {
            backgroundColor: theme.main.theme,
          },
          // '& .MuiSpeedDialAction-staticTooltipLabel': {
          //   color: '#dddddd',
          // },
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
              handleActions(action.name);
              handleClose();
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default EditButton;
