import "./App.css";
import Axios from "axios";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/form";
import LoginForm from "./Pages/loginForm";
import RegisterForm from "./Pages/registerForm";
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
          <Route path="/" element={<>Hellow world</>} />
          <Route path="form/*" element={<Login />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<>profile</>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
