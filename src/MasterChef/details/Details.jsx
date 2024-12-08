import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import * as postClient from "../../clients/PostClient";
import * as commentClient from "../../clients/CommentClient";
import * as spoonacularClient from "../../clients/SpoonacularClient";
import Post from "../../components/post/Post";
import "./details.css";

const Details = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.accountReducer);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleDeleteComment = async (commentId) => {
    try {
      await commentClient.deleteComment(commentId); // Call API to delete the comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      ); // Update state to remove the deleted comment
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const fetchedPost = await postClient.getPost(id);
      console.log(fetchedPost);
      setPost(fetchedPost);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
    try {
      const fetchedComments = await postClient.getCommentsByPost(id);
      console.log(fetchedComments);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  };

  const fetchApiRecipes = async () => {
    try {
      const fetchedContent = await spoonacularClient.getRecipeById(id.replace("api", ""));
      setContent(fetchedContent);
    } catch (error) {
      console.error("Error fetching api results:", error);
    }
  }

  useEffect(() => {
    if (id.includes("api")) {
      fetchApiRecipes();
    } else {
      fetchPostDetails();
    }
  }, []);

  if (!post && !content) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <Navbar />
      <Post post={post} content={content} />
      {post && (<div className="post-comments">
        <h4 style={{ marginBottom: "20px" }}>Comments ({comments.length}) </h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-text">
                <strong>{comment.username}:</strong> {comment.content}
              </div>
              {comment.user_id === currentUser.user_id && ( // Check if the current user owns the comment
                <FiTrash
                  className="delete-icon"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                />
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>)}
    </div>
  );
};

export default Details;
