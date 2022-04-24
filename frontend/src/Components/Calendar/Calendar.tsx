import React from 'react';
import Monthly from './Month';
import Weekly from './Week';
import { CalendarType } from 'src/Interface/CalendarType';

const Calendar: React.FC<{
  calendarType: CalendarType;
}> = ({ calendarType }) => {
  return <>{calendarType === 'Monthly' ? <Monthly /> : <Weekly />}</>;
};

export default Calendar;
