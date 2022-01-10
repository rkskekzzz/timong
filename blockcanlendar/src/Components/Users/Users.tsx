import React, { useState, useEffect } from 'react';
import { User } from '../../Entities/User';
import Styled from './Users.styled';
import UserBox from './UserBox';
import moment from 'moment';
import { Button } from '@mui/material';
import { globalSelectedUser } from '../../Entities/User';

function makeDate(year: number, month: number, day: number): moment.Moment {
  return moment(`${year}-${month}-${day}`);
}

const data: User[] = [
  {
    name: 'ycha',
    color: 'red',
    avail: [
      makeDate(2021, 1, 11),
      makeDate(2021, 1, 12),
      makeDate(2021, 1, 13),
    ],
  },
  {
    name: 'suhshin',
    color: 'blue',
    avail: [makeDate(2021, 1, 12), makeDate(2021, 1, 13)],
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(data);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleAddUserButton() {
    setUsers([...users, new User('asdf', 'blue', [])]);
  }

  useEffect(() => {
    globalSelectedUser.user = selectedUser;
  }, [selectedUser]);

  return (
    <div>
      <Styled.BottomShadowBox>
        <Styled.HScrollBox>
          {users.map((user, index) => (
            <UserBox
              key={user.name + index.toString()}
              user={user}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ))}
        </Styled.HScrollBox>
        <Button onClick={handleAddUserButton} size="large">
          +
        </Button>
      </Styled.BottomShadowBox>
    </div>
  );
};

export default Users;
