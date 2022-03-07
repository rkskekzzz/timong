/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DayLabel from 'src/Components/DayLabel';
import Styled from './UserDrawer.styled';
import GlobalStyled from 'src/Components/GlobalStyled/GlobalStyled.styled';
import { Day } from 'src/Interface/DateType';
import { UserWithValid } from 'src/Interface/UserType';
import { Backdrop, useTheme } from '@mui/material';
import Size from 'src/Common/Size';

const UserDrawer: React.FC<{
  touchRef: React.MutableRefObject<any>;
  selectedDay: Day | null;
  dayUsers: UserWithValid[];
  isShow: boolean;
  handleDrawerClose: () => void;
}> = ({ touchRef, selectedDay, dayUsers, isShow, handleDrawerClose }) => {
  const theme = useTheme();
  const list = () => {
    return (
      <Styled.UserList ref={touchRef}>
        <DayLabel selectedDay={selectedDay} />
        <div className="list">
          <span>
            {dayUsers.map((user) => {
              return (
                <Styled.UserBox key={user.info.name}>
                  {user.valid == 'POSIBLE' && (
                    <>
                      <GlobalStyled.Circle
                        size={Size.Small}
                        color={user.info.color}
                      />
                      <div>{user.info.name}</div>
                    </>
                  )}
                </Styled.UserBox>
              );
            })}
          </span>
          <span>
            {dayUsers.map((user) => {
              return (
                <Styled.UserBox key={user.info.name}>
                  {user.valid == 'IMPOSIBLE' && (
                    <>
                      <GlobalStyled.Xone
                        size={Size.Small}
                        color={user.info.color}
                      />
                      <div>{user.info.name}</div>
                    </>
                  )}
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
