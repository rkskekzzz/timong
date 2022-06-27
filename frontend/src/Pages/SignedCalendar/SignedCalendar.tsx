import React, { useContext, useEffect, useState } from 'react';

import Styled from './SignedCalendar.styled';
import { useTheme } from '@mui/material';

import { UserContext } from 'src/App';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from 'src/firebase';

import { Calendar } from 'src/Interface/CalendarType';
import List from './List';
import Header from 'src/Components/Header';
import Monthly from 'src/Components/Calendar/Month';

const SignedCalendar = () => {
  const theme = useTheme();
  const navi = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(UserContext);
  const [calendarList, setCalendarList] = useState<Calendar[]>([]);
  // const database_id = location.pathname.includes('calendar')
  //   ? location.search.substring(4)
  //   : location.pathname;

  // useEffect(() => {
  //   const this_calendar = calendarList.filter((calendar) => {
  //     return calendar._id === database_id;
  //   })[0];
  //   let isUserCreated = false;
  //   state.users.forEach((user) => {
  //     if (user.name === this_calendar.user_name) isUserCreated = true;
  //   });
  //   setIsShowModal(!isUserCreated);
  // }, [calendarList]);

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
        <Styled.Body bgcolor={theme.myPalette.background}>
          <div className="body-box">
            <List
              calendarList={calendarList}
              setCalendarList={setCalendarList}
            />
            <div
              className={'responsive ' + (location.search ? 'show' : 'hidden')}
            >
              <Monthly />
            </div>
          </div>
        </Styled.Body>
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
