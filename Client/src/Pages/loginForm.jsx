import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
//import Axios from "axios";
import RingLoader from "react-spinners/RingLoader";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isloading, setLoading] = useState(false);
  //eye
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <>
      {isloading ? (
        <RingLoader
          className="load"
          size={80}
          color={"#F78361"}
          loading={isloading}
        />
      ) : (
        <>
          <div className="background">
            <div className="shape" />
            <div className="shape" />
          </div>
          <form className="loginform" onSubmit={handleSubmit}>
            <h3>Sign-In</h3>
            <label htmlFor="username">Email</label>
            <input
              required
              type="text"
              placeholder="Email"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={passwordShown ? faEye : faEyeSlash}
              className="eye"
              onClick={togglePassword}
            />
            <button type="submit" className="button">
              Log In
            </button>

            <Link to="../register" className="reg" replace>
              Sign-Up
            </Link>
          </form>
        </>
      )}
    </>
  );
}

export default LoginForm;
