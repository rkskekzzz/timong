import React, { useEffect, useState } from 'react';
import queryString from 'qs';
import Styled from './Timong.styled';
import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';

export const themes = {
  light: {
    foregroundHeader: '#6a6a6a',
    backgroundHeader: '#f2f2f2',
    foreground: '#000000',
    icon: 'black',
  },
  dark: {
    foregroundHeader: '#f2f2f2',
    backgroundHeader: '#2a2a2a',
    foreground: '#dadada',
    icon: 'white',
  },
};

export const ThemeContext = React.createContext(themes.light);

const Timong = () => {
  const qs = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [mode, setMode] = useState<string>(qs.mode + '' ?? 'light');

  useEffect(() => {
    if (mode === 'dark') document.body.style.background = '#2f3336';
  }, []);

  return (
    <>
      <ThemeContext.Provider
        value={mode === 'dark' ? themes.dark : themes.light}
      >
        <Header />
        <Styled.Body>
          <Calendar />
        </Styled.Body>
        <Users />
      </ThemeContext.Provider>
    </>
  );
};

export default React.memo(Timong);
