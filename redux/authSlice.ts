import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    register: {
      isFetching: false,
      error: null,
      success: false,
    },
    login: {
      user: null,
      isFetching: false,
      error: null,
    },
    token: {
      user: null,
    },
  },
  reducers: {
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = null;
      state.register.success = true;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = action.payload;
      state.register.success = false;
    },
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.user = action.payload;
      state.login.error = null;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
    setToken: (state, action) => {
      state.token.user = action.payload;
    },
  },
});
export const {
  registerStart,
  registerSuccess,
  registerFailed,
  loginStart,
  loginSuccess,
  loginFailed,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
