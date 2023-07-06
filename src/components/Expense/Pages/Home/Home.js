import React from "react";
import { Link } from "react-router-dom";
import Expense from "../../Expense/Expense/Expense";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";

const Home = () => {
  const isDarkTheme = useSelector((state) => state.dark.isDark);

  return (
    <div
      className={`${classes.container} ${
        isDarkTheme ? classes.dark : classes.light
      }`}
    >
      <div className={classes.top}>
        <p>Expense Tracker</p>
        <div
          className={`${classes.profile} ${
            isDarkTheme ? classes.darkprofile : ""
          }`}
        >
          <p>
            Your Profile is incomplete{" "}
            <Link to="/Profile">
              <span>Complete Now</span>
            </Link>
          </p>
        </div>
      </div>
      <div className={classes.expense}>
        <Expense />
      </div>
    </div>
  );
};

export default Home;
