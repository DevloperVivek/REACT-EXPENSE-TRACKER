import { Link } from "react-router-dom";
import Expense from "../Expense/Expense";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";

const Home = (props) => {
  const Theme = useSelector((state) => state.dark.isDark);

  return (
    <div className={!Theme ? classes.light : classes.dark}>
      <div className={classes.top}>
        <p>Expense Tracker</p>
        <div className={!Theme ? classes.profile : classes.darkprofile}>
          <p>
            Your Profile is incomplete{" "}
            <Link to={"/Profile"}>
              <span>Complete Now</span>
            </Link>
          </p>
        </div>
      </div>
      <div>
        <div className={classes.expense}>
          <Expense />
        </div>
      </div>
    </div>
  );
};

export default Home;
