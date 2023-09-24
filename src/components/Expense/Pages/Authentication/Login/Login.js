import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../../../../Context/auth-redux";
import classes from "../Signup/Signup.module.css";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSignUp = () => {
    navigate("/SignUp");
  };

  const forgotPassHandler = () => {
    navigate("/forgot-password");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAySDZ3d0eT3-4x8g-bWJ-TkkHDd5cO6u8",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const send = {
          id: data.idToken,
          email: emailRef.current.value,
        };
        dispatch(authAction.login(send));
        console.log("Successfully Logged in");
        navigate("/Home");
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={classes.center}>
      <div className={classes.SignUp}>
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
        </form>
        <div className={classes.login}>
          <p onClick={forgotPassHandler}>Forgot Password?</p>
          <p onClick={onSignUp}>Don't have an account? Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
