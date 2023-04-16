import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-redux";
import DarkReducer from "./dark-redux";

const store = configureStore({
  reducer: { auth: AuthReducer, dark: DarkReducer },
});

export default store;
