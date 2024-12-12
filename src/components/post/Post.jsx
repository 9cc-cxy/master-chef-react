import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./post.css";
import * as postClient from "../../clients/PostClient";
import * as likeClient from "../../clients/LikeClient";
import pic from "../../assets/posts/1.jpg";
import { useSelector } from "react-redux";
import { VscComment } from "react-icons/vsc";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const Post = ({ post, content }) => {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [comments, setComments] = useState(post ? post.comments : []);
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState(""); // Input value for the new comment
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload();
  }

  const fetchPostDetails = async () => {
    try {
      const fetchedLikes = await postClient.getLikesByPost(post.post_id);
      const fetchedComments = await postClient.getCommentsByPost(post.post_id);
      if (currentUser) {
        setIsLiked(fetchedLikes.some((like) => like.user_id === currentUser.user_id));
      }
      setLikes(fetchedLikes);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching post likes:", error);
    }
  };

  useEffect(() => {
    if (post) {
      fetchPostDetails();
  }}, []);

  const handleAddComment = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (newComment.trim()) {
      try {
        const addedComment = await postClient.commentPost(
          post.post_id,
          currentUser.user_id,
          newComment
        );
        setComments((prevComments) => [...prevComments, addedComment]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const RecipeInstructions = ({ htmlContent }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
  };

  const handleLikeToggle = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      if (isLiked) {
        // Delete the like for the current user
        await likeClient.deleteLike(currentUser.user_id, post.post_id);
      } else {
        // If the user hasn't liked the post, add a new like
        await postClient.likePost(post.post_id, currentUser.user_id);
      }
      fetchPostDetails();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await postClient.deletePost(post.post_id);
      refreshPage();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="post">
      {post && currentUser && currentUser.user_id === post.user_id && (
        <div className="delete-button-container">
          <button className="delete-button" onClick={handleDeletePost} >
            <RiDeleteBin6Line className="delete-button-icon"/>
          </button>
        </div>)}
      {post ? (
        <div className="post-header">
          <Link to={`/profile/${post.user_id}`} className="profile-link">
            <img
              src={
                post?.profile_pic ||
                "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              }
              alt={`${post.username}'s profile`}
              className="profile-pic"
            />
            <div className="profile-details">
              <span className="username">{post.username}</span>
              <p className="time">
                {new Date(post.time_created).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </Link>
        </div>
        
      ) : (
        <div>
          <h2>{content.title}</h2>
        </div>
      )}

      <div className="post-content">
        {post && post.content ? (
          <Link to={`/details/${post.post_id}`} className="no-underline">
            <p>{post.content}</p>
          </Link>
        ) : (
          <div className="api-recipe-instructions">
            <RecipeInstructions htmlContent={content.instructions} />
          </div>
        )}
      </div>

      <div className="post-image">
        {post ? (
          <Link to={`/details/${post.post_id}` } className="no-underline">
            {post.image? (<img src={`/upload/post/${post.image}`} alt="Post" />) : 
            (<img src={pic} alt="Post" />)}
          </Link>
        ) : (
          <img src={content.image} alt="Post" />
        )}
      </div>

      {post && currentUser && post.user_id !== currentUser.user_id && (
        <div className="post-actions">
          <button className="like-button" onClick={handleLikeToggle}>
            <div className="like-container">
              {isLiked ? (
                <GoHeartFill style={{ color: "red", fontSize: "1.5rem" }} />
              ) : (
                <GoHeart className="like-button-icon" style={{  fontSize: "1.5rem" }} />
              )}
              <span className="like-counter"> {likes.length}</span>
            </div>  
          </button>
          <div className="comment-container">  
            <VscComment className="comment-icon" onClick={() => setShowInput(!showInput)}/>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="post-actions">
        <button className="like-button" onClick={(handleLikeToggle)}>
          <div className="like-container">
              <GoHeart className="like-button-icon" style={{  fontSize: "1.5rem" }} />
            <span className="like-counter"> {likes.length}</span>
          </div>  
        </button>
        <div className="comment-container">  
          <VscComment className="comment-icon" onClick={() => navigate("/login")}/>
        </div>
      </div>
      )}
      {showInput && currentUser && (
        <div className="add-comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={async () => {
              await handleAddComment();
              refreshPage();
            }}
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
