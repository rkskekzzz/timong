import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { User } from '../../Interface/UserType';
import AddModal from '../Modal';
import Styled from './Users.styled';
import { globalSelectedUser } from '../../Interface/UserType';
import Backdrop from '@mui/material/Backdrop';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import FaceIcon from '@mui/icons-material/Face';
import { UserContext } from 'src/App';
import { UserService } from 'src/Network/UserService';
import Switch from '../Switch/Switch';
import arrow from 'src/assets/arrow.png';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';

const Users = () => {
  const location = useLocation();
  const [isAnimationDone, setIsAnimationDone] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isSwipe, setIsSwipe] = useState<number>(-1);
  const [isSwipeMore, setIsSwipeMore] = useState<boolean>(false);
  const [willDelete, setWillDelete] = useState<number>(-1);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isShowSwitch, setIsShowSwitch] = useState<boolean>(false);

  const { state, dispatch } = useContext(UserContext);
  const theme = useTheme();
  const users = state.users;

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelectedUserDelete = useCallback(() => {
    setIsShowSwitch(false);
    setTimeout(() => {
      setSelectedUser(null);
    }, 200);
  }, [setSelectedUser, setIsShowSwitch]);
  const handleClickAway = useCallback(() => {
    if (isShowModal) return;
    setIsShow(false);
    setIsSwipe(-1);
    setTimeout(() => {
      setIsAnimationDone(true);
    }, 500);
  }, [isShowModal, setIsShow, setIsSwipe, setIsAnimationDone]);
  const handleDial = useCallback(() => {
    if (!isShow && !isAnimationDone) return;
    setIsShow(!isShow);
    setIsSwipe(-1);
    setIsAnimationDone(false);
    setTimeout(() => {
      if (isShow && scrollRef && scrollRef.current) {
        scrollRef.current.scrollTop = 0;
        setIsAnimationDone(true);
      }
    }, 500);
  }, [
    isShow,
    isAnimationDone,
    setIsShow,
    setIsSwipe,
    setIsAnimationDone,
    scrollRef,
  ]);
  const handleUserTabbed = useCallback(
    (index: number) => {
      setSelectedUser(users[index]);
      setTimeout(() => {
        setIsShowSwitch(true);
      }, 0);
      handleDial();
    },
    [setSelectedUser, handleDial, setIsShowSwitch]
  );
  const handleRowDelButton = useCallback(
    (delIndex: number, user: User) => {
      // console.log(isShow, isAnimationDone, willDelete, isSwipe);
      if (!isShow || isAnimationDone || isSwipe < 0) return;
      setWillDelete(delIndex);
      setIsSwipe(-1);
      setTimeout(() => {
        if (!dispatch) throw new Error('no dispatch');
        // TODO: del 에러나면 alert띄우기
        UserService.deleteUser(window.location.pathname, user._id);
        dispatch({ type: 'DELETE', index: delIndex, user });
        setWillDelete(-1);
      }, 1000);
    },
    [isShow, isAnimationDone, setIsSwipe, setWillDelete, dispatch, isSwipe]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      setTouchStart(e.targetTouches[0].clientX);
    },
    [setTouchStart]
  );
  const handleMouseStart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTouchStart(e.clientX);
    },
    [setTouchStart]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLSpanElement>, index: number) => {
      if (touchStart - e.targetTouches[0].clientX > 50) {
        setIsSwipe(index);
      }
      if (touchStart - e.targetTouches[0].clientX > 200) {
        setIsSwipeMore(true);
        setIsSwipe(-1);
      }
    },
    [touchStart, setIsSwipe, setIsSwipeMore]
  );
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
      if (touchStart === 0) return;
      if (touchStart - e.clientX > 50) {
        setIsSwipe(index);
      }
      if (touchStart - e.clientX > 200) {
        setIsSwipe(-1);
        setIsSwipeMore(true);
      }
    },
    [touchStart, setIsSwipe, setIsSwipeMore]
  );
  const handleTouchEnd = useCallback(
    (index: number, user: User) => {
      isSwipeMore && handleRowDelButton(index, user);
      setIsSwipeMore(false);
    },
    [isSwipeMore, handleRowDelButton, setIsSwipeMore]
  );
  const handleMouseEnd = useCallback(
    (index: number, user: User) => {
      setTouchStart(0);
      isSwipeMore && handleRowDelButton(index, user);
      setIsSwipeMore(false);
    },
    [isSwipeMore, handleRowDelButton, setIsSwipeMore]
  );
  const handleModalOpen = () => {
    setIsShowModal(true);
  };
  const handleModalClose = () => {
    setIsShowModal(false);
  };
  const handleToggle = useCallback(
    () => setIsChecked(!isChecked),
    [setIsChecked, isChecked]
  );
  const handleAddUserButton = useCallback(() => {
    if (users.length >= 16) alert('It is already the maximum!');
    else handleModalOpen();
  }, [handleModalOpen, users]);
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
      dispatch({ type: 'ADD', user: result });
      setIsAdd(true);
    },
    [dispatch, users]
  );
  useEffect(() => {
    if (isShow) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = '';
  }, [isShow]);
  useEffect(() => {
    globalSelectedUser.user = selectedUser;
    globalSelectedUser.valid = isChecked;
  }, [selectedUser, isChecked]);
  useEffect(() => {
    if (!isAdd) return;
    setSelectedUser(users[users.length - 1]);
    const timer = setTimeout(() => {
      setIsShowSwitch(true);
      setIsAdd(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [users, isAdd]);

  return (
    <>
      {selectedUser && (
        <>
          <Styled.SelectedUserSpan
            bgcolor={selectedUser.color}
            isShowSwitch={isShowSwitch}
          >
            {selectedUser.name}
          </Styled.SelectedUserSpan>
          <Switch
            isChecked={isChecked}
            handleToggle={handleToggle}
            isShowSwitch={isShowSwitch}
          />
        </>
      )}
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
          {selectedUser && (
            <Styled.DialButton
              isShow={selectedUser ? true : false}
              onClick={handleSelectedUserDelete}
            >
              <FaceRetouchingOffIcon
                fontSize="large"
                sx={{ color: theme.myPalette.icon }}
              />
            </Styled.DialButton>
          )}
          {!selectedUser && (
            <Styled.DialButton
              isShow={selectedUser ? true : false}
              onClick={handleDial}
            >
              <FaceIcon fontSize="large" sx={{ color: theme.myPalette.icon }} />
            </Styled.DialButton>
          )}
          <Styled.Temp
            isShow={isShow}
            style={isAnimationDone ? { zIndex: '-100' } : { zIndex: '300' }}
          >
            <Styled.DialBox ref={scrollRef} isShow={isShow}>
              {users.map((user, index) => {
                return (
                  <Styled.DialRow
                    key={user.name + index}
                    onTouchStart={handleTouchStart}
                    onTouchMove={(e) => {
                      handleTouchMove(e, index);
                    }}
                    onTouchEnd={() => {
                      handleTouchEnd(index, user);
                    }}
                    onMouseDown={handleMouseStart}
                    onMouseMove={(e) => {
                      handleMouseMove(e, index);
                    }}
                    onMouseUp={() => {
                      handleMouseEnd(index, user);
                    }}
                    willDelete={willDelete === index ? true : false}
                    isSwipe={isSwipe === index ? true : false}
                  >
                    {index === 0 && isShow && (
                      <Styled.DialRowName
                        className="guide del"
                        isShow={isShow}
                        style={{
                          transitionDelay: `${
                            (isShow ? index : users.length - index) *
                            (200 / users.length)
                          }ms`,
                        }}
                      >
                        {' Swipe left to Delete '}
                        <img
                          className="rev"
                          width={'20px'}
                          src={arrow}
                          alt="left arrow"
                        />
                      </Styled.DialRowName>
                    )}
                    <Styled.DialRowName
                      isShow={isShow}
                      style={{
                        transitionDelay: `${
                          (isShow ? index : users.length - index) *
                          (200 / users.length)
                        }ms`,
                      }}
                    >
                      {user.name}
                    </Styled.DialRowName>
                    <Styled.DialRowProfile
                      style={{
                        transitionDelay: `${
                          (isShow ? index : users.length - index) *
                          (200 / users.length)
                        }ms`,
                      }}
                      isShow={isShow}
                      bgcolor={user.color}
                      onClick={() => {
                        handleUserTabbed(index);
                      }}
                    />
                    <Styled.DialRowDelButton>
                      <DeleteForeverRoundedIcon
                        fontSize="medium"
                        onClick={() => {
                          handleRowDelButton(index, user);
                        }}
                      />
                    </Styled.DialRowDelButton>
                  </Styled.DialRow>
                );
              })}
              <Styled.DialRow isSwipe={false} willDelete={false}>
                {users.length === 0 && (
                  <Styled.DialRowName
                    className="guide"
                    isShow={isShow}
                    style={{
                      transitionDelay: `${
                        (isShow ? users.length : 0) * (200 / users.length)
                      }ms`,
                    }}
                  >
                    {'Click to Add User '}
                    <img width={'20px'} src={arrow} alt="arrow" />
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

export default Users;
