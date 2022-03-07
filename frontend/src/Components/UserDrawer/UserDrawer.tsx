/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useEffect } from 'react';
import DayLabel from 'src/Components/DayLabel';
import Styled from './UserDrawer.styled';
import GlobalStyled from 'src/Components/GlobalStyled/GlobalStyled.styled';
import { Day } from 'src/Interface/DateType';
import { UserWithValid } from 'src/Interface/UserType';
import { Backdrop, Divider, useTheme } from '@mui/material';
import Size from 'src/Common/Size';

const UserDrawer: React.FC<{
  touchRef: React.MutableRefObject<any>;
  selectedDay: Day | null;
  dayUsers: UserWithValid[];
  isShow: boolean;
  handleDrawerClose: () => void;
}> = ({ touchRef, selectedDay, dayUsers, isShow, handleDrawerClose }) => {
  const theme = useTheme();
  const posibleDayUsers = useMemo(() => {
    const result = dayUsers.filter((user) => {
      if (user.valid == 'POSIBLE') return true;
      return false;
    });
    return result;
  }, [dayUsers]);
  const imposibleDayUsers = useMemo(() => {
    const result = dayUsers.filter((user) => {
      if (user.valid == 'IMPOSIBLE') return true;
      return false;
    });
    return result;
  }, [dayUsers]);

  useEffect(() => {
    if (isShow) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = '';
  }, [isShow]);

  const list = () => {
    return (
      <Styled.UserList ref={touchRef}>
        <DayLabel selectedDay={selectedDay} />
        <div className="list">
          <div className="list-header">
            <b>가능한 사람</b>
            <p>{posibleDayUsers.length}명</p>
          </div>
          <span>
            {posibleDayUsers.map((user) => {
              return (
                <Styled.UserBox key={user.info.name}>
                  <GlobalStyled.Circle
                    size={Size.Small}
                    color={user.info.color}
                  />
                  <div>{user.info.name}</div>
                  <div>usertimebox</div>
                </Styled.UserBox>
              );
            })}
          </span>
          <Divider />
          <div className="list-header">
            <b>불가능한 사람</b>
            <p>{imposibleDayUsers.length}명</p>
          </div>
          <span>
            {imposibleDayUsers.map((user) => {
              return (
                <Styled.UserBox key={user.info.name}>
                  <GlobalStyled.Xone
                    size={Size.Small}
                    color={user.info.color}
                  />
                  <div>{user.info.name}</div>
                </Styled.UserBox>
              );
            })}
          </span>
        </div>
      </Styled.UserList>
    );
  };

  return (
    <>
      <Backdrop open={isShow} onClick={handleDrawerClose} />
      <Styled.UserDrawer
        isShow={isShow}
        // onClose={handleDrawerClose}
        // onOpen={handleDrawerOpen}
        fgcolor={theme.myPalette.foreground}
        bgcolor={theme.myPalette.background}
        bgdropcolor={theme.myPalette.backDrop}
      >
        <Styled.Puller />
        {list()}
      </Styled.UserDrawer>
    </>
  );
};

export default UserDrawer;
