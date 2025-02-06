import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_ENDPOINT } from '../../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Fetch user data whenever the token changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setUser(null);
        localStorage.removeItem('userData');
        return;
      }

      try {
        const response = await fetch(`${API_ENDPOINT}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
        localStorage.removeItem('userData');
      }
    };

    fetchUserData();
  }, [token]);

  // Initialize token and user data from localStorage or URL
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }

      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');

      if (urlToken) {
        localStorage.setItem('token', urlToken);
        setToken(urlToken);

        params.delete('token');
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Function to update user dynamically
  const updateUser = (newUserData) => {
    setUser(newUserData);
    if (newUserData) {
      localStorage.setItem('userData', JSON.stringify(newUserData));
    } else {
      localStorage.removeItem('userData');
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
