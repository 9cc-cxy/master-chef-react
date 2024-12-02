import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.css";
import profilePic from "../../assets/profilePic.png";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const samplePost = {
    id: 1,
    username: "johndoe",
    profilePic: profilePic, // Replace with an actual profile picture URL
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5vnHdn0pL9uBJQRDMTqVEBux0hrUsUbYHQ&s", // Replace with an actual post image URL
    content: "This is a sample post content. Enjoying a sunny day!",
  };

  const samplePost2 = {
    username: "johndoe",
    profilePic: profilePic, // Replace with an actual profile picture URL
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5vnHdn0pL9uBJQRDMTqVEBux0hrUsUbYHQ&s", // Replace with an actual post image URL
    content: "This is a sample post content. Enjoying a sunny day!",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    
    <div className="posts">
      <Post post={samplePost} />
      <Post post={samplePost2} />
      {error ? (
        <p className="error">Error: {error}</p>
      ) : isLoading ? (
        <p className="loading">Loading posts...</p>
      ) : (
        posts.map((post) => <Post post={samplePost} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
