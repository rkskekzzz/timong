import React, { useContext, useEffect } from 'react';
import Styled from './SignedCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import Header from 'src/Components/Header';

const SignedCalendar = () => {
  const { state } = useContext(UserContext);
  const theme = useTheme();
  useEffect(() => {
    // console.log(document.body.offsetWidth);
    // console.log(state.users);
  });
  return (
    <Styled.SignedCalendar>
      <Header calendarName="no" />
      <div className="body">
        <div style={{ color: theme.myPalette.foreground }}>list module</div>
        <Calendar calendarType="Monthly" />
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
