import React, { useEffect, useState } from 'react';
import queryString from 'qs';
import Styled from './Timong.styled';
import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';
import { themes } from 'src/theme';
import { CalendarService } from 'src/Network/TimongService';
import CircularProgress from '@mui/material/CircularProgress';
import { Translate } from '@mui/icons-material';
import { Button } from '@mui/material';

export const ThemeContext = React.createContext(themes.light);

const qs = queryString.parse(location.search, {
  ignoreQueryPrefix: true,
});

const Timong = () => {
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [calendar, setCalendar] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(qs.mode + '' ?? 'light');
  const toggleMode = () => {
    const _mode = mode === 'dark' ? 'light' : 'dark';

    setMode(`${_mode}`);
  };

  const getCalendar = async () => {
    const result = await CalendarService.getCalendar();
    if (result) setCalendar(true);
    else console.log('here');
  };

  useEffect(() => {
    if (mode === 'dark')
      document.body.style.background = themes.dark.background;
    else document.body.style.background = themes.light.background;
  }, [mode]);

  useEffect(() => {
    if (reLoad) return;
    getCalendar();
    setTimeout(() => {
      setReLoad(true);
    }, 4000);
  }, [reLoad]);

  return (
    <>
      <ThemeContext.Provider
        value={mode === 'dark' ? themes.dark : themes.light}
      >
        <Header toggleMode={toggleMode} />
        {calendar ? (
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
                새로고침
              </Button>
            ) : (
              <CircularProgress />
            )}
          </div>
        ) : (
          <>
            <Styled.Body>
              <Calendar />
            </Styled.Body>
            <Users />
          </>
        )}
      </ThemeContext.Provider>
    </>
  );
};

export default Timong;
