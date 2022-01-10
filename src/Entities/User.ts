import moment from 'moment';
import { Color } from './Color';
type Moment = moment.Moment;

export class User {
  constructor(
    public name: string,
    public color: Color,
    public avail: Moment[]
  ) {}
}

export const globalSelectedUser: {
  user: User | null;
} = {
  user: null,
};
