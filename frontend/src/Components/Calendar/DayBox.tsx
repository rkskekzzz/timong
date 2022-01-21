import React from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from '../Styled/global.styled';
import { Day } from '../../Interface/DateType';
import { User, Valid } from '../../Interface/UserType';

const DayBox: React.FC<{
  day: Day;
  users: {
    info: User;
    valid: Valid;
  }[];
  isThisMonth: boolean;
  handleClick: () => void;
}> = ({ day, users, handleClick, isThisMonth }) => {
  return (
    <Styled.CalendarBox onClick={handleClick} id="test">
      <Styled.CalendarDateLabel isThisMonth={isThisMonth}>
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
    </Styled.CalendarBox>
  );
};

export default React.memo(DayBox);
