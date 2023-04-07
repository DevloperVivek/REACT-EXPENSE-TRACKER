// import { Link } from "react-router-dom";
import Expense from "./Expense/Expense";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <div>
      <div className={classes.top}>
        <div className={classes.title}>
          <div>Welcome To Expense Tracker</div>
          <div>Easily Manage Your Expenses Here</div>
        </div>
        {/* <p>Expense Tracker</p> */}
        {/* <p>
          Profile
          <Link to={"/Profile"}>
            <span>Complete Now</span>
          </Link>
        </p> */}
      </div>
      <div className={classes.top}>
        <Expense />
      </div>
    </div>
  );
};

export default Home;
