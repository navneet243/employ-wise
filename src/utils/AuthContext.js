import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    console.log("Saved token:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token);
    <Navigate to="/users" />
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    <Navigate to="/" />
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
