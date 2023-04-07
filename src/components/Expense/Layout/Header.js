import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes["header-item"]}>
        <h4>Expense Tracker</h4>

        <NavLink to="/Home">
          <span>Home</span>
        </NavLink>
        <NavLink to="/Profile">
          <span>Profile</span>
        </NavLink>
        <NavLink to={"/Login"}>
          <span>Login</span>
        </NavLink>
        <NavLink to={"/SignUp"}>
          <span>SignUp</span>
        </NavLink>

        <p>Profile</p>
      </div>
    </header>
  );
};

export default Header;
