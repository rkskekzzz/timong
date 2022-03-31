import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './AnonyCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import Header from 'src/Components/Header';
import Users from 'src/Components/Users';
import { CalendarService } from 'src/Network/CalendarService';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { UserContext } from 'src/App';
import { useLocation } from 'react-router-dom';
import { CalendarType } from 'src/Interface/CalendarType';

const AnonyCalendar = () => {
  const location = useLocation();
  const navi = useNavigate();
  const { dispatch } = useContext(UserContext);
  const calendarType: CalendarType = 'Monthly';
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [calendarName, setCalendarName] = useState<string>('');
  const [calendar, setCalendar] = useState<boolean>(false);

  const getCalendar = async () => {
    const result = await CalendarService.getCalendar(location.pathname);
    console.log(result);
    if (result) {
      dispatch({
        type: 'INIT',
        users: result.users,
        meetingDays: result.meetingDays,
      });
      setCalendarName(result.name);
      setCalendar(true);
    } else {
      navi('/404');
    }
  };

  useEffect(() => {
    if (reLoad || calendar) return;
    getCalendar();
    const timer = setTimeout(() => {
      setReLoad(true);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Styled.AnonyCalendar>
      <Header calendarName={calendarName} />
      {!calendar ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {reLoad ? (
            <Button size="large" onClick={() => window.location.reload()}>
              Refresh!
            </Button>
          ) : (
            <CircularProgress />
          )}
        </div>
      ) : (
        <>
          <Styled.Body className="here">
            <Calendar calendarType={calendarType} />
            <Users />
          </Styled.Body>
        </>
      )}
    </Styled.AnonyCalendar>
  );
};

export default AnonyCalendar;
