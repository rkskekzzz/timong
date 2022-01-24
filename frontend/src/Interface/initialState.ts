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
          start: makeDate('20220111'),
          end: makeDate('20220111'),
        },
        {
          valid: 'POSIBLE',
          start: makeDate('20220112'),
          end: makeDate('20220112'),
        },
        {
          valid: 'IMPOSIBLE',
          start: makeDate('20220113'),
          end: makeDate('20220114'),
        },
      ],
    },
    {
      name: 'suhshin',
      color: '#0000ff',
      schedule: [
        {
          valid: 'IMPOSIBLE',
          start: makeDate('20220111'),
          end: makeDate('20220111'),
        },
        {
          valid: 'POSIBLE',
          start: makeDate('20220113'),
          end: makeDate('20220113'),
        },
      ],
    },
  ],
};
