import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../../Context/Auth-Context";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes["header-item"]}>
        {!authCtx.isLoggedIn && (
          <>
            <NavLink to={"/Login"}>
              <span>Login</span>
            </NavLink>
            <NavLink to={"/SignUp"}>
              <span>SignUp</span>
            </NavLink>
          </>
        )}
        {authCtx.isLoggedIn && (
          <>
            <NavLink to="/">
              <span>Home</span>
            </NavLink>
            <NavLink to="/Profile">
              <span>Profile</span>
            </NavLink>
            <NavLink to={"/Login"} onClick={authCtx.logout}>
              <span>Logout</span>
            </NavLink>
          </>
        )}
        <NavLink to={"/About"}>
          <span>About</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
