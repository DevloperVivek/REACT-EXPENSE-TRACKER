import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Expense from "./Expense/Expense";
import classes from "./Home.module.css";
import AuthContext from "../../Context/Auth-Context";

const Home = (props) => {
  const authCtx = useContext(AuthContext);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const navigate = useNavigate();

  // const completeProfileHandler = () => {
  //   navigate("/Profile");
  // };

  // Check if the user's profile information is complete
  // useEffect(() => {
  //   if (authCtx.isLoggedIn && !authCtx.profileComplete) {
  //     setIsProfileComplete(false);
  //   } else {
  //     setIsProfileComplete(true);
  //   }
  // }, [authCtx.isLoggedIn, authCtx.profileComplete]);

  return (
    <div>
      <div className={classes.top}>
        <div className={classes.title}>
          <div>
            <div className={classes.profile}>Profile</div>
            <span>
              {!isProfileComplete && (
                <p>
                  Your profile is incomplete!{" "}
                  <Link to="/Profile">Complete Now</Link>
                </p>
              )}
            </span>
          </div>
          <h4 className={classes.top}>Expense Tracker</h4>
          <p>Welcome To Expense Tracker</p>
        </div>
      </div>
      <div className={classes.top}>
        <Expense />
      </div>
    </div>
  );
};

export default Home;
