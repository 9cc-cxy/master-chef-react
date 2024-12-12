import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/login`,
    credentials
  );
  return response.data;
};

export const getFollowingPosts = async (userId) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/following/posts`);
  return response.data;
};

export const fetchChefPosts = async (chefId) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${chefId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chef posts:", error.message);
  }
}

export const getFollowingUsers = async (userId) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/following`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user's following:", error.message);
    throw error;
  }
};

export const logout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/logout`);
  return response.data;
};

export const signup = async (user) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const updateProfile = async (userId, updatedProfile) => {
  console.log("Updated profile in client: ", updatedProfile)
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${userId}/profile`,
    updatedProfile
  );
  return response.data;
}

export const searchUser = async (keyword) => {
  const response = await axiosWithCredentials.get(USERS_API, {
    params: { keyword },
  });
  return response.data;
};

export const createPost = async (userId, postData) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/posts`,
    postData
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const register = async (user) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/register`, user);
  return response.data;
};

export const uploadImg = async (userId, selectedFile) => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  console.log("Sending request with formData:");
  for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
