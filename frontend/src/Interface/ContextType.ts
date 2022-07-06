import moment from 'moment';
import { Dispatch } from 'react';
import { Day } from './DateType';
import { PaletteMode } from '@mui/material';
import { User, Valid } from './UserType';
import { Calendar } from './CalendarType';

export type State = {
  isSigned: string | null;
  users: User[];
  meetingDays: string[];
  calendarList: Calendar[];
  selectedCalendar: string;
  selectedDate: Day;
  selectedUser: User;
  selectedValid: Valid;
  signedUser: User;
  mode: PaletteMode;
};

export type Action =
  | { type: 'INIT'; users: [User]; meetingDays: [string] }
  | { type: 'SIGNIN'; uid: string }
  | { type: 'SIGNED_SET_USER'; calendar: Calendar }
  | { type: 'SIGNED_SET_CALENDARLIST'; calendarList: Calendar[] }
  | { type: 'ANONY_ADD'; user: User }
  | { type: 'ANONY_DELETE'; index: number; user: User }
  | { type: 'ANONY_UPDATEDATE'; user: User; day: moment.Moment; valid: Valid }
  | { type: 'TEST'; user: User; day: moment.Moment }
  | { type: 'SETSELECTEDDATE'; day: moment.Moment }
  | { type: 'SETSELECTEDUSER'; user: User }
  | { type: 'SETSELECTEDVALID'; selectedValid: Valid }
  | { type: 'ANONY_UPDATETIMETABLE'; user: User; date: Day; time: number }
  | { type: 'CHANGEMODE'; mode: PaletteMode }
  | { type: 'DEFAULT' };

export type userDispatch = Dispatch<Action>;
