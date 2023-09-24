import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Signup/Signup.module.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendResetLinkHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAySDZ3d0eT3-4x8g-bWJ-TkkHDd5cO6u8",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Reset link sent successfully");
        alert("Reset Link Sent to Email");
        navigate("/login");
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
        <h2>Reset Password</h2>
        <form onSubmit={sendResetLinkHandler}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={onEmailChange}
          />
          <button type="submit">
            {isLoading ? "Loading..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
