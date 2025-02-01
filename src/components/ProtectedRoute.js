// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()



  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;