import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartArea,
  faGear,
  faMicrochip,
  faUser,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./CSS/NavBar.css";

function NavBar({ loggedin }) {
  let NavbotBtn;
  if (loggedin) {
    NavbotBtn = (
      <>
        <div className="nav-button">
          <NavLink to="/profile" className="link">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          <span className="tooltiptext">Profile</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon icon={faGear} />
          <span className="tooltiptext">Settings</span>
        </div>
      </>
    );
  } else {
    NavbotBtn = (
      <div className="nav-button">
        <NavLink to="/form/login" className="link">
          <FontAwesomeIcon icon={faSignIn} />
        </NavLink>

        <span className="tooltiptext">Login</span>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="Flexcontainer">
        <div className="nav-button">
          <NavLink to="/" className="link">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </NavLink>
          <span className="tooltiptext">Home</span>
        </div>

        <div className="nav-button">
          <NavLink to="/chartpage" className="link">
            <FontAwesomeIcon icon={faChartArea} />
          </NavLink>
          <span className="tooltiptext">Charts</span>
        </div>
        <div className="nav-button">
          <NavLink to="/prediction" className="link">
            <FontAwesomeIcon icon={faMicrochip} />
          </NavLink>
          <span className="tooltiptext">AI</span>
        </div>
        <div className="nav-bot">
          {NavbotBtn}
          {console.log(loggedin)}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
