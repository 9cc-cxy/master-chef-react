import React, { useState, useEffect } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./search.css";
import * as postClient from "../../clients/PostClient";
import * as userClient from "../../clients/UserClient";
import * as spoonacularClient from "../../clients/SpoonacularClient";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Search = ({ allUsers, updateFollowing }) => {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [apiResults, setApiResults] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("criteria");

  const fetchContents = async () => {
    if (searchQuery) {
      try {
        const postResult = await postClient.searchPosts(searchQuery);
        setPosts(postResult);
        const userResult = await userClient.searchUser(searchQuery);
        const userIds = userResult.map(user => user.user_id);
        const users = allUsers.filter(user => userIds.includes(user.user_id));
        setUsers(users);
        const apiResults = await spoonacularClient.searchRecipes(searchQuery);
        setApiResults(apiResults.results);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    }
  };

  
  useEffect(() => {
    if (searchQuery) {
      const fetchUsers = async () => {
        const userResult = await userClient.searchUser(searchQuery);
        const userIds = userResult.map((user) => user.user_id);
        const filteredUsers = allUsers.filter((user) =>
          userIds.includes(user.user_id)
        );
        setUsers(filteredUsers);
      };
  
      fetchUsers();
    }
  }, [searchQuery, allUsers]); 

  useEffect(() => {
    fetchContents();
  }, [searchQuery]);

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-results">
        <h2>Search Results for "{searchQuery}"</h2>
        {users.length > 0 && (
          <div>
          <p style={{marginTop:"10px"}}><strong>Users</strong></p>
          {users && (
            users.map((user) => (
              <div>
                <Link to={`/profile/${user.user_id}`}  className="profile-link" style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  margin: "20px" 
                }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={user.profile_pic} alt={`${user.username}'s profile`} className="profile-pic" style={{ 
                      height: "70px", 
                      width: "70px", 
                      marginRight: "10px" 
                    }} />
                    <span className="username">{user.username} </span>&nbsp;
                    {user.role === "Chef" && (<span className="username"> | Specialty: {user.specialty_cuisine}</span>)}
                  </div>
                  {user.role === "Chef" && <Button onClick={(event) => {
                        event.preventDefault();
                        updateFollowing(user.user_id, !user.followed);
                      }}>
                      {currentUser && (user.followed ? "Unfollow" : "Follow")}
                  </Button>}
                </Link>
              </div>
            ))
          )}
          </div>
        )}
        {posts.length > 0 && (
          <div>
            <p style={{marginTop:"20px"}}><strong>Posts</strong></p>
            {posts && (
              posts.map((post) => (
                <div key={post.post_id} 
                  style={{margin:"20px"}}
                    className="search-result"
                    onClick={() => navigate(`/details/${post.post_id}`)}>
                  <img
                    src={post.profilePic}
                    // alt={`${post.username}'s post`}
                    className="post-pic"
                  />
                  <div className="result-info">
                    <span className="username">{post.username}</span>
                    <p className="content-snippet">{post.content}</p>
                  </div>
                </div>
              ))
            )}
            <hr/>
          </div> 
        )} 
        {apiResults.length > 0 && (
          <div>
            <hr/>
            <p style={{marginTop:"20px"}}><strong>Spoonacular recipes</strong></p>
            {apiResults && (
              apiResults.map((result) => (
                <div key={result.id} 
                  style={{margin:"20px"}}
                    className="search-result"
                    onClick={() => navigate(`/details/api${result.id}`)}>
                  <img
                    src={result.image}
                    alt={`${result.title}`}
                    className="api-recipe-pic"
                  />
                  <div className="result-info">
                    <span className="username">{result.title}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {posts.length === 0 && users.length === 0 && apiResults.length === 0 && (<p>No contents that matches your search</p>)}
      </div>
    </div>
  );
};

export default Search;
