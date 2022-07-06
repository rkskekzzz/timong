import React, { useContext, useEffect, useState, useRef } from 'react';
import Styled from './SignedCalendar.styled';
import { useTheme } from '@mui/material';
import { UserContext } from 'src/App';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from 'src/firebase';
import { CalendarService } from 'src/Network/CalendarService';
import { fetchCalendarList } from 'src/Hooks/firebaseRelation';
import Button from '@mui/material/Button';
import List from './List';
import Header from 'src/Components/Header';
import Monthly from 'src/Components/Calendar/Month';

const SignedCalendar = () => {
  const prevLength = useRef(0);
  const listRef = useRef(null);
  const theme = useTheme();
  const navi = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [mustReload, setMustReload] = useState<boolean>(false);
  const [isCalendarLoad, setIsCalendarLoad] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isUserCreated, setIsUserCreated] = useState<number>(-1);
  const [directUrl, setDirectUrl] = useState<boolean>(false);
  const database_id = location.search.split('=')[1];

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        dispatch({ type: 'SIGNIN', uid: _user.uid });
      } else {
        navi('/');
      }
    });
    if (location.search !== '') setDirectUrl(true);
  }, []);

  useEffect(() => {
    if (state.isSigned) fetchCalendarList(state, dispatch);
  }, [state.isSigned]);

  useEffect(() => {
    if (state.calendarList.length === 0) return;
    if (selectedIndex < 0 && directUrl && database_id) {
      let isFind = false;
      for (let i = 0; i < state.calendarList.length; i++) {
        if (state.calendarList[i]._id === database_id) {
          isFind = true;
          setSelectedIndex((prevState) => (prevState === i ? prevState : i));
          setDirectUrl(false);
          break;
        }
      }
      if (!isFind) {
        setSelectedIndex(0);
        alert('존재하지 않는 캘린더입니다.');
      }
    } else {
      if (prevLength.current < state.calendarList.length) {
        if (selectedIndex >= 0) setSelectedIndex(state.calendarList.length - 1);
        if (listRef && listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      } else if (prevLength.current > state.calendarList.length) {
        setSelectedIndex(-1);
        navi('/calendar');
      } else {
        setSelectedIndex((prevState) => prevState);
        setMustReload((prevState) => !prevState);
      }
      prevLength.current = state.calendarList.length;
    }
  }, [state.calendarList]);

  useEffect(() => {
    if (state.calendarList.length == 0) setIsCalendarLoad(true);
    if (selectedIndex < 0) return;
    const getCalendar = async () => {
      setIsCalendarLoad(false);
      const result = await CalendarService.getCalendar(
        '/' + state.calendarList[selectedIndex]._id
      );
      if (!result) setIsCalendarLoad(false);
      dispatch({
        type: 'INIT',
        users: result.users,
        meetingDays: result.meetingDays,
      });
      setIsCalendarLoad(true);
    };
    getCalendar();
  }, [selectedIndex, mustReload]);

  useEffect(() => {
    if (isCalendarLoad) setReLoad(false);
    if (reLoad) return;

    const timer = setTimeout(() => {
      setReLoad(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  useEffect(() => {
    if (isCalendarLoad || selectedIndex < 0) return;

    navi('/calendar?id=' + state.calendarList[selectedIndex]._id);
  }, [isCalendarLoad, selectedIndex]);

  useEffect(() => {
    if (selectedIndex < 0) return;

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
    <Styled.SignedCalendar
      bgcolor={theme.myPalette.background}
      height={window.innerHeight}
    >
      <div className="container">
        <Header calendarName="no" setSelectedIndex={setSelectedIndex} />
        <div className="body-box">
          <Styled.Body bgcolor={theme.myPalette.background}>
            <List
              listRef={listRef}
              calendarList={state.calendarList}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
            <div
              className={'responsive ' + (location.search ? 'show' : 'hidden')}
            >
              {!isCalendarLoad ? (
                <div
                  style={{
                    width: '100%',
                    height: 'calc(100vh - 60px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {reLoad ? (
                    <Button
                      size="large"
                      onClick={() => window.location.reload()}
                    >
                      Refresh!
                    </Button>
                  ) : (
                    <CircularProgress sx={{ color: theme.main.theme }} />
                  )}
                </div>
              ) : (
                <>
                  {selectedIndex === -1 ? (
                    <div
                      className="nocalendar"
                      style={{
                        color: theme.main.theme,
                        background: theme.myPalette.background,
                        width: '100%',
                        height: 'calc(100vh - 60px)',
                      }}
                    >
                      캘린더 선택하기
                    </div>
                  ) : (
                    <Monthly
                      selectedIndex={selectedIndex}
                      isUserCreated={isUserCreated}
                    />
                  )}
                </>
              )}
            </div>
          </Styled.Body>
        </div>
      </div>
    </Styled.SignedCalendar>
  );
};

export default SignedCalendar;
