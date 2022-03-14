import "./Login.css";

import { useState } from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [formData, setFromData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFromData({
      ...formData,
      [name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: formData.username,
      password: formData.password
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(
        "http://akademia108.pl/api/social-app/user/login",
        JSON.stringify(user),
        { headers: headers }
      )
      .then((req) => {
        let reqData = req.data;
        console.log(reqData);
        if (Array.isArray(reqData.username)) {
          setLoginMessage(reqData.username[0]);
        } else if (Array.isArray(reqData.password)) {
          setLoginMessage(reqData.password[0]);
        } else if (reqData.error) {
          setLoginMessage("Incorrect username or password");
        } else {
          setLoginMessage("");
          localStorage.setItem("user", JSON.stringify(reqData));
          props.setUser(reqData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="login">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />

        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
