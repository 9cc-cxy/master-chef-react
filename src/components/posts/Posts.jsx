import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.css";
import profilePic from "../../assets/profilePic.png";

const Posts = ({ posts }) => {
  const [error, setError] = useState(null);

  return (
    
    <div className="posts">
      {(!posts && error) ? (
        <p className="error">Error: {error}</p>
      ) : (posts.map((post) => (<Post post={post} key={post.id} />))
      )}
    </div>
  );
};

export default Posts;
