import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const FOLLOWS_API = `${REMOTE_SERVER}/api/follows`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const follow = async (followerId, chefId) => {
  const response = await axiosWithCredentials.post(`${FOLLOWS_API}/${followerId}/${chefId}`);
  return response.data;
};

export const unfollow = async (followerId, chefId) => {
  const response = await axiosWithCredentials.delete(`${FOLLOWS_API}/${followerId}/${chefId}`);
  return response.data;
};

