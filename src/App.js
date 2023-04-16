import "./App.css";
import React from "react";
import Home from "./components/Expense/Pages/Home";
import Header from "./components/Expense/Layout/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Expense/Pages/Login";
import Signup from "./components/Expense/Pages/Signup";
import Profile from "./components/Expense/Pages/Profile";
import ResetPassword from "./components/Expense/Pages/ResetPassword";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
