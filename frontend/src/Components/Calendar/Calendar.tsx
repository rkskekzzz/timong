import React, { useContext } from 'react';
import Styled from './Calendar.styled';
import MonthBox from './MonthBox';
import { UserContext } from 'src/App';
import { ThemeContext } from '../Timong';

const Calendar = () => {
  const { state } = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const year = state.calendar;

  return (
    <Styled.CalendarPaddingBox color={theme.foreground}>
      {year.map((month) => (
        <MonthBox key={month.monthMoment.format('MMMM')} month={month} />
      ))}
    </Styled.CalendarPaddingBox>
  );
};

export default React.memo(Calendar);
