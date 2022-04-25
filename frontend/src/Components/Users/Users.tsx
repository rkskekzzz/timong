import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { User } from 'src/Interface/UserType';
import AddModal from '../Modal';
import Styled from './Users.styled';
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

const Users = () => {
  const location = useLocation();
  const [isAnimationDone, setIsAnimationDone] = useState<boolean>(true);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isSwipe, setIsSwipe] = useState<number>(-1);
  const [isSwipeMore, setIsSwipeMore] = useState<boolean>(false);
  const [willDelete, setWillDelete] = useState<number>(-1);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isButtonGuideShow, setIsButtonGuideShow] = useState<boolean>(true);
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);
  const { state, dispatch } = useContext(UserContext);
  const theme = useTheme();
  const users = state.users;

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDialClose = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: 'SETSELECTEUSER', user: null });
    }, 200);
  }, []);
  const handleClickAway = useCallback(() => {
    if (isShowModal) return;
    setIsShow(false);
    setIsSwipe(-1);
    setTimeout(() => {
      setIsAnimationDone(true);
    }, 500);
  }, [isShowModal, setIsShow, setIsSwipe, setIsAnimationDone]);
  const showGuide = useCallback(() => {
    setIsSwipe(0);
    setTimeout(() => {
      setIsSwipe(-1);
    }, 600);
    setIsFirstOpen(false);
  }, [setIsSwipe, setIsFirstOpen]);
  const handleDial = useCallback(() => {
    if (!isShow && !isAnimationDone) return;
    // if (isFirstOpen) showGuide();
    else setIsSwipe(-1);
    setIsShow(!isShow);
    dispatch({ type: 'SETSELECTEDATE', day: null });
    setIsAnimationDone(false);
    setTimeout(() => {
      if (isShow && scrollRef && scrollRef.current) {
        scrollRef.current.scrollTop = 0;
        setIsAnimationDone(true);
      }
    }, 500);
  }, [
    showGuide,
    isShow,
    isAnimationDone,
    setIsShow,
    setIsSwipe,
    setIsAnimationDone,
    scrollRef,
    isFirstOpen,
  ]);
  const handleUserTabbed = useCallback(
    (index: number) => {
      dispatch({ type: 'SETSELECTEUSER', user: users[index] });
      handleDial();
    },
    [handleDial, users]
  );
  const handleRowDelButton = useCallback(
    (delIndex: number, user: User) => {
      if (!isShow || isAnimationDone || isSwipe < 0) return;
      setWillDelete(delIndex);
      setIsSwipe(-1);
      setTimeout(() => {
        if (!dispatch) throw new Error('no dispatch');
        // TODO: del 에러나면 alert띄우기
        UserService.deleteUser(window.location.pathname, user._id);
        dispatch({ type: 'ANONY_DELETE', index: delIndex, user });
        setWillDelete(-1);
      }, 800);
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
      if (!isShow) return;
      if (touchStart - e.targetTouches[0].clientX > 50) {
        setIsSwipe(index);
        return;
      }
      if (touchStart - e.targetTouches[0].clientX < 200) {
        setIsSwipe(-1);
        return;
      }
      if (touchStart - e.targetTouches[0].clientX > 200) {
        setIsSwipeMore(true);
        setIsSwipe(-1);
      }
    },
    [touchStart, setIsSwipe, setIsSwipeMore, isShow]
  );
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
      if (touchStart === 0 || !isShow) return;
      if (touchStart - e.clientX > 50) {
        setTouchStart(0);
        setIsSwipe(index);
        return;
      }
      if (isSwipe !== -1 && touchStart - e.clientX < 400) {
        setIsSwipe(-1);
        setTouchStart(0);
        return;
      }
      if (touchStart - e.clientX > 400) {
        setIsSwipe(-1);
        setIsSwipeMore(true);
        return;
      }
    },
    [touchStart, setIsSwipe, setIsSwipeMore, isShow, isSwipe]
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
  const handleAddUserButton = useCallback(() => {
    handleModalOpen();
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
      dispatch({ type: 'ANONY_ADD', user: result });
      setIsAdd(true);
    },
    [dispatch, users]
  );
  useEffect(() => {
    if (isShow) window.document.body.style.overflow = 'hidden';
    else {
      setIsSwipe(-1);
      window.document.body.style.overflow = '';
    }
  }, [isShow]);
  useEffect(() => {
    if (!isAdd) return;
    dispatch({ type: 'SETSELECTEUSER', user: users[users.length - 1] });
    const timer = setTimeout(() => {
      setIsAdd(false);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [users, isAdd]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonGuideShow(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
          {state.selectedUser && (
            <Styled.DialButton
              isShow={state.selectedUser ? true : false}
              selectedDate={state.selectedDate}
              onClick={handleDialClose}
            >
              <FaceRetouchingOffIcon
                fontSize="large"
                sx={{ color: theme.myPalette.icon }}
              />
            </Styled.DialButton>
          )}
          {!state.selectedUser && (
            <Styled.DialButton
              isShow={state.selectedUser ? true : false}
              selectedDate={state.selectedDate}
              onClick={handleDial}
            >
              <div
                className={isButtonGuideShow ? 'buttonGuide' : 'hide'}
                style={{
                  color: theme.myPalette.foregroundHeader,
                  background: theme.myPalette.foreground + '22',
                }}
              >
                {'Click to Select User '}
                <img width={'20px'} src={arrow} alt="arrow" />
              </div>
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
                        sx={{ color: theme.myPalette.icon }}
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

export default Users;
