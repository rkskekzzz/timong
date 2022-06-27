import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { User } from 'src/Interface/UserType';
import AddModal from 'src/Components/Modal';
import Styled from 'src/Components/Users/Users.styled';
import Backdrop from '@mui/material/Backdrop';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import FaceIcon from '@mui/icons-material/Face';
import { UserContext } from 'src/App';
import { UserService } from 'src/Network/UserService';
import arrow from 'src/assets/arrow.png';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

/**
 * 조건 1
 * 유저가 없다면
 * - 추가하기 버튼
 *
 * 유저가 있다면
 * - 날짜 선택 버튼
 * - 이름 및 색 변경 버튼
 * - 삭제하기 버튼
 * - 검색하기 버튼
 * @returns
 */
const EditButton = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isAnimationDone, setIsAnimationDone] = useState<boolean>(true);

  const { state, dispatch } = useContext(UserContext);

  const theme = useTheme();
  const users = state.users;

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClickAway = useCallback(() => {
    if (isShowModal) return;
    setIsShow(false);

    setTimeout(() => {
      setIsAnimationDone(true);
    }, 500);
  }, [isShowModal, setIsShow, setIsAnimationDone]);

  const addUser = useCallback(
    async (user: User) => {
      if (!dispatch) throw new Error('no dispatch');
      for (const _user of users) {
        if (_user.name === user.name) {
          alert('User name is aready exist');
          return;
        }
      }
      const result: User = await UserService.createUser(location.pathname, {
        name: user.name,
        color: user.color,
      });
      dispatch({ type: 'ANONY_ADD', user: result });
      setIsAdd(true);
    },
    [dispatch, users]
  );

  const handleAddUserButton = () => handleModalOpen();
  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  // const handleEditButtonTabbed = () => {
  //   dispatch({ type: 'SETSELECTEUSER', user: state.signedUser });
  //   console.log(state.signedUser);
  // };

  useEffect(() => {}, []);

  return (
    <>
      <Backdrop
        open={isShow}
        sx={{ bgcolor: theme.myPalette.backDrop, zIndex: 200 }}
      />
      <AddModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
        addUser={addUser}
      />
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Styled.Temp
            isShow={isShow}
            style={isAnimationDone ? { zIndex: '-100' } : { zIndex: '300' }}
          >
            <Styled.DialBox ref={scrollRef} isShow={isShow}>
              <Styled.DialRow isSwipe={false} willDelete={false}>
                {users.length === 0 && (
                  <Styled.DialRowName
                    // className="guide"
                    isShow={isShow}
                    style={{
                      transitionDelay: `${
                        (isShow ? users.length : 0) * (200 / users.length)
                      }ms`,
                    }}
                  >
                    {'Add User '}
                  </Styled.DialRowName>
                )}
                <Styled.DialRowProfile
                  style={{
                    transitionDelay: `${
                      (isShow ? users.length : 0) * (200 / users.length)
                    }ms`,
                    color: theme.myPalette.foregroundAddButton,
                    fontSize: '1.5rem',
                  }}
                  isShow={isShow}
                  bgcolor={theme.myPalette.backgroundAddButton}
                  onClick={() => {
                    handleAddUserButton();
                  }}
                >
                  +
                </Styled.DialRowProfile>
              </Styled.DialRow>
            </Styled.DialBox>
          </Styled.Temp>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default EditButton;
