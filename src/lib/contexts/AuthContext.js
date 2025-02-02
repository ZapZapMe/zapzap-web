import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_ENDPOINT } from '../../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch user data whenever the token changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setUser(null); // Clear user data if there's no token
        localStorage.removeItem('userData'); // Remove user data from localStorage
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
        setUser(userData); // Set user data in state
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data in localStorage
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Clear user data on error
        localStorage.removeItem('userData'); // Remove user data from localStorage
      }
    };

    fetchUserData();
  }, [token]); // Run this effect whenever the token changes

  // Initialize token and user data from localStorage or URL
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
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);