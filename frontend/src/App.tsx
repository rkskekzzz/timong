import * as React from 'react';
import { useReducer, createContext, Dispatch } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Timong from './Components';
import Starter from './Components/Starter';
import moment from 'moment';
import { Year } from './Interface/Date';
import { buildDate, makeDate, reducer } from './Utils';
import { State, userDispatch } from './Interface/Context';

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

const year: Year = buildDate(moment());

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timong />} />
          <Route path="/:id" element={<Starter />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
