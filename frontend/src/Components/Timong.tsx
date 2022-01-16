import React, { useReducer, createContext, Dispatch } from 'react';
import moment from 'moment';
import { User } from '../Entities/User';
import { Month, Year, Week, Day } from '../Entities/Date';
import buildYear from '../Utils/buildDate';
import Styled from './Timong.styled';

import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';
import makeDate from '../Utils/makeDate';

type State = {
  users: User[];
  // calendar: Year;
  // calendar: {
  //   day: moment.Moment;
  //   user: User[];
  // }[];
};

type Action =
  | { type: 'ADD'; user: User }
  | { type: 'DELETE'; index: number; user: User }
  | { type: 'UPDATEDATE'; user: User; day: moment.Moment }
  | { type: 'DEFAULT' };
type userDispatch = Dispatch<Action>;

// -------------------------temp------------------------//

const buildDay = (today: moment.Moment) => {
  const startDate = today.clone().startOf('month');
  console.log(startDate);

  return Array(365)
    .fill(0)
    .map((index): { day: moment.Moment; user: User[] } => {
      return {
        day: today.clone().add(index, 'day'),
        user: [],
      };
    });
};

// const days = buildDay(moment());
// -------------------------temp------------------------//

const year: Year = buildYear(moment());

export const UserContext = createContext<{
  state: State;
  dispatch: userDispatch;
}>({
  state: {
    users: [],
  },
  dispatch: () => {
    null;
  },
});

// export const UserContext = createContext({
// state: ,
// dispatch:b
// });

const initialState = {
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
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { ...state, users: state.users.concat(action.user) };
    case 'DELETE':
      return {
        ...state,
        users: state.users.filter((_, index) => {
          return index !== action.index;
        }),
      };
    case 'UPDATEDATE':
      return {
        ...state,
        users: state.users.map((user: User): User => {
          if (user === action.user) {
            user.avail = [...user.avail, action.day];
          }
          return user;
        }),
        // ...state,
        // users: state.users.map((user) => {
        //   }
        // }),
      };
    default:
      return state;
  }
}

const Timong = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;
  // const { calendar } = state;
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <Styled.Body id="body">
          <Calendar year={year} />
        </Styled.Body>
        <Users users={users} />
      </UserContext.Provider>
    </>
  );
};

export default Timong;
