import React, { useState } from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from '../Styled/global.styled';
import { Day } from '../../Entities/Date';
import { User, globalSelectedUser } from '../../Entities/User';

const DayBox: React.FC<{ day: Day }> = ({ day }) => {
  const [users, setUsers] = useState<User[]>([]);

  const handleClick = () => {
    if (!day.isThisMonth) return;
    if (globalSelectedUser.user) {
      day.updateUser(globalSelectedUser.user);
      setUsers(day.getUsers());
    }
  };

  return (
    <Styled.CalendarBox onClick={handleClick}>
      <Styled.CalendarDateLabel isThisMonth={day.isThisMonth}>
        {day.moment.format('D')}
      </Styled.CalendarDateLabel>
      <Styled.CalendarDateCircleBox isThisMonth={day.isThisMonth}>
        <Styled.GridWrap>
          {users.map((user, index) => (
            <GlobalStyled.Circle
              key={user.name + index.toString()}
              size="small"
              color={user.color}
            />
          ))}
        </Styled.GridWrap>
      </Styled.CalendarDateCircleBox>
    </Styled.CalendarBox>
  );
};

export default DayBox;
