import moment from 'moment';
type Moment = moment.Moment;

export class User {
  constructor(
    public name: string,
    public color: string,
    public avail: Moment[]
  ) {}
}

export const globalSelectedUser: {
  user: User | null;
} = {
  user: null,
};
