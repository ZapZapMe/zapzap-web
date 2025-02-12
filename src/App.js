import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import UserPage from './pages/UserProfilePage';
import FAQPage from './pages/FAQ';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
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
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/:username" element={<UserPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
