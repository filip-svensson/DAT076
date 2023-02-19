import axios from "axios";

import Navbar from "../components/Navbar";

export default function About() {
  return (
  <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
    <Navbar/>
    About page
  </div>
  )
}