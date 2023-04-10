import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Expense from "./Expense/Expense";
import classes from "./Home.module.css";
import AuthContext from "../../Context/Auth-Context";

const Home = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const profileHandler = () => {
    navigate("/Profile");
  };

  return (
    <div className={classes.title}>
      <h4>Expense Tracker</h4>
      <div className={classes.profile}>
        {/* <button onClick={profileHandler} className={classes.profileBtn}>
          Profile
        </button> */}
        {!authCtx.isProfileComplete ? (
          !null
        ) : (
          <span>
            <p>
              Your profile is incomplete!{" "}
              <Link to="/Profile">Complete Now</Link>
            </p>
          </span>
        )}
      </div>
      <div className={classes.expense}>
        <Expense />
      </div>
    </div>
  );
};

export default Home;
