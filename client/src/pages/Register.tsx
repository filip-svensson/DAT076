import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import validator from "validator";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  async function handleSubmit() {
    let hasError = false;
    // Place all validation here
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    // username validation
    if (username.length <= 3 || 15 <= username.length) {
      setUsernameError("Username has to be longer than 3 and shorter than 15 characters!")
      hasError = true;
    }
    if (!validator.matches(username,"^[a-zA-Z0-9]*$")) {
      setUsernameError("Username can only include lower- and uppercase letters, and also numbers!")
      hasError = true;
    }
    // password validation
    if (password.length <= 7 || 15 <= password.length) {
      setPasswordError("Password has to be longer than 7 and shorter than 15 characters!")
      hasError = true;
    }
    if (!validator.matches(password, "^[a-zA-Z0-9]*$")) {
      setPasswordError("Password can only include lower- and uppercase letters, and also numbers!")
      hasError = true;
    }
    // confirmPassword validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords are not matching!");
      hasError = true;
    }
    if (hasError) return;
    try {
      if (password !== confirmPassword) {
        alert(`Password not matching ${password} !== ${confirmPassword}`);
        return;
      }
      const response = await axios.post("http://localhost:8080/user/", {
        "username":username,
        "password":password
      });
      if (response.status !== 201) return;
      navigate("/login");
    } catch (error: any) {
      if (error.response.status === 409) {
        alert(`Username '${username}' is already taken!`);
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
        validated={false}
      >
        <Form.Control
          name="username"
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
        />
        {usernameError && <Form.Label htmlFor="username" className="fs-6 text-danger bg-white bg-opacity-75 rounded p-2">{usernameError}</Form.Label>}
        <Form.Control
          name="password"
          type="text"
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
        {passwordError && <Form.Label htmlFor="password" className="fs-6 text-danger bg-white bg-opacity-75 rounded p-2">{passwordError}</Form.Label>}
        <Form.Control
          name="confirm-password"
          type="text"
          placeholder="Confirm Password"
          onChange={e => {
            e.preventDefault();
            setConfirmPassword(e.target.value);
          }}
          className="me-2"
          style={{minWidth:"15rem"}}
          aria-label="Confirm Password"
          required
        />
        {confirmPasswordError && <Form.Label htmlFor="confirm-password" className="fs-6 text-danger bg-white bg-opacity-75 rounded p-2">{confirmPasswordError}</Form.Label>}
        <Button
          variant="outline-light"
          type="submit"
        >
          Sign up
        </Button>
      </Form>
    </div>
  </div>
  )
}