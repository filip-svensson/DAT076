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
  async function handleSubmit() {
    try {
      const user = {username, password}
      const response = await axios.post(
        "http://localhost:8080/user/login",
        user
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate("/forum");
    } catch (error: any) {
      if (error.response.status === 401) {
        alert(error.response.data);
      }
      console.log(`Error message: ${error.message}`)
    }
  }
  return (
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      <div className="container d-flex justify-content-center align-items-center flex-fill">
        <Form 
          className="d-flex flex-column gap-2"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
            required
            autoFocus
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
            required
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
            type="submit"
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