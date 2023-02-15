import { NavLink } from "react-router-dom";
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="home-container">
      <h1>Share-A-Drink</h1>
      <div className="welcome-text">
        <span>Hi,</span>
        <br/>
        Welcome to Share-A-Drink. This is an online forum where you can share your delicious drink recipes with others.
      </div>
      <NavLink className="button" to="/forum">
        <span>Enter Forum</span>
      </NavLink>
    </div>
    )
  }
  /**
   * 
   * <div className="bgMoving">
      <div className="container">
        <h1 id="titletext" className="raleway-font"> Share-A-Drink </h1>
      </div>
      <div className="container col-4" id="infoText">
        <p id = "breadText" className = "raleway-font" >
          <span><strong>Hi,</strong></span>
          <br/>
          Welcome to Share-A-Drink. This is an online forum where you can share your delicious drink recipes with others.
        </p>
      </div>
      <div className="text-center">
        <NavLink to="/forum" className="button">
          text
        </NavLink>
      </div>
    </div>
   * 
   * 
   * 
   * 
   * 
   * 
   */