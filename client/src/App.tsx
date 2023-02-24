import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home"
import Forum from './pages/Forum';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post'
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import BadURL from './pages/BadURL';
import UserFavourites from './pages/UserFavourites'; 
import UserPosts from './pages/UserPosts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/forum" element={<Forum/>}/>
        <Route path="/forum/create" element={<CreatePost/>}/>
        <Route path="/forum/post/:id" element={<Post/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/favourites" element={<UserFavourites/>}/>
        <Route path="/myposts" element={<UserPosts/>}/>
        <Route path="/*" element={<BadURL/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
