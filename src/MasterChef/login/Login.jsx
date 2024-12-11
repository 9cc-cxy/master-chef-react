import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import React from "react";
import * as userClient from "../../clients/UserClient";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/AccountReducer.js";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const user = await userClient.login(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      console.log("Redux currentUser after dispatch:", user);
      if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome Back to Master Chef</h1>
          <p>
            Discover a world of culinary delights and connect with fellow food
            enthusiasts. Log in to share your recipes and explore the community.
          </p>
          <span>
            Don't have an account? &nbsp;
            <Link to="/register" id="link-register">Register</Link>
            <Link to="/home" id="anonymous-visit">Visit as a guest</Link>
          </span>
        </div>
        <div className="right">
          <h1>Login</h1>
          {err && <p className="error">{err}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
