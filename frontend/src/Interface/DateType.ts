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
  constructor(public moment: moment.Moment) {}
}
