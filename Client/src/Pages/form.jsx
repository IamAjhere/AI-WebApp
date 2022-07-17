import React, { Component } from "react";
import "./CSS/Login.css";
import { Outlet } from "react-router-dom";
class login extends Component {
  state = {};
  render() {
    return (
      <div className="login">
        <Outlet />
      </div>
    );
  }
}

export default login;
