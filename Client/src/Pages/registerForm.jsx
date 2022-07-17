import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
function RegisterForm({ loggedin }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(Date);
  const [email, setEmail] = useState("");
  const [password, setpswd] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //send data to server

  const adduser = () => {};

  //password eye
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  if (loggedin) {
    return <Navigate to="/profile" replace={true} />;
  }
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
          Log In
        </button>
        <Link to="../login" className="reg" replace>
          Sign-In
        </Link>
      </form>
    </>
  );
}

export default RegisterForm;
