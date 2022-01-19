import { Dispatch } from 'react';
import { User, Valid } from './UserType';
import { Year } from './DateType';

export type State = {
  users: User[];
  calendar: Year;
};

export type Action =
  | { type: 'ADD'; user: User }
  | { type: 'DELETE'; index: number; user: User }
  | { type: 'UPDATEDATE'; user: User; day: moment.Moment; valid: Valid }
  | { type: 'TEST'; user: User; day: moment.Moment }
  | { type: 'DEFAULT' };

export type userDispatch = Dispatch<Action>;
