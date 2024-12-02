import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./profile.css"
import { MdOutlineModeEdit, MdOutlineModeEditOutline } from "react-icons/md";

export default function Profile() {
    const navigate = useNavigate();
    const {uid} = useParams();
    const handleProfileEdit = () => {
        navigate(`/Profile/${uid}/ProfileEditor`);
    }
    return (
      <div id='wd-profile' className="profile">
        <div className="info">
            <img src="/images/cover2.png" 
                 alt="" 
                 className='cover'/>
            <img src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" 
                 alt="" 
                 className='profilePhoto'/>
        
            <div className="infoContainer">     
                <div className="username">
                    <span>Jane Doe</span>
                </div>
                <div className='identity'>
                    <span>Identity: </span>
                    <span>Chef</span>
                </div>
                <div className="cuisine">
                    <span>Specialty Cuisine: </span>
                    <span>Chinese Cuisine, Thai Cuisine</span>
                </div>
                <div className="description">
                    <span>Master Chef Description</span>
                </div>  
            </div>
            <div className="profileEdit">
                <button onClick={handleProfileEdit}>
                <MdOutlineModeEdit />
                Edit Profile
                </button>
            </div>       
        </div>
      </div>
    );
}