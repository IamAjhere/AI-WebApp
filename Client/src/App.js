import "./App.css";
import Axios from "axios";
import { Route, Routes } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";

import Login from "./Pages/form";
import LoginForm from "./Pages/loginForm";
import RegisterForm from "./Pages/registerForm";
import Profile from "./Pages/profile";
import Missing from "./Pages/missing";
import Predicted from "./Pages/predicted";
import Chart from "./Pages/chart";
import Homepage from "./Pages/homepage";

import NavBar from "./Components/navBar";

import RequireAuth from "./Components/RequireAuth";

function App() {
  Axios.defaults.withCredentials = true;

  return (
    <div className="Grid-container">
      <div className="grid-item grid-item-1">
        <NavBar />
      </div>
      <div className="grid-item grid-item-2">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="chartpage" element={<Chart />} />
          <Route path="form/*" element={<Login />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/prediction" element={<Predicted />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
