export interface TimeRange {
  _id?: string;
  start: string;
  end: string;
}

export interface User {
  _id?: string;
  name: string;
  color: string;
  schedule: TimeRange[];
}

export enum CalendarType {
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

export interface Calendar {
  _id?: string;
  type: CalendarType;
  start?: string;
  end?: string;
  users: User[];
}
