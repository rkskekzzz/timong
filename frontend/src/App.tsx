import * as React from 'react';
import { useReducer, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Timong from './Components';
import Starter from './Components/Starter';
import { reducer } from './Utils';
import { State, userDispatch } from './Interface/ContextType';
import { initialState } from './Interface/initialState';

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
