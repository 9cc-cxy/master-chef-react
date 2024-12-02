import { useNavigate } from "react-router-dom";
import "./profile.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";

export default function ProfileEditor() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Jane Doe");
    const [password, setPassword] = useState("testPassword");
    const [email, setEmail] = useState("test@masterchef.com");
    const [cuisine, setCuisine] = useState("Chinese Cuisine, Thai Cuisine");
    const [description, setDescription] = useState("Master Chef Description");
    const [inputType, setInputType] = useState("password");
    // useEffect(() => { 
    //         axios.get("/api/profile")
    //         .then((response) => {
    //             const data = response.data;
    //             setUsername(data.username || "");
    //             setPassword(data.password || "");
    //             setEmail(data.email || "");
    //             setCuisine(data.cuisine || "");
    //             setDescription(data.description || "");
    //         })
    //         .catch((error) => {
    //             console.error("Failed to fetch profile data:", error);
    //         });
    // }, []);
    const handleFocus = () => {
        setInputType("text");
    };
    const handleBlur = () => {
        setInputType("password");
    };
    const handleSave = () => {
        navigate(`/MasterChef/Profile/defaultUser`)
    }
    const handleCancel = () => {
        navigate(`/MasterChef/Profile/defaultUser`)
    }
    
    return (
        <div id="wd-profile-editor" className="profileEditor">
            <div className="infoEdit" id="wd-info-edit">
            <img src="/images/cover2.png" 
                 alt="" 
                 className='cover'/>
            <img src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" 
                 alt="" 
                 className='profilePhoto'/>
        
            <div className="infoEditContainer" id="wd-info-edit-container">
                <h1>Personal Information</h1>     
                <div className="username" id="wd-username-edit">
                    <span>Username: </span>
                    <input id="wd-username-edit" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="password" id="wd-password-edit">
                    <span>Password: </span>
                    <input id="wd-password-edit" 
                           type={inputType} 
                           value={password}
                           onFocus={handleFocus}
                           onBlur={handleBlur}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='email' id="wd-email-edit">
                    <span>Email: </span>
                    <input id="wd-email-edit" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="cuisine" id="wd-cuisine-edit">
                    <span>Specialty Cuisine:</span>
                    <input id="wd-cuisine-edit" value={cuisine}
                           onChange={(e) => setCuisine(e.target.value)}/>
                </div>
                <div className="description" id="wd-cuisine-edit">
                    <span>Description: </span>
                    <input id="wd-description-edit" value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                </div>  
            </div>
            <div className="editButton" id="wd-edit-button">
                <button className="save" onClick={handleSave}>
                    SAVE
                </button>
                <button className="cancel" onClick={handleCancel}>
                    CANCEL
                </button>
            </div> 
            </div>
        </div>
    );
}