import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const LIKES_API = `${REMOTE_SERVER}/api/likes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteLike = async (userId, postId) => {
    const response = await axiosWithCredentials.delete(
        `${LIKES_API}/${userId}/${postId}`
    )
    return response.data;
}