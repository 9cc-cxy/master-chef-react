import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./redux/AccountReducer.js";
const store = configureStore({
  reducer: {
    accountReducer,
  },
});
export default store;