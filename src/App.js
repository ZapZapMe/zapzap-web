import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import UserPage from './pages/UserProfilePage';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/:username" element={<UserPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

