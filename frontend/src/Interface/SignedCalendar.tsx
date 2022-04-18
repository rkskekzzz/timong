import React, { useContext, useEffect } from 'react';
import Styled from './SignedCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import List from './List';
import Header from 'src/Components/Header';

// TODO - edit 버튼 제작하기
const SignedCalendar = () => {
  const { state } = useContext(UserContext);
  const theme = useTheme();

  useEffect(() => {
    console.log(document.body.offsetWidth);
    // console.log(state.users);
  });

  return (
    <Styled.SignedCalendar bgcolor={theme.myPalette.background}>
      <div className="container">
        <Header calendarName="no" />
        <div className="body">
          <List />
          <Calendar calendarType="Monthly" />
        </div>
        {/* <button></button> */}
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
