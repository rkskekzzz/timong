import { State } from './ContextType';

export const initialState: State = {
  isSigned: null,
  users: [],
  meetingDays: [],
  calendarList: [],
  selectedCalendar: null,
  selectedDate: null,
  selectedUser: null,
  signedUser: null,
  valid: 'POSIBLE',
  mode: 'dark',
};
