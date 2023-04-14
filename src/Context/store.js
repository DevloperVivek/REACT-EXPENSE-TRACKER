import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-redux";

const store = configureStore({
  reducer: { auth: AuthReducer },
});

export default store;
