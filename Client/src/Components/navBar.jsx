import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartArea,
  faMicrochip,
  faUser,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./CSS/NavBar.css";

import useAuth from "../hooks/useAuth";

function NavBar() {
  const { auth } = useAuth();
  let NavbotBtn;
  if (auth?.email) {
    NavbotBtn = (
      <>
        <div className="nav-button">
          <NavLink to="/profile" className="link">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          <span className="tooltiptext">Profile</span>
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
        <div className="nav-bot">{NavbotBtn}</div>
      </div>
    </div>
  );
}

export default NavBar;
