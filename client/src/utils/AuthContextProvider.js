// Directly inspired by Carlos's lecture number 15 and repository  idg2100-ntnu-movies-front-end
//Inspired by https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638 

import { login } from "../api/api";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem("AUTH_APP-token");
    const user = localStorage.getItem("AUTH_APP-user");
    if (token && user) {
      return true;
    } else {
      return false;
    }
  });

  
  let [user, setUser] = useState(() => {
    const user = localStorage.getItem("AUTH_APP-user");
    if (user) {
      return jwt_decode(user);
    } else {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem("AUTH_APP-token");
    if (token) {
      return {
        jwtToken: token,
      };
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.jwtToken));
    }
    setIsLoading(false);
  }, [authTokens, isLoading]);

  const loginUser = async (user) => {
    const { username, password } = user;
    try {
      const response = await login(username, password);
      localStorage.setItem("AUTH_APP-token", response.data);
      localStorage.setItem("AUTH_APP-user", response.data);
      setAuthTokens({
        jwtToken: response.data,
      });
      setUser(jwt_decode(response.data));
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("AUTH_APP-token");
    localStorage.removeItem("AUTH_APP-user");
    setAuthTokens(null);
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        authTokens,
        setAuthTokens,
        setUser,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
