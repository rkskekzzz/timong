import React from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from '../Styled/global.styled';
import { Day } from '../../Entities/Date';
import { User } from '../../Entities/User';

const DayBox: React.FC<{
  day: Day;
  users: User[];
  handleClick: () => void;
}> = ({ day, users, handleClick }) => {
  return (
    <Styled.CalendarBox onClick={handleClick} id="test">
      <Styled.CalendarDateLabel isThisMonth={day.isThisMonth}>
        {day.moment.format('D')}
      </Styled.CalendarDateLabel>
      <Styled.CalendarDateCircleBox isThisMonth={day.isThisMonth}>
        <Styled.GridWrap>
          {users.map((user, index) => (
            // <GlobalStyled.Circle
            //   key={user.name + index.toString()}
            //   size="small"
            //   color={user.color}
            // />
            <GlobalStyled.Xone
              key={user.name + index.toString()}
              color={user.color}
            />
          ))}
        </Styled.GridWrap>
      </Styled.CalendarDateCircleBox>
    </Styled.CalendarBox>
  );
};

export default React.memo(DayBox);
