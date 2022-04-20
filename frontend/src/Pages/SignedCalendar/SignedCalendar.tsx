import React, { useContext, useEffect, useState } from 'react';
import Styled from './SignedCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import List from './List';
import Header from 'src/Components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/firebase';

const SignedCalendar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState();
  const theme = useTheme();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SIGNIN', uid: user.uid });
      }
    });
  }, []);

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
