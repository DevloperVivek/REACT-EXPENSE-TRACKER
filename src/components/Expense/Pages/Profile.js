import React, { useContext } from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/Auth-Context";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const handleUpdateClick = () => {
    const updateData = {
      idToken: localStorage.getItem("token"), // Firebase authentication token
      displayName: document.getElementById("name").value,
      email: document.getElementById("email").value,
      returnSecureToken: true,
    };

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw`,
        updateData
      )
      .then((response) => {
        console.log(response);
        authCtx.email(response.data.email);
        console.log("Account updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.Profile}>
      <h2>Profile</h2>
      <form>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <button type="button" onClick={handleUpdateClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
