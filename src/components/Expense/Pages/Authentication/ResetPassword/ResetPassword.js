import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ResetPassword.module.css";

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
      <div className={classes.ResetPassword}>
        <h2>Reset Password</h2>
        <form onSubmit={sendResetLinkHandler}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={onEmailChange}
          />
          <br />
          <button type="submit">Send Reset Link</button>
          {isLoading && <p>Loading...</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
