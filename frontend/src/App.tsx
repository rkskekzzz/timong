import * as React from 'react';
import { useReducer, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Timong, Error, Starter } from './Components';
import { reducer } from './Utils';
import { State, userDispatch } from './Interface/ContextType';
import { initialState } from './Interface/initialState';

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Timong />} />
          <Route path="/" element={<Starter />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
