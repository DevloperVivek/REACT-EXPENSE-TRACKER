import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Expense from "../../Expense/Expense/Expense";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const isDarkTheme = useSelector((state) => state.dark.isDark);

  return (
    <Fragment>
      <div
        className={`${classes.container} ${
          isDarkTheme ? classes.dark : classes.light
        }`}
      >
        <div className={classes.header}>
          <p className={classes.title}>Expense Tracker</p>
          <div
            className={`${classes.profile} ${
              isDarkTheme ? classes.darkprofile : classes.profile
            }`}
          >
            <FontAwesomeIcon icon={faUserCircle} />
            <Link to="/Profile">Profile</Link>
          </div>
        </div>
      </div>
      <div>
        <Expense />
      </div>
    </Fragment>
  );
};

export default Home;
