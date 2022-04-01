import React from 'react';
import Styled from './List.styled';
import { Group } from 'src/Interface/Group';
import { useTheme } from '@mui/material';

const arr: Group[] = [
  { group_name: 'hi', group_users: 3, group_id: '1' },
  { group_name: 'asdf', group_users: 1, group_id: '2' },
  { group_name: 'qwer', group_users: 2, group_id: '3' },
];

const selectedStyle = {
  background: 'red',
};

const Card = ({ group }: { group: Group }) => {
  const theme = useTheme();
  return (
    <Styled.Card fgcolor={theme.myPalette.foreground}>
      <h2>{group.group_name}</h2>
      <p>{group.group_users}</p>
    </Styled.Card>
  );
};

const List = () => {
  return (
    <Styled.List>
      <div className="list-box">
        {arr.map((element) => {
          return <Card key={element.group_id} group={element} />;
        })}
      </div>
    </Styled.List>
  );
};

export default List;
