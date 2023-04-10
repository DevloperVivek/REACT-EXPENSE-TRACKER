import React, { useState, useContext, useEffect } from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/Auth-Context";

const Profile = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw`,
        {
          idToken,
        }
      )
      .then((response) => {
        console.log(response.data.users[0]);
        const { displayName, email } = response.data.users[0];
        setName(displayName || "");
        setEmail(email || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        authCtx.email(response.data.email);
        console.log("Account updated successfully");
        navigate("/");
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

  // const verifyHandler = () => {
  //   axios
  //     .post(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const verifyHandler = () => {
    const idToken = localStorage.getItem("token");
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANzyfV4kc7FHC5V8GNeXK__AmuXAwvaGw`;
    const data = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken,
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        // Handle success
      })
      .catch((error) => {
        console.log(error);
        // Handle error
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
