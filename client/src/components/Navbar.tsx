import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar as BNavbar } from "react-bootstrap";
import {IUser} from "../utilities/interfaces"


export default function Navbar () {
  const location = useLocation();
  const [user, setUser] = useState<IUser>();
  const navbarItemsLeft = [
    {
      "name": "Forum",
      "link": "/forum"
    },
    {
      "name": "About",
      "link": "/about"
    },
  ]
  const navbarItemsRight = [
    {
      "name": "Sign in",
      "link": "/login"
    },
  ]
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  async function logout() {
    setUser(undefined);
    localStorage.clear();
  }
  return (
    <BNavbar bg="light" expand="lg">
      <Container fluid>
        <BNavbar.Brand 
          href="#" 
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
            {navbarItemsLeft.map(navItem => {
              return (
                <Nav.Link 
                  key={navItem.name} 
                  href={navItem.link}
                  className={location.pathname === navItem.link ? "active" : ""}
                >
                  {navItem.name}
                </Nav.Link>
              )
            })}
            
          </Nav>
          <Nav>
            {
            user ?
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
            :
            <Nav.Link 
              key="Sign in" 
              href="/login"
              className={`text-success ${location.pathname === "/login" ? "active" : ""}`}
            >
              Sign in
            </Nav.Link>
            }
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
    )
  }