import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { authAction } from "../../../Context/auth-redux";
import { useEffect } from "react";

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
    <header className={classes.header}>
      <div className={classes["header-item"]}>
        {Auth.isLogin && (
          <NavLink to="/Home">
            <span>Home</span>
          </NavLink>
        )}
        {Auth.isLogin && (
          <NavLink to="/Profile">
            <span>Profile</span>
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to={"/Login"}>
            <span>Login</span>
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to={"/SignUp"}>
            <span>SignUp</span>
          </NavLink>
        )}
        {Auth.isLogin && (
          <span className={classes.logout} onClick={logoutHandler}>
            Logout
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
