import moment from 'moment';
import { Year } from './DateType';
import { buildDate, makeDate } from '../Utils';

const year: Year = buildDate(moment());

export const initialState = {
  users: [
    {
      name: 'ycha',
      color: 'red',
      avail: [
        makeDate(2022, 1, 11),
        makeDate(2022, 1, 12),
        makeDate(2022, 1, 13),
      ],
    },
    {
      name: 'suhshin',
      color: 'blue',
      avail: [makeDate(2022, 1, 12), makeDate(2022, 1, 13)],
    },
  ],
  calendar: year,
};
