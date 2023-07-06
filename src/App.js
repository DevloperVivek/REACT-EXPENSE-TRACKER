import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Expense/Pages/Authentication/Login/Login";
import Signup from "./components/Expense/Pages/Authentication/Signup/Signup";
import Profile from "./components/Expense/Pages/Profile/Profile";
import ResetPassword from "./components/Expense/Pages/Authentication/ResetPassword/ResetPassword";
import Home from "./components/Expense/Pages/Home/Home";
import Header from "./components/Expense/Layout/Header/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
      </Routes>
    </Fragment>
  );
}

export default App;
