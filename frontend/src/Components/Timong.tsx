import React from 'react';
import moment from 'moment';

import { Year } from '../Entities/Date';
import buildYear from '../Utils/buildDate';
import Styled from './Timong.styled';

import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';

const year: Year = buildYear(moment());

const Timong = () => {
  return (
    <>
      <Header />
      <Styled.Body id="body">
        <Calendar year={year} />
      </Styled.Body>
      <Users />
    </>
  );
};

export default Timong;
