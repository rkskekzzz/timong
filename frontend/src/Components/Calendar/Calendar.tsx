import React from 'react';
import Monthly from './Month';
import Weekly from './Week';
import { CalendarType } from 'src/Interface/CalendarType';

const Calendar: React.FC<{
  calendarType: CalendarType;
}> = ({ calendarType }) => {
  return <div>{calendarType === 'Monthly' ? <Monthly /> : <Weekly />}</div>;
};

export default Calendar;
