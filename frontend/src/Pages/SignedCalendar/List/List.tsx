import React from 'react';
import Styled from './List.styled';

const Card = () => {
  return <Styled.Card>card</Styled.Card>;
};

const List = () => {
  return (
    <Styled.List>
      <div className="list-box">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Styled.List>
  );
};

export default List;
