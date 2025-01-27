import React from "react";
import "./App.css"; // or index.css if you copy style definitions here
import Header from "./components/Header";
import Footer from "./components/Footer";
import SettingsPage from "./components/SettingsPage";

import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserProfilePage";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/:username" element={<UserPage />} />
      </Routes>
      <Footer />
    </div>
  );
}



export default App;
