import axios from "axios";
import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext("");

export const useAuth = () => {
  return useContext(AuthContext);
};

/* https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
    Tutorial used for authentication, big help */

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    //Cookies.set('token', newToken, {expires: 7, secure: true });
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;