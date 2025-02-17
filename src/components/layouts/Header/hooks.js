import { useCallback } from 'react';

const useLogout = () => {
  // Function to clear all cookies
  const clearCookies = useCallback(() => {
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
    });
  }, []);

  const handleLogout = useCallback(() => {
    // Clear localStorage, sessionStorage, and cookies
    localStorage.clear();
    sessionStorage.clear();
    clearCookies();

    // Optionally, you can clear the cache (e.g., by reloading or forcing a cache reset)
    // If you are using service workers or caching mechanisms, you'd need to handle them accordingly.

    // Redirect to the homepage
    window.location.href = '/'; // Or use useHistory if using React Router
  }, [clearCookies]);

  return handleLogout;
};

export default useLogout;
