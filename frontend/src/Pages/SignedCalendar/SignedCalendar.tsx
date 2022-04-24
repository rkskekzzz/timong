import React, { useContext, useEffect } from 'react';
import Styled from './SignedCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import List from './List';
import Header from 'src/Components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'src/firebase';
import EditButton from './List/EditButton';

const SignedCalendar = () => {
  const { dispatch } = useContext(UserContext);
  const theme = useTheme();
  const navi = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        dispatch({ type: 'SIGNIN', uid: _user.uid });
      } else {
        navi('/');
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
        <EditButton />
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
