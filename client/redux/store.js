import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer.js";

export default configureStore({
    reducer: {
      user: userReducer,
    },
  });
  
  // HOST
  export const server = "http://192.168.10.6:8080/api/v1";