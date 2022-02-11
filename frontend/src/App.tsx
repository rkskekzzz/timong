import * as React from 'react';
import { useReducer, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  console.log('환경변수 잘 들어왔니?', process.env.REACT_APP_API_URL);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Timong />} />
          <Route path="/" element={<Starter />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
