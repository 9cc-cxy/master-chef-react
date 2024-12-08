import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link
} from "react-router-dom";
import Register from "./MasterChef/register/Register";
import Login from "./MasterChef/login/Login";
import Home from "./MasterChef/home/Home";
import Profile from "./MasterChef/profile/Profile.jsx";
import ProfileEditor from "./MasterChef/profile/profileEditor";
import Search from "./MasterChef/search/Search";
import Details from "./MasterChef/details/Details";
import Session from "./components/routing/Session";
import { useSelector } from "react-redux";
import * as userClient from "./clients/UserClient";
import * as followClient from "./clients/FollowClient";
import Admin from "./MasterChef/admin/Admin";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";

export default function App() {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [users, setUsers] = useState([]);
  
  const fetchFollowingUsers = async () => {
    try {
      const allUsers = await userClient.findAllUsers();
      if (!currentUser) {
        setUsers(allUsers);
        return;
      }
      const followingUsers = await userClient.getFollowingUsers(currentUser.user_id);
      const users = allUsers.map((user => {
        if (followingUsers.find((u) => u.user_id === user.user_id)) {
          return { ...user, followed: true };
        } else {
          return user;
        }
      }));
      setUsers(users);
    } catch (error) {
      console.error("Error in fetchAllUsers", error);
    }
  }



  const updateFollowing = async (chefId, followed) => {
    
    if (followed) {
      await followClient.follow(currentUser.user_id, chefId);
    } else {
      await followClient.unfollow(currentUser.user_id, chefId);
    }
    setUsers(
      users.map((user) => {
        if (user.user_id === chefId) {
          return { ...user, followed: followed };
        } else {
          return user;
        }
      })
    );
  };

  const updateProfile = async (userId, updatedProfile) => {
    try {
      console.log("Updating profile in App with data:", updatedProfile);
      console.log("update profile", userId, typeof(userId));
      await userClient.updateProfile(userId, updatedProfile);
      setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === parseInt(userId) ? { ...user, ...updatedProfile } : user
      ));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchFollowingUsers();
  }, [currentUser]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile users={users}/>
          </ProtectedRoute>} 
        />
        <Route path="/profile/:uid" element={<Profile users={users} 
                                                      updateFollowing={updateFollowing}/>} />
        <Route path="/profile/:uid/profileEditor" element={
          <ProtectedRoute>
            <ProfileEditor users={users} updateProfile={updateProfile}/>
          </ProtectedRoute>}
        />
        <Route
          path="/search"
          element={<Search searchQuery={searchQuery} allUsers={users} updateFollowing={updateFollowing}/>}
        />
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      </Routes>
    </Router>
  );
}
