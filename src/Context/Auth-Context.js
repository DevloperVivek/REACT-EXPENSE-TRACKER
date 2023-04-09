import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  setToken: null,
  login: (token) => {},
  logout: () => {},
  email: () => {},
});
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const loginHandler = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const setTokenHandler = () => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsLoggedIn(!!token);
  };

  const clearTokenHadler = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  const profileComplete = () => {
    setIsProfileComplete(true);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    email: emailHandler,
    setToken: setTokenHandler,
    clearToken: clearTokenHadler,
    profileIsComplete: profileComplete,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
