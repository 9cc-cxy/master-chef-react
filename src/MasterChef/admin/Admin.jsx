import React, { useState, useEffect } from "react";
import * as UserClient from "../../clients/UserClient";
import Navbar from "../../components/navbar/navbar";
import { FaTrash } from "react-icons/fa";
import "./admin.css";
import { useSelector } from "react-redux";

export default function Admin() {
  const { currentUser } = useSelector((state) => state.accountReducer); 
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); 

  const fetchUsers = async () => {
    const allUsers = await UserClient.findAllUsers();

    // Filter based on admin's department
    if (currentUser.department === "User") {
      const filteredUsers = allUsers.filter(
        (user) => user.user_id !== currentUser.user_id && user.role === "User"
      );
      setUsers(filteredUsers);
    } else if (currentUser.department === "Chef") {
      const filteredUsers = allUsers.filter(
        (user) => user.user_id !== currentUser.user_id && user.role === "Chef"
      );
      setUsers(filteredUsers);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filteredUsers = await UserClient.searchUser(searchQuery);
  
      const filteredResults = filteredUsers.filter(
        (user) =>
          user.user_id !== currentUser.user_id &&
          ((currentUser.department === "User" && user.role === "User") ||
            (currentUser.department === "Chef" && user.role === "Chef"))
      );
      setUsers(filteredResults);
    } else {
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId) => {
    await UserClient.deleteUser(userId);
    fetchUsers();
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search users by username or posts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="user-list-container">
          <h3>User List</h3>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.user_id}>
                <span
                  className="username"
                  onClick={() => handleSelectUser(user)}
                >
                  {user.username}
                </span>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDeleteUser(user.user_id)}
                />
              </li>
            ))}
          </ul>
        </div>

        {selectedUser && (
          <div className="user-details">
            <h3>User Details</h3>
            <p>
              <strong>Name:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Description:</strong> {selectedUser.description || "N/A"}
            </p>
            <p>
              <strong>Specialty Cuisine:</strong>{" "}
              {selectedUser.specialty_cuisine || "N/A"}
            </p>
            <button
              className="close-details-button"
              onClick={() => setSelectedUser(null)} 
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
