// import React, { useEffect, useState } from "react";

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   setToken: null,
//   login: (token) => {},
//   logout: () => {},
//   email: () => {},
//   isProfileComplete: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const initialToken = localStorage.getItem("token");
//   const [token, setToken] = useState(initialToken);
//   const [name, setName] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
//   const [isProfileComplete, setIsProfileComplete] = useState(false);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     setIsLoggedIn(!!token);
//   }, [token]);

//   const loginHandler = (token) => {
//     setIsLoggedIn(true);
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setIsProfileComplete(false);
//     setToken(null);
//   };

//   const emailHandler = (email) => {
//     setEmail(email);
//   };

//   const profileComplete = (displayName) => {
//     setIsProfileComplete(true);
//     setName(displayName);
//     console.log(name);
//   };

//   const setTokenHandler = () => {
//     const token = localStorage.getItem("token");
//     setToken(token);
//     setIsLoggedIn(!!token);
//   };

//   const clearTokenHadler = () => {
//     setToken(null);
//     setIsLoggedIn(false);
//   };

//   const contextValue = {
//     token: token,
//     isLoggedIn: isLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//     email: emailHandler,
//     setToken: setTokenHandler,
//     clearToken: clearTokenHadler,
//     isProfileComplete: profileComplete,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
