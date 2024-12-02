import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import React from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
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
          <form>
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
            <input
              type="text"
              placeholder="Role"
              name="role"
              onChange={handleChange}
            />
            {err && err}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
