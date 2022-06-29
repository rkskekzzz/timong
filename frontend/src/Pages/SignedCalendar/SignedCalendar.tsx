import React, { useContext, useEffect, useState } from 'react';
import Styled from './SignedCalendar.styled';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from 'src/firebase';
import { CalendarService } from 'src/Network/CalendarService';
import List from './List';
import Header from 'src/Components/Header';
import Monthly from 'src/Components/Calendar/Month';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { dbService } from 'src/firebase';

const SignedCalendar = () => {
  const theme = useTheme();
  const navi = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  const [isCalendarLoad, setIsCalendarLoad] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isUserCreated, setIsUserCreated] = useState<number>(-1);
  const database_id = location.pathname.includes('calendar')
    ? location.search.substring(4)
    : location.pathname;

  const updateCalendarFirebase = async () => {
    const docRef = doc(dbService, 'TestUsers', state.isSigned);
    const calendar = await CalendarService.create('default');
    const user = await getDoc(docRef);
    if (!calendar || !user) alert('fail to fetch data..!!');
    setDoc(docRef, {
      ...user.data(),
      user_calendar_list: [...state.calendarList],
    });
  };

  const updateCalendar = (name: string) => {
    const calendarList = state.calendarList.map((calendar) => {
      const _calendar = calendar;
      if (calendar._id === database_id) _calendar.user_name = name;

      return calendar;
    });
    dispatch({ type: 'SIGNED_SET_CALENDARLIST', calendarList: calendarList });
    updateCalendarFirebase();
  };

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
    if (state.calendarList.length == 0) return;
    const getCalendar = async () => {
      setIsCalendarLoad(false);
      const result = await CalendarService.getCalendar(
        '/' + state.calendarList[selectedIndex]._id
      );
      if (!result) navi('/404');
      dispatch({
        type: 'INIT',
        users: result.users,
        meetingDays: result.meetingDays,
      });
      setIsCalendarLoad(true);
    };
    getCalendar();
  }, [selectedIndex]);

  useEffect(() => {
    if (isCalendarLoad)
      navi('/calendar/?id=' + state.calendarList[selectedIndex]._id);
  }, [isCalendarLoad]);

  useEffect(() => {
    let _isUserCreated = -1;
    const this_calendar = state.calendarList.find(
      (calendar) => calendar._id === state.calendarList[selectedIndex]._id
    );
    state.users.forEach((user, index) => {
      if (user.name === this_calendar.user_name) {
        _isUserCreated = index;
      }
    });
    setIsUserCreated(_isUserCreated);
  }, [state.users]);

  return (
    <Styled.SignedCalendar bgcolor={theme.myPalette.background}>
      <div className="container">
        <Header calendarName="no" />
        <Styled.Body bgcolor={theme.myPalette.background}>
          <div className="body-box">
            <List
              calendarList={state.calendarList}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
            <div
              className={'responsive ' + (location.search ? 'show' : 'hidden')}
            >
              <Monthly
                isUserCreated={isUserCreated}
                updateCalendar={updateCalendar}
              />
            </div>
          </div>
        </Styled.Body>
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
