import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PropagateLoader from "react-spinners/PropagateLoader";

import axios from "../api/axios";
function RegisterForm() {
  //states
  const [name, setName] = useState("");
  const [age, setAge] = useState(Date);
  const [email, setEmail] = useState("");
  const [password, setpswd] = useState("");
  const [errmsg, setErrormsg] = useState("");
  const navigate = useNavigate();
  const REGISTER_URL = "/register";

  const [isloading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          name: name,
          email: email,
          dateofbirth: age,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setErrormsg(null);
      navigate("../login", { replace: true });
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrormsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrormsg(err.response?.data);
      }
    }
  };

  //send data to server
  const adduser = () => {};

  //password eye
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <div className="background">
        <div className="shape regc1" />
        <div className="shape regc2" />
      </div>
      <form className="registerForm" onSubmit={handleSubmit}>
        <h3>Sign-Up</h3>

        <label htmlFor="username">Name</label>
        <input
          required
          type="text"
          placeholder="Name"
          id="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Birthday:</label>
        <input
          required
          type="date"
          id="birthday"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        ></input>
        <label htmlFor="username">Email</label>
        <input
          required
          type="text"
          placeholder="Email"
          id="username"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label htmlFor="password">Password</label>

        <div>
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            id="password"
            onChange={(event) => {
              setpswd(event.target.value);
            }}
          />
          <FontAwesomeIcon
            icon={passwordShown ? faEye : faEyeSlash}
            className="eye"
            onClick={togglePassword}
          />
        </div>

        <button type="submit" className="button" onClick={adduser}>
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
        <Link to="../login" className="reg" replace>
          Sign-In
        </Link>
      </form>
    </>
  );
}

export default RegisterForm;
