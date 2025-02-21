import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserData, setToken, updateUser } from './lib/auth/authSlice';

import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/Settings';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const env = process.env.NODE_ENV;
    if (env === 'development') {
      document.title = 'ZapZap (Development)';
    } else if (env === 'production') {
      document.title = 'ZapZap';
    } else {
      document.title = 'ZapZap (Beta)';
    }
  }, []);

  // Fetch user data whenever the token changes
  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    } else {
      dispatch(updateUser(null));
    }
  }, [token, dispatch]);

  // Initialize token and user data from localStorage or URL
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        dispatch(setToken(storedToken));
      }

      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');

      if (urlToken) {
        localStorage.setItem('token', urlToken);
        dispatch(setToken(urlToken));

        params.delete('token');
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
