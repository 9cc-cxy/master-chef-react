import React from "react";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Weather from "../../components/weather/Weather";
import { useSelector } from "react-redux";
import * as userClient from "../../clients/UserClient";
import * as postClient from "../../clients/PostClient";
import { useState, useEffect } from "react";

const Home = ({ }) => {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [posts, setPosts] = useState([]);
  
  const fetchPosts = async () => {
    if (currentUser) {
      const posts = await userClient.getFollowingPosts(currentUser.user_id);
      setPosts(posts);
    } else {
      const posts = await postClient.getAllPosts();
      setPosts(posts);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  return (
    <div className="home">
      <Navbar />
      <Weather />
      {currentUser && currentUser.role === "Chef" && <Share /> }
      <Posts posts={posts}/>
      <div>
        <p>Team Members: Xinyu Cheng, Zhihao Wang, Shiyu Chen</p>
        <a className="react-git-link" href="https://github.com/9cc-cxy/master-chef-react">React Git Repo</a>
        <a className="node-git-link" href="https://github.com/9cc-cxy/master-chef-node-server-app">Node Git Repo</a>
      </div>
    </div>
  );
};

export default Home;
