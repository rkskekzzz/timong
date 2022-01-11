import React from 'react';
import { User } from '../../Entities/User';
import Styled from './UserBox.styled';
import GlobalStyled from '../Styled/global.styled';

export const UserBox: React.FC<{
  user: User;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}> = ({ user, selectedUser, setSelectedUser }) => {
  const handleClick = () => {
    setSelectedUser(user);
  };

  return (
    <Styled.HFlexUserBox onClick={handleClick}>
      <GlobalStyled.Circle color={user.color} />
      <Styled.UserNameLabel>
        {user.name + (selectedUser === user ? '!' : '.')}
      </Styled.UserNameLabel>
    </Styled.HFlexUserBox>
  );
};

export default UserBox;
