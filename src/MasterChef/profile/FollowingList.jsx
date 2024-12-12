import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar"
import { Link, useLocation } from "react-router-dom";
import * as userClient from "../../clients/UserClient";
import { useSelector } from "react-redux";
import "./FollowingList.css"

export default function FollowingList({users}) {
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.accountReducer);
    const profileId = location.state?.profileId;
    const userProfile = users.find((user) => user.user_id === parseInt(profileId));
    const [profileData, setProfileData] = useState({
        username: '',
        role: '',
        specialty_cuisine: '',
        description: '',
        profile_pic: '',
        cover_pic: '',
    });
    const loadProfile = async () => {
        try {
            setProfileData({
                username: userProfile.username,
                role: userProfile.role,
                specialty: userProfile.specialty_cuisine,
                description: userProfile.description,
                profile_pic: userProfile.profile_pic,
                cover_pic: userProfile.cover_pic
            });
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }
    const [followingList, setFollowingList] = useState([]);
    const fetchFollowingUsersList = async ()=> {
        try {
            const followingUsers = await userClient.getFollowingUsers(parseInt(profileId));
            setFollowingList(followingUsers);
          } catch (error) {
            console.error("Error fetching following users by ID:", error);
          }
    }
    useEffect(() => {
        if (users && users.length > 0 && profileId) {
            fetchFollowingUsersList();
            loadProfile();
        }
        }, [users, profileId, currentUser]
    );
    return ( 
    <div className="following-page">
        <Navbar />
        <div id='wd-chef-profile' className="chef-profile">
            <div className="chef-info">
                <img src={profileData.cover_pic || "/images/cover2.png"}
                    alt="" 
                    className='cover'/>
                <img src={profileData.profile_pic || 'https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'}
                    alt="" 
                    className='profilePhoto'/>
            
                <div className="chef-infoContainer-following-list">     
                    <div className="chef-username-container">
                        <span>{profileData.username}</span>
                    </div>
                    {profileData.role === "Chef" && (<div className='chef-identity'>
                            <span>Identity: </span>
                            <span>{profileData.role}</span>
                    </div>)}
                    {profileData.role === "Chef" && (<div className="chef-cuisine">
                        <span>Specialty Cuisine: </span>
                        <span>{profileData.specialty}</span>
                    </div>)}
                    <div className="chef-description">
                        <span>{profileData.description}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="following-list">
            <h2>Following Users</h2>
            {followingList.length === 0 ? (
                    <div>No users found.</div>
                ) : (
                    followingList.map((user) => (
                <div key={user.user_id}>
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
                        <span className="username">{user.username}</span>&nbsp;
                        {user.role === "Chef" && (<span className="username"> | Specialty: {user.specialty_cuisine}</span>)}
                    </div>
                    </Link>
                </div>
                ))
            )}
        </div>
    </div>
);
}