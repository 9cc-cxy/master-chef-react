import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./MasterChef/register/Register";
import Login from "./MasterChef/login/Login";
import Home from "./MasterChef/home/Home";
import Profile from "./MasterChef/profile";
import ProfileEditor from "./MasterChef/profile/profileEditor";

export default function App() {
  const currentUser = {
    id: 1,
    username: "testuser",
    email: "testuser@example.com",
    profilePic: "../../assets/profilePic.png", // Replace with an actual path or URL
  };

  return (
    <Router>
      <Routes>
        {/* Default route to redirect to /register */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Route for the Register page */}
        <Route path="/register" element={<Register />} />
        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />
        {/* Route for the Home page */}
        <Route path="/home" element={<Home currentUser={currentUser} />} />
        {/* Placeholder for Profile and ProfileEditor */}
        <Route path="/profile/:uid" element={<Profile />} />
        <Route
          path="/profile/:uid/profileEditor" element={<ProfileEditor />}
        />
      </Routes>
    </Router>
  );
};
