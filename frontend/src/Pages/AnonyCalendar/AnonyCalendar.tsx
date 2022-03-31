import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './AnonyCalendar.styled';
import { Calendar } from 'src/Components/Calendar';
import Header from 'src/Components/Header';
import Users from 'src/Components/Users';
import { themes } from 'src/theme';
import { CalendarService } from 'src/Network/CalendarService';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { UserContext } from 'src/App';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { CalendarType } from 'src/Interface/CalendarType';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      mode: string;
      foregroundHeader: string;
      backgroundHeader: string;
      backgroundModal: string;
      backDropHeader: string;
      foreground: string;
      iconSmall: string;
      icon: string;
      foregroundSwitch: string;
      backgroundSwitch: string;
      foregroundAddButton: string;
      backgroundAddButton: string;
      backDrop: string;
      background: string;
    };
  }
  interface ThemeOptions {
    myPalette?: {
      mode?: string;
      foregroundHeader?: string;
      backgroundHeader?: string;
      backgroundModal?: string;
      backDropHeader?: string;
      foreground?: string;
      iconSmall?: string;
      icon?: string;
      foregroundSwitch?: string;
      backgroundSwitch?: string;
      foregroundAddButton?: string;
      backgroundAddButton?: string;
      backDrop?: string;
      background?: string;
    };
  }
}

const AnonyCalendar = () => {
  const location = useLocation();
  const navi = useNavigate();
  const { dispatch } = useContext(UserContext);
  // const [calendarType, setCalendarType] = useState<CalendarType>('Monthly');
  const calendarType: CalendarType = 'Monthly';
  const [themeChanged, setThemeChanged] = useState<boolean>(false);
  const [reLoad, setReLoad] = useState<boolean>(false);
  const [calendarName, setCalendarName] = useState<string>('');
  const [calendar, setCalendar] = useState<boolean>(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<string>(prefersDarkMode ? 'dark' : 'light');
  const toggleMode = () => {
    const _mode = mode === 'dark' ? 'light' : 'dark';
    setThemeChanged(true);
    setMode(_mode);
  };

  const getCalendar = async () => {
    const result = await CalendarService.getCalendar(
      '/' + location.pathname.split('/')[2]
    );
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

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: (
            themeChanged ? (mode === 'dark' ? false : true) : prefersDarkMode
          )
            ? 'dark'
            : 'light',
        },
        myPalette: (
          themeChanged ? (mode === 'dark' ? false : true) : prefersDarkMode
        )
          ? themes.dark
          : themes.light,
      }),
    [prefersDarkMode, mode, themeChanged]
  );

  useEffect(() => {
    document.body.style.background = theme.myPalette.background;
  }, [theme]);

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
    <>
      <ThemeProvider theme={theme}>
        <Header toggleMode={toggleMode} calendarName={calendarName} />
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
      </ThemeProvider>
    </>
  );
};

export default AnonyCalendar;
