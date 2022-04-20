import { User } from './UserType';
const Monthly = 'Monthly' as const;
const Weekly = 'Weekly' as const;

export type CalendarType = typeof Monthly | typeof Weekly;

export type Calendar = {
  _id?: string;
  name: string;
  start?: string;
  end?: string;
  users: User[];
  meetingDays: string[];
};
