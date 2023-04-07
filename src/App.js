import "./App.css";
import React from "react";
import Home from "./components/Expense/Home";
import Header from "./components/Expense/Layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Expense/Pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
