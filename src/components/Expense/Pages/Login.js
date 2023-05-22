import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../../Context/auth-redux";

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

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnZxUaZSYnplphd3Y669un98rNC1dRxMg",
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
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <center className={classes.center}>
      <div className={classes.Login}>
        <p onClick={forgotPassHandler} className={classes.forgotPass}>
          Forgot Password !
        </p>
        <h2>Login</h2>
        <form onSubmit={sumbitHandler}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <button>Login</button>
          {isLoading && <p>Loading...</p>}
        </form>
        <div className={classes.signup}>
          <p onClick={onSignUp}>Don't have an account? Sign Up</p>
        </div>
      </div>
    </center>
  );
};

export default Login;
