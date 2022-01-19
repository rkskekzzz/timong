import moment from 'moment';
import { Year } from './DateType';
import { buildDate, makeDate } from '../Utils';
import { User } from './UserType';

const year: Year = buildDate(moment());

export const initialState: { users: User[]; calendar: Year } = {
  users: [
    {
      name: 'ycha',
      color: 'red',
      schedule: [
        {
          valid: 'POSIBLE',
          start: makeDate(2022, 1, 11),
          end: makeDate(2022, 1, 11),
        },
        {
          valid: 'POSIBLE',
          start: makeDate(2022, 1, 12),
          end: makeDate(2022, 1, 12),
        },
        {
          valid: 'IMPOSIBLE',
          start: makeDate(2022, 1, 13),
          end: makeDate(2022, 1, 13),
        },
      ],
    },
    {
      name: 'suhshin',
      color: 'blue',
      schedule: [
        {
          valid: 'IMPOSIBLE',
          start: makeDate(2022, 1, 11),
          end: makeDate(2022, 1, 11),
        },
        {
          valid: 'POSIBLE',
          start: makeDate(2022, 1, 13),
          end: makeDate(2022, 1, 13),
        },
      ],
    },
  ],
  calendar: year,
};
