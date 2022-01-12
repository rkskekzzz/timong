import React, { useState, useEffect, useRef } from 'react';
import { User } from '../../Entities/User';

import moment from 'moment';
import * as Styled from './Users.styled';
import { globalSelectedUser } from '../../Entities/User';

import Backdrop from '@mui/material/Backdrop';
import ClickAwayListener from '@mui/material/ClickAwayListener';

function makeDate(year: number, month: number, day: number): moment.Moment {
  return moment(`${year}-${month}-${day}`);
}

const data: User[] = [
  {
    name: 'ycha',
    color: 'red',
    avail: [
      makeDate(2021, 1, 11),
      makeDate(2021, 1, 12),
      makeDate(2021, 1, 13),
    ],
  },
  {
    name: 'suhshin',
    color: 'blue',
    avail: [makeDate(2021, 1, 12), makeDate(2021, 1, 13)],
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(data);
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isShow, setIsShow] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClickAway = () => setIsShow(false);
  const handleDial = () => {
    if (!isShow && !isAnimationDone) return;
    setIsShow(!isShow);
    setIsTouch(-1);
    setIsAnimationDone(false);
    setTimeout(() => {
      if (isShow && scrollRef && scrollRef.current) {
        scrollRef.current.scrollTop = 0;
        setIsAnimationDone(true);
      }
    }, 500);
  };

  const handleUserTabbed = (user: User) => {
    handleDial();
    setSelectedUser(user);
  };

  const handleRowDelButton = (delIndex: number) => {
    if (!isShow && !isAnimationDone) return;
    setIsTouch(-1);
    setIsDelete(delIndex);
    setTimeout(() => {
      setUsers(
        users.filter((_, index) => {
          return index !== delIndex;
        })
      );
      setIsDelete(-1);
    }, 500);
  };

  const handleAddUserButton = () => {
    setUsers([...users, new User('asdf', 'blue', [])]);
    resetScrollEffect(scrollRef);
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
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTouch, setIsTouch] = useState<number>(-1);
  const [isDelete, setIsDelete] = useState<number>(-1);

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) =>
    setTouchStart(e.targetTouches[0].clientX);

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = (index: number) => {
    if (touchStart - touchEnd > 80) {
      console.log('left swipe');
      setIsTouch(index);
      console.log(`setIsTouch : ${index}`);
      console.log(`isTouch : ${isTouch}`);
    }
    if (touchStart - touchEnd < -120) {
      console.log('right swipe');
    }
  };

  return (
    <>
      <Backdrop open={isShow} />
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Styled.DialButton onClick={handleDial}>hi</Styled.DialButton>
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
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => {
                      handleTouchEnd(index);
                    }}
                    isDelete={isDelete === index ? true : false}
                    isSwipe={isTouch === index ? true : false}
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
                        handleUserTabbed(user);
                      }}
                    />
                    <Styled.DialRowDelButton
                      onClick={() => {
                        handleRowDelButton(index);
                      }}
                    >
                      hi{' '}
                    </Styled.DialRowDelButton>
                  </Styled.DialRow>
                );
              })}
              <Styled.DialRow isSwipe={false} isDelete={false}>
                <Styled.DialRowName
                  isShow={isShow}
                  style={{
                    transitionDelay: `${
                      (isShow ? users.length : 0) * (200 / users.length)
                    }ms`,
                  }}
                >
                  Add
                </Styled.DialRowName>
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

export default Users;
