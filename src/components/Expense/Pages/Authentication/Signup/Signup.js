import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";

const SignUp = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const onLogin = () => {
    navigate("/Login");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (passRef.current.value === confRef.current.value) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAySDZ3d0eT3-4x8g-bWJ-TkkHDd5cO6u8",
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
          localStorage.setItem("token", data.idToken);
          console.log("Successfully Created Account");
          navigate("/Login");
        } else {
          const data = await res.json();
          alert(data.error.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match");
    }
    setLoading(false);
  };

  return (
    <div className={classes.center}>
      <div className={classes.SignUp}>
        <h2>Sign Up</h2>
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
          <input
            ref={confRef}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <br />
          <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        </form>
        <div className={classes.login}>
          <p onClick={onLogin}>Already have an account? Login</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
