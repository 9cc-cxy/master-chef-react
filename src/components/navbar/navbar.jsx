import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/AccountReducer";
import * as userClient from "../../clients/UserClient";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.accountReducer);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search page with the query
      navigate(`/search?criteria=${encodeURIComponent(searchQuery)}`);
    } else {
      // Navigate to the empty search page
      navigate("/search");
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    if (currentUser) {
      await userClient.logout();
      dispatch(setCurrentUser(null));
      navigate("/home");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span>masterchef </span>
        <Link to={currentUser?.role === "Admin" ? "/admin" : "/home"}>
          <HomeOutlinedIcon />
        </Link>
        {(!currentUser || currentUser.role !== "Admin") && (
          <div className="search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <SearchOutlinedIcon className="search-icon" />
              <input
                type="text"
                placeholder={
                  currentUser?.role === "Admin"
                    ? "Search by username..."
                    : "Search..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
          </div>
        )}
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <div className="user">
            <Link
              to={currentUser?.role === "Admin" ? `/admin` : `/profile`}
              className="profile-link"
            >
              <img
                src={
                  currentUser?.profile_pic ||
                  "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                }
                alt="User Profile"
              />
              <span>{currentUser?.username}</span>
            </Link>
            <button
              className="logout-button"
              onClick={logout}
            >
              Log out
              <IoExitOutline />
            </button>
          </div>
        ) : (
          <div className="user">
            <Link to="/login">
              <button
                style={{
                  border: "0px",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Log in
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
