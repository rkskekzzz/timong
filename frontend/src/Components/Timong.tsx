import React, { useState } from 'react';
import moment from 'moment';

import { Year } from '../Entities/Date';
import buildYear from '../Utils/buildDate';
import Box from '@mui/material/Box';
import * as Styled from './Timong.styled';

import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';

const year: Year = buildYear(moment());

const Timong = () => {
  return (
    <>
      <Header />
      <Styled.Body id="body">
        <Styled.MainComponent>
          <Calendar year={year} />
        </Styled.MainComponent>
      </Styled.Body>
      <Users />
    </>
  );
};

export default Timong;
