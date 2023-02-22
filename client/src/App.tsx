import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Forum from './pages/Forum';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post'
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import BadURL from './pages/BadURL';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/forum" element={<Forum/>}/>
      <Route path="/forum/create" element={<CreatePost/>}/>
      <Route path="/forum/post/:id" element={<Post/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/*" element={<BadURL/>}/>
    </Routes>
  )
}

export default App;
