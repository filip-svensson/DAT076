import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar as BNavbar } from "react-bootstrap";
import {IUser} from "../utilities/interfaces"
import axios from "axios";
 

export default function Navbar () {
  const location = useLocation();
  const [user, setUser] = useState<IUser>();
  /*
  const navbarItemsLeft = [
    {
      "name": "Forum",
      "link": "/forum"
    },
  ]
  */
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  async function logout() {
    try {
      const response = await axios.post("http://localhost:8080/user/logout");
      setUser(undefined);
      localStorage.clear();
    } catch (err: any) {
      console.log(err);
    }
  }
  return (
    <BNavbar bg="light" expand="lg">
      <Container fluid>
        <BNavbar.Brand 
          href="/" 
          className="fw-bold fs-4 bg-static-gradient" 
          style={{backgroundClip:"text",WebkitBackgroundClip:"text", color:"transparent"}}
          >
            Share-A-Drink
          </BNavbar.Brand>
        <BNavbar.Toggle aria-controls="navbarScroll" />
        <BNavbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight:'10rem' }}
            navbarScroll
          >
          <Nav.Link 
            className = {location.pathname === "/forum" ? "active" : ""} 
            key="Forum" 
            href="/forum">Forum
          </Nav.Link>
          { 
            user && 
            <div className="d-flex"> 
              <Nav.Link 
              className = {location.pathname === "/myposts" ? "active" : ""} 
              href="/myposts"
              key="My Posts">
                My Posts</Nav.Link>
              <Nav.Link 
              className = {location.pathname === "/favourites" ? "active" : ""} 
              key="My Favourites" 
              href="/favourites">
                My Favourites</Nav.Link>
            </div>
          }
          </Nav>
          
            {
            user ? 
            (
            <Nav>
            <span className="navbar-text">Signed in as: <strong>{user.username}</strong></span>
            <Nav.Link
              key="Sign out" 
              onClick={e => {
                e.preventDefault();
                logout();
              }}
              className="text-danger"
            >
              Sign out
            </Nav.Link>
            </Nav>
            )
            :
            <Nav>
            <Nav.Link
              key="Sign in" 
              href="/login"
              className={"text-success"}
            >
              Sign in
            </Nav.Link>
            </Nav>
            }
          
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
    )
  }




