export enum ScheduleValidType {
  POSIBLE = "POSIBLE",
  IMPOSIBLE = "IMPOSIBLE",
}

export interface Schedule {
  valid: ScheduleValidType;
  start: string;
  end: string;
  posibleTime: number[];
  imposibleTime: number[];
}

export interface User {
  _id?: string;
  name: string;
  color: string;
  schedules: Schedule[];
}

export interface Calendar {
  _id?: string;
  name: string;
  start?: string;
  end?: string;
  users: User[];
}
