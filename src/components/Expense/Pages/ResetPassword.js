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
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw",
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
        alert("Reset Link Sent on Email");
        navigate("/login");
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
          <button>Send Reset Link</button>
          {isLoading && <p>Loading...</p>}
        </form>
      </div>
    </center>
  );
};

export default ResetPassword;
