import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import UserPage from './pages/UserProfilePage';
import FAQPage from './pages/FAQ';
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css"
function App() {
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
            <Route
              path="/profile/:username"
              element={
                  <UserPage />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;