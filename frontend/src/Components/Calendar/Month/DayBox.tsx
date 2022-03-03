import React from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from 'src/Components/Styled/global.styled';
import { Day } from 'src/Interface/DateType';
import { User, Valid } from 'src/Interface/UserType';

const DayBox: React.FC<{
  day: Day;
  users: {
    info: User;
    valid: Valid;
  }[];
  isThisMonth: boolean;
  isToday: boolean;
  handleClick: () => void;
}> = ({ day, users, handleClick, isThisMonth, isToday }) => {
  const dayOfWeek = day.moment.day();

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
          <Styled.GridWrap>
            {users.map((user, index) => {
              if (user.valid == 'POSIBLE') {
                return (
                  <GlobalStyled.Circle
                    key={user.info.name + index.toString()}
                    color={user.info.color}
                  />
                );
              } else {
                return (
                  <GlobalStyled.Xone
                    key={user.info.name + index.toString()}
                    color={user.info.color}
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
