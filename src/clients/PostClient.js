import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const searchPosts = async (keyword) => {
  const response = await axiosWithCredentials.get(POSTS_API, {
    params: { keyword },
  });
  return response.data;
};

export const getAllPosts = async (postId) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}`);
    return response.data;
}

export const getPost = async (postId) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${postId}`);
    return response.data;
}

export const deletePost = async (postId) => {
    const response = await axiosWithCredentials.delete(
        `${POSTS_API}/${postId}`
    )
    return response.data;
}

export const getLikesByPost = async (postId) => {
    const response = await axiosWithCredentials.get(
        `${POSTS_API}/${postId}/likes`
    )
    return response.data;
}

export const likePost = async (postId, userId) => {
    const response = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/likes`, { userId }
    )
    return response.data;
}

export const getCommentsByPost = async (postId) => {
    const response = await axiosWithCredentials.get(
        `${POSTS_API}/${postId}/comments`
    )
    return response.data;
}

export const commentPost = async (postId, userId, content, image) => {
    let imgUrl = null;
    if (image) {
        imgUrl = await uploadImg(image);
    }
    const response = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/comments`,
        {userId,
        content,
        image: imgUrl}
    )
    return response.data;
}

export const uploadImg = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("Sending request with formData:");
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
    const response = await axiosWithCredentials.post(
      `${POSTS_API}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };
  
