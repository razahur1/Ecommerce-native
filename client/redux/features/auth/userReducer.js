import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
  // LOGIN CASE
  builder.addCase("loginRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("logingSucess", (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.isAuth = true;
    
  });
  builder.addCase("loginFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });
  // ERROR MESSAGE CASE
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});
