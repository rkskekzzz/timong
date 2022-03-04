import moment from 'moment';
type Moment = moment.Moment;

const POSIBLE = 'POSIBLE' as const;
const IMPOSIBLE = 'IMPOSIBLE' as const;
export type Valid = typeof POSIBLE | typeof IMPOSIBLE;

export type Schedule = {
  valid: Valid;
  start: Moment;
  end: Moment;
  posibleTime: number[];
  imposibleTime: number[];
};

export class User {
  constructor(
    public name: string,
    public color: string,
    public schedules: Schedule[],
    public _id: string
  ) {}
}

export const globalSelectedUser: {
  user: User | null;
  valid: boolean;
} = {
  user: null,
  valid: true,
};
