import React, { useState, useEffect, useRef, useContext } from 'react';
import { User } from '../../Interface/UserType';
import AddModal from '../Modal';
import Styled from './Users.styled';
import { globalSelectedUser } from '../../Interface/UserType';
import Backdrop from '@mui/material/Backdrop';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FaceIcon from '@mui/icons-material/Face';
import { UserContext } from 'src/App';
import { ThemeContext } from '../Timong';

const Users = () => {
  const [isAnimationDone, setIsAnimationDone] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isShow, setIsShow] = useState(false);

  const theme = useContext(ThemeContext);
  const { state, dispatch } = useContext(UserContext);
  const users = state.users;

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClickAway = () => {
    if (isShowModal) return;
    setIsShow(false);
    setIsSwipe(-1);
    setTimeout(() => {
      setIsAnimationDone(true);
    }, 500);
  };

  const handleDial = () => {
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
  };

  const handleUserTabbed = (index: number) => {
    setSelectedUser(users[index]);
    handleDial();
  };

  const handleRowDelButton = (delIndex: number, user: User) => {
    if (!isShow && !isAnimationDone) return;
    setIsSwipe(-1);
    setWillDelete(delIndex);
    setTimeout(() => {
      if (!dispatch) throw new Error('no dispatch');
      dispatch({ type: 'DELETE', index: delIndex, user });
      setWillDelete(-1);
    }, 500);
  };

  const handleAddUserButton = () => {
    handleModalOpen();
  };

  const resetScrollEffect = (element: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      if (element && element.current) {
        element.current.scrollTo(0, element.current.scrollTop - 56);
      }
    }, 50);
  };

  useEffect(() => {
    globalSelectedUser.user = selectedUser;
  }, [selectedUser]);

  /**
   *  TODO: 컴포넌트 분리
   */
  const [touchStart, setTouchStart] = useState(0);
  const [isSwipe, setIsSwipe] = useState<number>(-1);
  const [isSwipeMore, setIsSwipeMore] = useState<boolean>(false);
  const [willDelete, setWillDelete] = useState<number>(-1);

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) =>
    setTouchStart(e.targetTouches[0].clientX);

  const handleTouchMove = (
    e: React.TouchEvent<HTMLSpanElement>,
    index: number
  ) => {
    if (touchStart - e.targetTouches[0].clientX > 50) {
      console.log('left swipe');
      setIsSwipe(index);
    }
    if (touchStart - e.targetTouches[0].clientX > 200) {
      setIsSwipeMore(true);
      console.log('left swipe more');
    }
    if (touchStart - e.targetTouches[0].clientX < -120) {
      console.log('right swipe');
    }
  };

  const handleTouchEnd = (index: number, user: User) => {
    isSwipeMore && handleRowDelButton(index, user);
    setIsSwipeMore(false);
  };

  /**
   *  컴포넌트 분리
   */
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);
  const addUser = (user: User) => {
    if (!dispatch) throw new Error('no dispatch');
    dispatch({ type: 'ADD', user });
    setIsSwipe(-1);
    resetScrollEffect(scrollRef);
  };

  return (
    <>
      <Backdrop open={isShow} />
      <AddModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
        addUser={addUser}
      />
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Styled.DialButton onClick={handleDial}>
            <FaceIcon fontSize="large" sx={{ color: theme.icon }} />
          </Styled.DialButton>
          <Styled.Temp
            isShow={isShow}
            style={isAnimationDone ? { zIndex: '-100' } : {}}
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
                      color={user.color}
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
                        // sx={{ color: 'red' }}
                      />
                    </Styled.DialRowDelButton>
                  </Styled.DialRow>
                );
              })}
              <Styled.DialRow isSwipe={false} willDelete={false}>
                <Styled.DialRowProfile
                  style={{
                    transitionDelay: `${
                      (isShow ? users.length : 0) * (200 / users.length)
                    }ms`,
                  }}
                  isShow={isShow}
                  color="black"
                  onClick={() => {
                    handleAddUserButton();
                  }}
                ></Styled.DialRowProfile>
              </Styled.DialRow>
            </Styled.DialBox>
          </Styled.Temp>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default React.memo(Users);
