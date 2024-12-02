import React from "react";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Weather from "../../components/weather/Weather";

const Home = ({ currentUser }) => {
  return (
    <div className="home">
      <Navbar />
      <Weather />
      <Share currentUser={currentUser} /> {/* Pass currentUser to Share */}
      <Posts userId={currentUser.id} /> {/* Pass userId to Posts */}
    </div>
  );
};

export default Home;
