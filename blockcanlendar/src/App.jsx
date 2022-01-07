import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Calendar from './Calendar/Calendar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
