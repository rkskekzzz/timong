import React, { useContext, useEffect } from 'react';
import Styled from './SignedCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import List from './List';
import Header from 'src/Components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from 'src/firebase';

const SignedCalendar = () => {
  const { dispatch } = useContext(UserContext);
  const theme = useTheme();
  const navi = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        dispatch({ type: 'SIGNIN', uid: _user.uid });
      } else {
        navi('/');
      }
    });
  }, []);

  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <Styled.SignedCalendar bgcolor={theme.myPalette.background}>
      <div className="container">
        <Header calendarName="no" />
        <div className="body">
          <List />
          <div
            className={'responsive ' + (location.search ? 'show' : 'hidden')}
          >
            <Calendar calendarType="Monthly" />
          </div>
        </div>
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
