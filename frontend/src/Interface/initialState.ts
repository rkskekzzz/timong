import { State } from './ContextType';

export const initialState: State = {
  isSigned: null,
  users: [],
  meetingDays: [],
  selectedCalendar: null,
  selectedDate: null,
  selectedUser: null,
  valid: 'POSIBLE',
  mode: 'dark',
};
