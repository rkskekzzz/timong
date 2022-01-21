import { makeDate } from '../Utils';
import { User } from './UserType';

export const initialState: { users: User[] } = {
  users: [
    {
      name: 'ycha',
      color: '#ff0000',
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
      color: '#0000ff',
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
};
