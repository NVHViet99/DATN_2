import { createSlice } from "@reduxjs/toolkit";

const intialToken = localStorage.getItem("token");

const initialLoadingState = {
  token: intialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialLoadingState,
  reducers: {
    logginAct(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logoutAct(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
