import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import useAuth from "../hooks/useAuth";
function LoginForm() {
  const { setAuth } = useAuth();
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false);
  const [errmsg, setErrormsg] = useState("");
  //
  //eye
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  //
  const navigate = useNavigate();
  const LOGIN_URL = "/login";
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //set Auth token with email and password in the context
      const accessToken = response?.data?.Access_Token;
      const role = response?.data?.accountType;
      setAuth({ email, password, role, accessToken });

      navigate("/profile", { replace: true });
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrormsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrormsg("Invalid Username or Password");
      }
    }
  };

  return (
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
          onChange={(e) => setEmail(e.target.value)}
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
          {isloading ? (
            <PropagateLoader
              className="load"
              size={11}
              color={"#080710"}
              loading={isloading}
            />
          ) : (
            <>Log In</>
          )}
        </button>
        <h5 className="text-danger">{errmsg}</h5>
        <Link to="../register" className="reg" replace>
          Sign-Up
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
