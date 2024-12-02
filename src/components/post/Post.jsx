import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []); // Local state for comments
  const [showInput, setShowInput] = useState(false); // Toggle input visibility
  const [newComment, setNewComment] = useState(""); // Input value for the new comment

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1, // Generate a temporary ID
        username: "currentUser", // Replace with the logged-in user's username
        text: newComment,
      };
      setComments((prevComments) => [...prevComments, comment]); // Update comments list
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div className="post">
      {/* Post header with profile picture and username */}
      <div className="post-header">
        <Link to={`/profile/${post.id}`} className="profile-link">
          <img
            src={post.profilePic}
            alt={`${post.username}'s profile`}
            className="profile-pic"
          />
          <span className="username">{post.username}</span>
        </Link>
      </div>

      {/* Post content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Post image */}
      <div className="post-image">
        <img src={post.img} alt="Post" />
      </div>

      {/* Post actions */}
      <div className="post-actions">
        <button className="like-button">Like</button>
        <button
          className="comment-button"
          onClick={() => setShowInput(!showInput)} // Toggle comment input
        >
          Comment
        </button>
      </div>

      {/* Add Comment Input */}
      {showInput && (
        <div className="add-comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}

      {/* Comments section */}
      <div className="post-comments">
        <h4>Comments</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.username}:</strong> {comment.text}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Post;
