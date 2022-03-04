import moment from 'moment';
import { Day } from './DateType';
import { User } from './UserType';

export const initialState: { users: User[]; selectedDate: Day } = {
  users: [],
  selectedDate: new Day(moment()),
};
