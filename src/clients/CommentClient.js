import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const COMMENTS_API = `${REMOTE_SERVER}/api/comments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteComment = async (commentId) => {
    const response = await axiosWithCredentials.delete(
        `${COMMENTS_API}/${commentId}`
    )
    return response.data;
}