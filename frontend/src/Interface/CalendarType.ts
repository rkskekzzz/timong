import { User } from './UserType';
const Monthly = 'Monthly' as const;
const Weekly = 'Weekly' as const;

export type CalendarType = typeof Monthly | typeof Weekly;

export interface Calendar {
  _id: string;
  name: string;
}
export interface CalendarDetail extends Calendar {
  start?: string;
  end?: string;
  users: User[];
  meetingDays: string[];
}
