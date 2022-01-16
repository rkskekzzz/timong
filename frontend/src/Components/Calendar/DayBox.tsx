import React, { useState, useEffect, useContext } from 'react';
import Styled from './DayBox.styled';
import GlobalStyled from '../Styled/global.styled';
import { Day } from '../../Entities/Date';
import { User, globalSelectedUser } from '../../Entities/User';
import { UserContext } from '../Timong';

const DayBox: React.FC<{ day: Day; users: User[] }> = ({ day, users }) => {
  // const [users, setUsers] = useState<User[]>([]);

  const { state, dispatch } = useContext(UserContext);

  const handleClick = () => {
    // if (!day.isThisMonth) return;
    // if (globalSelectedUser.user) {
    //   day.updateUser(globalSelectedUser.user);
    //   setUsers(day.getUsers());
    // }
    if (!globalSelectedUser.user) return;
    dispatch({
      type: 'UPDATEDATE',
      user: globalSelectedUser.user,
      day: day.moment,
    });
  };

  return (
    <Styled.CalendarBox onClick={handleClick} id="test">
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

export default React.memo(DayBox);
