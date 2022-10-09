import React, { createContext } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = React.useState({
    token: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setData({
        token: token,
        isLoggedIn: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ data, setData }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
