export interface Schedule {
  valid: boolean;
  start: string;
  end: string;
}

export interface User {
  _id?: string;
  name: string;
  color: string;
  schedules: Schedule[];
}

export enum CalendarType {
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
}

export interface Calendar {
  _id?: string;
  type: CalendarType;
  start?: string;
  end?: string;
  users: User[];
}
