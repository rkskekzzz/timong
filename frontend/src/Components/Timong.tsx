import React from 'react';
import Styled from './Timong.styled';
import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';

const Timong = () => {
  return (
    <>
      <Header />
      <Styled.Body id="body">
        <Calendar />
      </Styled.Body>
      <Users />
    </>
  );
};

export default React.memo(Timong);
