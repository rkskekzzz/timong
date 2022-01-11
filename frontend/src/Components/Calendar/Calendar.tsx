import React from 'react';
import { User } from '../../Entities/User';
import Styled from './Calendar.styled';
import MonthBox from './MonthBox';
import { Year } from '../../Entities/Date';

const Calendar: React.FC<{ year: Year }> = ({ year }) => {
  return (
    <Styled.CalendarPaddingBox>
      {year.map((month) => (
        <MonthBox key={month.monthMoment.format('MMMM')} month={month} />
      ))}
    </Styled.CalendarPaddingBox>
  );
};

export default Calendar;
