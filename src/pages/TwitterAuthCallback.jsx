import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TwitterAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('access_token', token);
      // Optionally fetch user data and store in global state
    }
    navigate('/');
  }, [navigate]);

  return <div>Logging you in...</div>;
}

export default TwitterAuthCallback;