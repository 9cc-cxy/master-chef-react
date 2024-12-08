import * as client from "../../clients/UserClient";
import { useEffect, useState } from "react";
import { setCurrentUser } from "../../redux/AccountReducer.js";
import { useDispatch } from "react-redux";

export default function Session({ children }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.fetchProfile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      console.error(err);
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
}
