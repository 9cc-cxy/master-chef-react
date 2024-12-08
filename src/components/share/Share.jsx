import React, { useState } from "react";
import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import * as postClient from "../../clients/PostClient";
import * as userClient from "../../clients/UserClient";
import { useSelector } from "react-redux";

const Share = () => {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const res = await postClient.uploadImg(formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      console.log(newPost);
      return userClient.createPost(currentUser.user_id, newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    console.log("Selected file:", file);
    mutation.mutate({ content, img: imgUrl });
    setContent("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="share-left">
            <img src={"/profile.jpg"} alt="" />
            <input
              type="text"
              placeholder="What's on your mind?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
        </div>

        <div className="bottom">
          <div className="share-left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>

          <div className="share-right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
