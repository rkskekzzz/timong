import React, { useState } from 'react';
import moment from 'moment';

import { User } from '../Entities/User';
import { Year } from '../Entities/Date';
import buildYear from '../Utils/buildDate';

import * as Styled from './Timong.styled';

import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';

const year: Year = buildYear(moment());

const Timong = () => {
  return (
    <>
      <Header />
      <Styled.MainComponent>
        <Users />
        <Calendar year={year} />
      </Styled.MainComponent>
    </>
  );
};

export default Timong;
