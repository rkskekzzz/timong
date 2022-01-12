import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Timong from './Components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timong />} />
        <Route path="/:id" element={<Timong />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
