import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

export default function CreatePost() {

  async function createPost() {
    try {

    } catch (err: any) {
      console.log(`Error message: ${err.message}`)
    }
  }
  return (
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      Create Post page
    </div>
  )
}