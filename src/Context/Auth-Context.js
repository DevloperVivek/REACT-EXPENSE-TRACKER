import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  email: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const userIsLoggedin = !!token;
  console.log(initialToken);

  const setTokenHandler = () => {
    const Token = localStorage.getItem("token");
    setToken(Token);
  };

  const clearTokenHadler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    // login: loginHandler,
    // logout: logoutHandler,
    // email: emailHandler,
    setToken: setTokenHandler,
    clearToken: clearTokenHadler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
