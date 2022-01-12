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

  return (
    <>
      <Backdrop open={isShow} />
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Styled.CloneButton onClick={handleDial}>hi</Styled.CloneButton>
          <Styled.Temp
            isShow={isShow}
            style={isAnimationDone ? { zIndex: '-100' } : {}}
          >
            <Styled.CloneItemBox ref={scrollRef} isShow={isShow}>
              {users.map((user, index) => {
                return (
                  <Styled.CloneSpan key={user.name + index}>
                    <Styled.CloneNameSpan
                      isShow={isShow}
                      style={{
                        transitionDelay: `${
                          (isShow ? index : users.length - index) *
                          (200 / users.length)
                        }ms`,
                      }}
                    >
                      {user.name}
                    </Styled.CloneNameSpan>
                    <Styled.CloneItem
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
                    ></Styled.CloneItem>
                  </Styled.CloneSpan>
                );
              })}
              <Styled.CloneSpan>
                <Styled.CloneNameSpan
                  isShow={isShow}
                  style={{
                    transitionDelay: `${
                      (isShow ? users.length : 0) * (200 / users.length)
                    }ms`,
                  }}
                >
                  Add
                </Styled.CloneNameSpan>
                <Styled.CloneItem
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
                ></Styled.CloneItem>
              </Styled.CloneSpan>
            </Styled.CloneItemBox>
          </Styled.Temp>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default Users;
