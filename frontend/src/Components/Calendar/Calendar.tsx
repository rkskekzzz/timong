import React from 'react';
import Monthly from './Month';
import Weekly from './Week';
import { CalendarType } from 'src/Interface/CalendarType';

const Calendar: React.FC<{
  mode: string;
  calendarType: CalendarType;
}> = ({ mode, calendarType }) => {
  return (
    <>{calendarType === 'Monthly' ? <Monthly mode={mode} /> : <Weekly />}</>
  );
};

export default Calendar;
