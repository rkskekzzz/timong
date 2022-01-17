import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import { useReducer, createContext, Dispatch } from 'react';
import Timong from './Components';
import './App.css';
import moment from 'moment';
import buildYear from './Utils/buildDate';
import { User } from './Entities/User';
import { Month, Year, Week, Day } from './Entities/Date';
import makeDate from './Utils/makeDate';

type State = {
  users: User[];
  calendar: Year;
};

type Action =
  | { type: 'ADD'; user: User }
  | { type: 'DELETE'; index: number; user: User }
  | { type: 'UPDATEDATE'; user: User; day: moment.Moment }
  | { type: 'TEST'; user: User; day: moment.Moment }
  | { type: 'DEFAULT' };

type userDispatch = Dispatch<Action>;

export const UserContext = createContext<{
  state: State;
  dispatch: userDispatch;
}>({
  state: {
    users: [],
    calendar: [],
  },
  dispatch: () => {
    null;
  },
});

const year: Year = buildYear(moment());

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
  calendar: year,
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
      };
    case 'TEST':
      return {
        ...state,
        calendar: state.calendar.map((month: Month): Month => {
          return {
            monthMoment: month.monthMoment,
            week: month.week.map((week: Week): Week => {
              return week.map((day: Day): Day => {
                if (!day.moment.isSame(action.day, 'day')) return day;
                const _day = day;
                _day.updateUser(action.user);
                return _day;
              });
            }),
          };
        }),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timong />} />
          <Route path="/:id" element={<Timong />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
