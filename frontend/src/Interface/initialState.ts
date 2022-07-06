import { State } from './ContextType';

export const initialState: State = {
  isSigned: null,
  users: [],
  meetingDays: [], // TODO 추후 기능 제작 예정
  calendarList: [],
  selectedCalendar: null,
  selectedDate: null,
  selectedUser: null,
  selectedValid: 'POSIBLE',
  signedUser: null,
  mode: 'dark',
};
