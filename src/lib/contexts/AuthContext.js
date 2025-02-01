import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }

      // Check if the current URL has ?token= in the query string
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');

      if (urlToken) {
        // Store in local storage
        localStorage.setItem('token', urlToken);
        setToken(urlToken);

        // Clean up URL to remove token from browser address bar
        params.delete('token');
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []); // Runs only once when the component mounts

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
