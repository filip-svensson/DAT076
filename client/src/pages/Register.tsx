import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";


export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function register() {
      try {
        if (password !== confirmPassword) {
          alert(`Password not matching ${password} !== ${confirmPassword}`);
          return;
        }
        const response = await axios.post("http://localhost:8080/user/", {
          "username":username,
          "password":password
        });
        console.log(response.status);
        console.log(response.data);
      } catch (err: any) {
        console.log(`Error message: ${err.message}`)
      }
    }
    return (
        <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      <div className="container d-flex justify-content-center align-items-center flex-fill">
        <Form className="d-flex flex-column gap-2">
          <Form.Control
          type="text"
          placeholder="Username"
          onChange={e => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
          className="me-2"
          style={{minWidth:"15rem"}}
          aria-label="Username"
          />
          <Form.Control
          type="text"
          placeholder="Password"
          onChange={e => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          className="me-2"
          style={{minWidth:"15rem"}}
          aria-label="Password"
          />
          <Form.Control
          type="text"
          placeholder="Confirm Password"
          onChange={e => {
            e.preventDefault();
            setConfirmPassword(e.target.value);
          }}
          className="me-2"
          style={{minWidth:"15rem"}}
          aria-label="Confirm Password"
          />
          <Button
            variant="outline-light"
            onClick={e => {
              e.preventDefault();
              register();
            }}
          >
            Sign up
          </Button>
        </Form>
      </div>
    </div>
    )
}