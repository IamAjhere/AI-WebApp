import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/form";
import LoginForm from "./Pages/loginForm";
import RegisterForm from "./Pages/registerForm";
import NavBar from "./Components/navBar";

function App() {
  const [loginstatus, setLoginstatus] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  Axios.defaults.withCredentials = true;

  return (
    //stopped at logout the user from the server
    <BrowserRouter>
      <div className="Grid-container">
        <div className="grid-item grid-item-1">
          <NavBar />
        </div>
        <div className="grid-item grid-item-2">
          <Routes>
            <Route path="/" element={<>Hellow world</>} />
            <Route path="form/*" element={<Login />}>
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
