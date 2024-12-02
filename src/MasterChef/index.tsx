import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import ProfileEditor from "./Profile/profileEditor";

export default function MasterChef() {
    return (
        <div>
        <Routes>
            <Route path="Profile/:uid" element={<Profile />}/>
            <Route path="Profile/:uid/ProfileEditor" element={<ProfileEditor />} />
        </Routes>
        </div>
    );
}