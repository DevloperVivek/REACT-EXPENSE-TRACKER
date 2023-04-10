import { useContext } from "react";
import { Link } from "react-router-dom";
import Expense from "./Expense/Expense";
import classes from "./Home.module.css";
import AuthContext from "../../Context/Auth-Context";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.title}>
      <h4>Expense Tracker</h4>
      <div className={classes.profile}>
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
