import React, { useReducer, Dispatch } from 'react';
import moment from 'moment';
import { User } from '../Entities/User';
import { Year } from '../Entities/Date';
import buildYear from '../Utils/buildDate';
import Styled from './Timong.styled';

import { Calendar } from './Calendar';
import Header from './Header';
import Users from './Users';
import makeDate from '../Utils/makeDate';

type State = {
  users: User[];
};
type Action =
  | { type: 'ADD'; user: User }
  | { type: 'DELETE'; index: number }
  | { type: 'DEFAULT' };
type userDispatch = Dispatch<Action>;

const year: Year = buildYear(moment());

export const UserDispatch = React.createContext<userDispatch | null>(null);

const initialState = {
  users: [
    {
      name: 'ycha',
      color: 'red',
      avail: [
        makeDate(2021, 1, 11),
        makeDate(2021, 1, 12),
        makeDate(2021, 1, 13),
      ],
    },
    {
      name: 'suhshin',
      color: 'blue',
      avail: [makeDate(2021, 1, 12), makeDate(2021, 1, 13)],
    },
  ],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { users: state.users.concat(action.user) };
    case 'DELETE':
      return {
        ...state,
        users: state.users.filter((_, index) => {
          return index !== action.index;
        }),
      };
    default:
      return state;
  }
}

const Timong = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  return (
    <>
      <UserDispatch.Provider value={dispatch}>
        <Header />
        <Styled.Body id="body">
          <Calendar year={year} />
        </Styled.Body>
        <Users users={users} />
      </UserDispatch.Provider>
    </>
  );
};

export default Timong;
