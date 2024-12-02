import React, { useState } from "react";
import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import profilePic from "../../assets/profilePic.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false); // Manage dark mode locally

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev); // Toggle dark mode on click
  };

  return (
    <div className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left">
        <span>masterchef </span>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggleDarkMode} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggleDarkMode} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <Link to="/profile" className="profile-link">
            <img src={profilePic} alt="User Profile" />
            <span>John Doe</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
