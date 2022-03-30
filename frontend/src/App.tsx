import * as React from 'react';
import { useReducer, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Timong, Error, Starter } from './Components';
import { reducer } from './Utils';
import { State, userDispatch } from './Interface/ContextType';
import { initialState } from './Interface/initialState';
import List from './Pages/List/List';

export const UserContext = createContext<{
  state: State;
  dispatch: userDispatch;
}>({
  state: {
    users: [],
    meetingDays: [],
    selectedDate: null,
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
          <Route path="/anony/:id" element={<Timong />} />
          <Route path="/" element={<Starter />} />
          <Route path="/:user_id" element={<List />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
