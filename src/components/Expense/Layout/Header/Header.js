import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { authAction } from "../../../../Context/auth-redux";
import { Fragment, useEffect } from "react";

const Header = () => {
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      dispatch(authAction.login(JSON.parse(login)));
      navigate("/Home");
    }
  }, [dispatch]);

  return (
    <Fragment>
      <div className={classes["header-item"]}>
        {Auth.isLogin && (
          <NavLink to="/Home" activeclassname={classes.activeLink}>
            Home
          </NavLink>
        )}
        {Auth.isLogin && (
          <NavLink to="/Profile" activeclassname={classes.activeLink}>
            Profile
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to="/Login" activeclassname={classes.activeLink}>
            Login
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to="/SignUp" activeclassname={classes.activeLink}>
            SignUp
          </NavLink>
        )}
        {Auth.isLogin && (
          <span className={classes.logout} onClick={logoutHandler}>
            Logout
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default Header;
