import './App.css';
import Home from "./pages/Home"
import Forum from "./pages/Forum"
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/forum' element={<Forum/>}/>
    </Routes>
  );
}
