import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./profile.css"
import { MdOutlineModeEdit, MdOutlineModeEditOutline } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { fetchProfile } from '../../clients/UserClient';
import Navbar from '../../components/navbar/navbar';
import { useSelector } from "react-redux";
import * as userClient from "../../clients/UserClient";
import * as followClient from "../../clients/FollowClient";
import Posts from "../../components/posts/Posts";

export default function Profile({ users,updateFollowing }) {
    const navigate = useNavigate();
    const {uid} = useParams();
    const { currentUser } = useSelector((state) => state.accountReducer);
    const profileId = uid || currentUser?.user_id;
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState();
    const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);
    const userProfile = users.find((user) => user.user_id === parseInt(profileId));
    const [followingCounter, setFollowingCounter] = useState(0);
    const [profileData, setProfileData] = useState({
        username: '',
        role: '',
        specialty_cuisine: '',
        description: '',
        profile_pic: '',
        cover_pic: '',
    });
    const fetchFollowingUsersById = async (userId) => {
        try {
          const followingUsers = await userClient.getFollowingUsers(userId);
          return followingUsers;
        } catch (error) {
          console.error("Error fetching following users by ID:", error);
          return [];
        }
      };

    const handleProfileEdit = () => {
        navigate(`/Profile/${profileId}/ProfileEditor`);
    }
    const loadProfile = async () => {
        try {
            setProfileData({
                username: userProfile.username,
                identity: userProfile.role,
                specialty: userProfile.specialty_cuisine,
                description: userProfile.description,
                profile_pic: userProfile.profile_pic,
                cover_pic: userProfile.cover_pic
            });
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }
    const loadFollowingCount = async () => {
        if (!profileId || !fetchFollowingUsersById) return;
        try {
            const followingUsers = await fetchFollowingUsersById(parseInt(profileId));
            console.log(followingUsers.length);
            setFollowingCounter(followingUsers.length);
        } catch (error) {
            console.error("Error fetching following count:", error);
            setFollowingCounter(0);
        }
    };
    const handleFollow = async () => {
        try {
            await updateFollowing(parseInt(profileId), !isFollowing);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Error toggling follow state:", error);
        }
    }

    const fetchChefPosts = async () => {
        try {
            console.log(profileId, typeof(profileId));
            setPosts([]);
            const posts = await userClient.fetchChefPosts(parseInt(profileId));
            setPosts(posts);
        } catch (error) {
            console.error("Failed to fetch chef posts:", error.message);
        }
        
    }

    useEffect(() => {
        if (users && users.length > 0 && profileId) {
            loadProfile();
            loadFollowingCount();
            setIsFollowing(!!userProfile.followed); 
            fetchChefPosts();
          }
    }, [users, profileId, currentUser]);

return (
    <div className="profile-page">
        <Navbar />
        {(!profileData.username) ? (<div>Loading...</div>) : ( <>
        {profileData.identity==="Chef" && (
            <div id='wd-chef-profile' className="chef-profile">
                <div className="chef-info">
                    <img src={profileData.cover_pic || "/images/cover2.png"}
                        alt="" 
                        className='cover'/>
                    <img src={profileData.profile_pic || 'https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'}
                        alt="" 
                        className='profilePhoto'/>
                
                    <div className="chef-infoContainer">     
                        <div className="chef-username-container">
                            
                            <span>{profileData.username}</span>
                        </div>
                        <div className='chef-identity'>
                            <span>Identity: </span>
                            <span>{profileData.identity}</span>
                        </div>
                        <div className="chef-cuisine">
                            <span>Specialty Cuisine: </span>
                            <span>{profileData.specialty}</span>
                        </div>
                        <div className="chef-description">
                            <span>{profileData.description}</span>
                        </div>
                        <div className="chef-follow-count">
                            Following :  {followingCounter}
                        </div>  
                    </div>
    
                    {currentUser && profileId !== currentUser.user_id && (
                    <div className='chef-follow'>
                        <button onClick={() => {
                                            if (isFollowing) {
                                                setShowUnfollowConfirm(true); // Show confirmation modal
                                            } else {
                                                handleFollow(); // Directly follow
                                            }
                                        }}>
                            {isFollowing ? "Following" : <>
                                <HiOutlinePlus />
                                Follow
                            </>}
                        </button>  
                        {showUnfollowConfirm && (
                        <div className="confirmation-modal">
                            <p>Are you sure you want to unfollow?</p>
                            <div className="modal-actions">
                                <button onClick={() => {
                                    handleFollow(); // Unfollow
                                    setShowUnfollowConfirm(false); // Close modal
                                }}>
                                    Yes
                                </button>
                                <button onClick={() => setShowUnfollowConfirm(false)}>
                                    No
                                </button>
                            </div>
                        </div>
                    )}                  
                    </div>)}
                    { currentUser && profileId === currentUser.user_id && (
                        <div className="chef-profileEdit">
                            <button onClick={handleProfileEdit}>
                            <MdOutlineModeEdit />
                            Edit Profile
                            </button>
                        </div> 
                   )}

                    <div className='profile-chefPost'>
                        <Posts posts={posts}/>
                    </div>       
                </div>
            </div>
        )}
        
        {profileData.identity==="User" && (
            <div id="wd-profile-editor" className="user-profile">
                <div className="user-profile-container" id="wd-info-edit">
                <img src={profileData.cover_pic || "/images/cover2.png"} 
                    alt="" 
                    className='cover'/>
                <img src={profileData.profile_pic || 'https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'}
                    alt="" 
                    className='profilePhoto'/>
            
                <div className="user-profile-info" id="wd-info-container">
                    <h1>Personal Information</h1>     
                    <div className="user-profile-username" id="wd-username">
                        <span className="label">Username: </span>
                        <span className="value">{profileData.username}</span>
                    </div>
                    <div className="user-profile-following" id="wd-following">
                        <span className="label">Following: </span>
                        <span className="value">{followingCounter}</span>
                    </div>
                    <div className="user-profile-description" id="wd-cuisine">
                        <span className="label">Description: </span>
                        <span className="value"> {profileData.description}</span>
                    </div>  
                </div>
                { currentUser && profileId === currentUser.user_id && (
                    <div className="user-profileEdit">
                        <button onClick={handleProfileEdit}>
                        <MdOutlineModeEdit />
                        Edit Profile
                        </button>
                    </div> 
                )}
                </div>
            </div>
        )}</>)}
    </div>
    );
}