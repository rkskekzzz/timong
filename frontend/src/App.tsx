import * as React from 'react';
import { useReducer, createContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './App.css';
import { reducer } from './Utils';
import { State, userDispatch } from './Interface/ContextType';
import { initialState } from './Interface/initialState';
import { SignedCalendar, Error, AnonyCalendar, Entrance } from './Pages';

export const UserContext = createContext<{
  state: State;
  dispatch: userDispatch;
}>({
  state: {
    isSigned: null,
    users: [], // 익명 유저 배열
    meetingDays: [],
    selectedDate: null,
  },
  dispatch: () => {
    null;
  },
});

const ProtectedRoute = () => {
  const { state } = React.useContext(UserContext);
  if (!state.users) {
    return <Navigate to={'/'} replace />;
  }
  return <Outlet />;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<AnonyCalendar />} />
          <Route path="/" element={<Entrance />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/calendar" element={<SignedCalendar />} />
            <Route path="/calendar/:calendar_id" element={<AnonyCalendar />} />
          </Route>
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
