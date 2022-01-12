import React, { useState } from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from '../Styled/global.styled';
import { Day } from '../../Entities/Date';
import { User, globalSelectedUser } from '../../Entities/User';
import moment from 'moment';

const DayBox: React.FC<{ day: Day }> = ({ day }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [startDate, setStartDate] = useState<Day>();
  const [endDate, setEndDate] = useState<Day>();

  const handleClick = () => {
    if (!day.isThisMonth) return;
    if (globalSelectedUser.user) {
      day.updateUser(globalSelectedUser.user);
      setUsers(day.getUsers());
    }
  };

  // const handleTouchStart = () => {
  //   setStartDate(day);
  // };

  // const handleTouchEnd = () => {
  //   setEndDate(day);
  //   if (
  //     !startDate ||
  //     !endDate ||
  //     !globalSelectedUser ||
  //     !globalSelectedUser.user
  //   )
  //     return;
  //   let _day = startDate;

  //   while (_day <= endDate) {
  //     _day.updateUser(globalSelectedUser.user);
  //     _day = _day.clone().add(1, 'd');
  //   }

  //   if (globalSelectedUser.user)
  //     globalSelectedUser.user.avail = [...globalSelectedUser.user.avail];
  // };

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
