import moment from 'moment';
import { Dispatch } from 'react';
import { Day } from './DateType';
import { User, Valid } from './UserType';

export type State = {
  isSigned: string | null;
  users: User[];
  meetingDays: string[];
  selectedDate: Day;
};

export type Action =
  | { type: 'INIT'; users: [User]; meetingDays: [string] }
  | { type: 'SIGNIN' }
  | { type: 'ADD'; user: User }
  | { type: 'DELETE'; index: number; user: User }
  | { type: 'UPDATEDATE'; user: User; day: moment.Moment; valid: Valid }
  | { type: 'TEST'; user: User; day: moment.Moment }
  | { type: 'SETSELECTEDATE'; day: moment.Moment }
  | { type: 'UPDATETIMETABLE'; user: User; date: Day; time: number }
  | { type: 'DEFAULT' };

export type userDispatch = Dispatch<Action>;
