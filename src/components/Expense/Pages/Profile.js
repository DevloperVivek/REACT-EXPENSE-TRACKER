import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const Auth = useSelector((state) => state.auth);
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw";

  useEffect(() => {
    const idToken = Auth.id;
    console.log(idToken);
    axios
      .post(url, {
        idToken,
      })
      .then((response) => {
        console.log(response.data.users[0].emailVerified);
        const { displayName, email } = response.data.users[0];
        setName(displayName || "");
        setEmail(email || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Auth.id]);

  const handleUpdateClick = () => {
    const updateData = {
      idToken: localStorage.getItem("token"),
      displayName: name,
      email: email,
      returnSecureToken: true,
    };

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw`,
        updateData
      )
      .then((response) => {
        console.log(response);
        console.log("Account updated successfully");
        navigate("/Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const verifyHandler = () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw`;
    const data = {
      requestType: "VERIFY_EMAIL",
      idToken: Auth.idToken,
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        console.log(response.data.email);
        alert("Check Your E-Mail Inbox, verification has been send");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.Profile}>
      <p onClick={verifyHandler}>Verify Email id!</p>
      <h2>Profile</h2>
      <form>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="button" onClick={handleUpdateClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
