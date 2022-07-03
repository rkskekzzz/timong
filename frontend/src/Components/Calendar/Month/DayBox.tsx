import React from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from 'src/Components/GlobalStyled/GlobalStyled.styled';
import { Day } from 'src/Interface/DateType';
import { User, Valid } from 'src/Interface/UserType';
import { useTheme } from '@mui/material';

const DayBox: React.FC<{
  day: Day;
  users: {
    info: User;
    valid: Valid;
  }[];
  isThisMonth: boolean;
  isToday: boolean;
  handleClick: () => void;
  gridSize: number;
}> = ({ day, users, handleClick, isThisMonth, isToday, gridSize }) => {
  const dayOfWeek = day.moment.day();
  const theme = useTheme();

  return (
    <Styled.CalendarBox
      onClick={isThisMonth ? handleClick : () => null}
      id="test"
      style={isThisMonth ? {} : { border: '0px' }}
    >
      <div
        className="vflex"
        style={
          isToday && isThisMonth
            ? { background: '#fbb5ff3c', borderRadius: '5px' }
            : {}
        }
      >
        <Styled.CalendarDateLabel
          isThisMonth={isThisMonth}
          dayOfWeek={dayOfWeek}
        >
          {day.moment.format('D')}
        </Styled.CalendarDateLabel>
        <Styled.CalendarDateCircleBox isThisMonth={isThisMonth}>
          <Styled.GridWrap gridSize={gridSize}>
            {users.map((user, index) => {
              const color =
                user.info.color === theme.myPalette.foregroundAddButton
                  ? theme.myPalette.backgroundAddButton
                  : user.info.color;
              if (user.valid == 'POSIBLE') {
                return (
                  <GlobalStyled.Circle
                    key={user.info.name + index.toString()}
                    color={color}
                  />
                );
              } else {
                return (
                  <GlobalStyled.Xone
                    key={user.info.name + index.toString()}
                    color={color}
                  />
                );
              }
            })}
          </Styled.GridWrap>
        </Styled.CalendarDateCircleBox>
      </div>
    </Styled.CalendarBox>
  );
};

export default DayBox;
