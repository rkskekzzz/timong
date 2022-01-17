import { User } from './UserType';
import moment from 'moment';

export type Moment = moment.Moment;
export type Week = Day[];
export type Month = {
  monthMoment: moment.Moment;
  week: Week[];
};
export type Year = Month[];

export class Day {
  private users: User[] = [];

  constructor(
    public moment: moment.Moment,
    public readonly isThisMonth: boolean
  ) {}

  private addUser(selectedUser: User): void {
    this.users = [...this.users, selectedUser];
  }

  private delUser(selectedUser: User): void {
    this.users = this.users.filter((e) => e !== selectedUser);
  }

  updateUser(selectedUser: User): void {
    if (this.users.includes(selectedUser)) this.delUser(selectedUser);
    else this.addUser(selectedUser);
  }

  getUsers(): User[] {
    return this.users;
  }
}
