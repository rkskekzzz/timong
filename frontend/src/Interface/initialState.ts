import { Day } from './DateType';
import { User } from './UserType';

export const initialState: {
  users: User[];
  meetingDays: string[];
  selectedDate: Day;
} = {
  users: [],
  meetingDays: [],
  selectedDate: null,
};
