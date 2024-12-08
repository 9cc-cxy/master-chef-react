import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import React from "react";
import { register } from "../../clients/UserClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    role: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(inputs);
      console.log("User registered:", response);
      setErr(null);
      setMsg("Register Successful. Redirecting to log in...")
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setErr(error.response?.data?.message || "Register failed. Please try again.");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Master Chef</h1>
          <p>
            We are a vibrant social media platform tailored for culinary
            enthusiasts, professional chefs, and food lovers. It allows users to
            share their passion for cooking by posting their favorite dishes,
            recipes, and culinary creations. The platform fosters a community
            where users can engage through comments, likes, and shares,
            promoting interaction and inspiration.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {err && <p className="error">{err}</p>}
          {msg && <p className="success-msg">{msg}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
              required
            />
            <div className="radio-container">
              Select your role:
              <label>
                <input
                  type="radio"
                  id="chef-role"
                  name="role"
                  value="Chef"
                  onChange={(e) => setInputs({...inputs, role: e.target.value})}
                  checked={inputs.role === "Chef"}
                />
                Chef
              </label>
              <label>
                <input
                  type="radio"
                  id="user-role"
                  name="role"
                  value="User"
                  onChange={(e) => setInputs({...inputs, role: e.target.value})}
                  checked={inputs.role === "User"}
                />
                User
              </label>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
