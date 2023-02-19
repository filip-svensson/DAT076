import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Forum from './pages/Forum';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/forum" element={<Forum/>}/>
      <Route path="/about" element={<Forum/>}/>
      <Route path="/login" element={<Forum/>}/>
    </Routes>
  )
}

export default App;
