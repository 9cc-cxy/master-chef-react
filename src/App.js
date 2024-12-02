import React from "react";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

const App = () => {
  const currentUser = {
    id: 1,
    username: "testuser",
    email: "testuser@example.com",
    profilePic: "../../assets/profilePic.png", // Replace with an actual path or URL
  };
  return (
    
    <Router>
      <Routes>
        {/* Default route to redirect to /register */}
        <Route path="/" element={<Navigate to="/register" />} />
        {/* Route for the Register page */}
        <Route path="/register" element={<Register />} />
        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home currentUser={currentUser}/>} />
      </Routes>
    </Router>
  );
};

export default App;
