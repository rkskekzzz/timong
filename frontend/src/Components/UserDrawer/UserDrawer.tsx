/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import DayLabel from 'src/Components/DayLabel';
import Styled from './UserDrawer.styled';
import GlobalStyled from 'src/Components/GlobalStyled/GlobalStyled.styled';
import { Day } from 'src/Interface/DateType';
import { UserWithValid } from 'src/Interface/UserType';
import { Backdrop, Divider, useTheme } from '@mui/material';
import Size from 'src/Common/Size';
import UserDrawerTimeBox from './UserDrawerTimeBox';

const UserDrawer: React.FC<{
  userDrawerRef: React.RefObject<HTMLDivElement>;
  touchRef: React.MutableRefObject<HTMLDivElement>;
  selectedDay: Day | null;
  dayUsers: UserWithValid[];
  isShow: boolean;
  handleDrawerClose: () => void;
}> = ({
  userDrawerRef,
  touchRef,
  selectedDay,
  dayUsers,
  isShow,
  handleDrawerClose,
}) => {
  const theme = useTheme();
  const [touchStart, setTouchStart] = useState<number>(0);
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

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setTouchStart(e.targetTouches[0].clientX);
    },
    [setTouchStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isShow) return;
      if (touchStart - e.targetTouches[0].clientX < 200) {
        handleDrawerClose();
      }
    },
    [touchStart, isShow]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStart(0);
  }, [setTouchStart]);

  useEffect(() => {
    if (isShow) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = '';
  }, [isShow]);

  const List = useCallback(
    ({ userArr, text }: { userArr: UserWithValid[]; text: string }) => {
      return (
        <>
          <div className="list-header">
            <b>{text}</b>
            <p>{userArr.length}명</p>
          </div>
          <div></div>
          <span id="list-box">
            {userArr.length !== 0 && (
              <Styled.UserBox>
                <div className="userinfo"></div>
                <div style={{ display: 'flex', gap: '0px' }}>
                  {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(
                    (num, index) => {
                      return (
                        <div
                          key={'label-' + index}
                          style={{
                            width: '17px',
                            fontSize: '7px',
                            textAlign: 'center',
                            letterSpacing: '-1px',
                            transform: 'translate(8px, 0px)',
                          }}
                        >
                          {num}
                        </div>
                      );
                    }
                  )}
                </div>
              </Styled.UserBox>
            )}
            {userArr.map((user) => {
              return (
                <Styled.UserBox key={user.info.name}>
                  <div className="userinfo">
                    <GlobalStyled.Circle
                      size={Size.Small}
                      color={user.info.color}
                    />
                    <div>{user.info.name}</div>
                  </div>
                  <UserDrawerTimeBox user={user} />
                </Styled.UserBox>
              );
            })}
          </span>
        </>
      );
    },
    []
  );

  return (
    <>
      <Backdrop
        open={isShow}
        onClick={handleDrawerClose}
        sx={{ zIndex: 100 }}
      />
      <Styled.UserDrawer
        ref={userDrawerRef}
        isShow={isShow}
        fgcolor={theme.myPalette.foreground}
        bgcolor={theme.myPalette.background}
        bgdropcolor={theme.myPalette.backDrop}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Styled.Puller />
        <Styled.UserList ref={touchRef}>
          <DayLabel selectedDay={selectedDay} />
          <div className="list">
            <List userArr={posibleDayUsers} text={'가능한 사람'} />
            <Divider />
            <List userArr={imposibleDayUsers} text={'불가능한 사람'} />
          </div>
        </Styled.UserList>
      </Styled.UserDrawer>
    </>
  );
};

export default UserDrawer;
