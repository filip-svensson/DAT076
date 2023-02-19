import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar"

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function login() {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        "username":username,
        "password":password
      });
      console.log(response.status);
      console.log(response.data);
      navigate("/forum");
    } catch (err: any) {
      alert("Invalid sign in");
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
          type={showPassword ? "text":"password"}
          placeholder="Password"
          onChange={e => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          className="me-2"
          style={{minWidth:"15rem"}}
          aria-label="Password"
          />
          <Form.Check 
            className="text-white"
            type="checkbox"
            label="Show password"
            onChange={e => {
              setShowPassword(e.target.checked);
          }}/>
          <Button
            variant="outline-light"
            onClick={e => {
              e.preventDefault();
              login();
            }}
          >
            Sign in
          </Button>
          <Button
            variant="outline-light"
            href="/register"
          >
            Not Registered?
          </Button>
        </Form>
      </div>
    </div>
    )
  }