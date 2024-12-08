import { useNavigate, useParams } from "react-router-dom";
import "./profile.css"
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import Navbar from '../../components/navbar/navbar';

export default function ProfileEditor({ users, updateProfile }) {
    const navigate = useNavigate();
    const { uid } = useParams();
    const userProfile = users.find((user) => user.user_id === parseInt(uid));
    const [file, setFile] = useState("");
    const [profile, setProfile] = useState({
        username: "",
        user_password: "",
        // role: "",
        email: "",
        cover_pic: "",
        profile_pic: "",
        description: "",
        specialty_cuisine: "",
    });
    const fetchProfileData = async () => {
        try {
            setProfile({
                username: userProfile.username,
                user_password: userProfile.user_password,
                email: userProfile.email,
                // role: userProfile.role,
                specialty_cuisine: userProfile.specialty_cuisine,
                description: userProfile.description,
                profile_pic: userProfile.profile_pic || 'https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
                cover_pic: userProfile.cover_pic || '/images/cover2.png'
            });
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    // const upload = async ()=> {
    //     try {
    //         const formData = new FormData()
    //         formData.append("file", file);
    //         const res = await makeRequest.post("/upload", formData);
    //         return res.data;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     let imgUrl = "";
    //     if (file) imgUrl = await upload();
    //     mutation.mutate({desc});
    // }
    const [inputType, setInputType] = useState("password");
    useEffect(() => { 
        fetchProfileData();
    }, [navigate]);
    const handleFocus = () => {
        setInputType("text");
    };
    const handleBlur = () => {
        setInputType("password");
    };
    const handleSave = async () => {
        try {
            console.log("update uid: ", uid, typeof(uid));
            await updateProfile(uid, profile);
            navigate(`/Profile`);
        } catch (error) {
            console.error("Failed to save profile:", error);
        }
    }
    const handleCancel = () => {
        navigate(`/Profile`)
    }
    
    return (
        <div id="wd-profile-editor-page" className="profileEditor-page">
            <Navbar />
            <div id="wd-profile-editor" className="profileEditor">
                <div className="infoEdit" id="wd-info-edit">
                <img src={profile.cover_pic || "/images/cover2.png"} 
                    alt="" 
                    className='cover'
                    name="cover_pic"/>
                <img src={profile.profile_pic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" }
                    alt="" 
                    className='profilePhoto'
                    name="profile_pic"/>
            
                <div className="infoEditContainer" id="wd-info-edit-container">
                    <h1>Personal Information</h1>     
                    <div className="infoEdit-username" id="wd-username-edit">
                        <span>Username: </span>
                        <input id="wd-username-edit" 
                            name="username"
                            value={profile.username}
                            onChange={handleChange}
                            disabled/>
                    </div>
                    <div className="infoEdit-password" id="wd-password-edit">
                        <span>Password: </span>
                        <input id="wd-password-edit" 
                            name="user_password"
                            type={inputType} 
                            value={profile.user_password}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}/>
                    </div>
                    <div className='infoEdit-email' id="wd-email-edit">
                        <span>Email: </span>
                        <input id="wd-email-edit" name="email" value={profile.email}
                            onChange={handleChange}/>
                    </div>
                    {userProfile.role === "Chef" && (
                        <div className="infoEdit-cuisine" id="wd-cuisine-edit">
                            <span>Specialty Cuisine:</span>
                            <input id="wd-cuisine-edit" name="specialty_cuisine" value={profile.specialty_cuisine}
                                onChange={handleChange}/>
                        </div> )}
                    <div className="infoEdit-description" id="wd-cuisine-edit">
                        <span>Description: </span>
                        <input id="wd-description-edit" name="description" value={profile.description}
                            onChange={handleChange}/>
                    </div>  
                </div>
                <div className="infoEdit-editButton" id="wd-edit-button">
                    <button className="save" onClick={handleSave}>
                        SAVE
                    </button>
                    <button className="cancel" onClick={handleCancel}>
                        CANCEL
                    </button>
                </div> 
                </div>
            </div>
        </div>
    );
}