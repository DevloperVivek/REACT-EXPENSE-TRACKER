import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  id: "",
  email: "",
  isLogin: false,
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      localStorage.setItem("login", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLogin = false;
      state.id = "";
      state.email = "";
      localStorage.removeItem("login");
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
