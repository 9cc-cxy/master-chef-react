import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import React from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", inputs);
      console.log("Login successful:", res.data);
      navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      setErr(error.response?.data || "Login failed. Please try again.");
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
          <span>Don't have an account? &nbsp;
          <Link to="/register">
            Register
          </Link></span>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
