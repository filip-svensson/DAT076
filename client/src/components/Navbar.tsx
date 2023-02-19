import { Button, Container, Form, Nav, Navbar as BNavbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";



export default function Navbar () {
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
  const location = useLocation();
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
          {navbarItemsRight.map(navItem => {
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
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
    )
  }