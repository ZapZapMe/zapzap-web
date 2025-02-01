import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/contexts/AuthContext';
import { API_ENDPOINT } from '../../../config';
import { HeaderZapLogo } from '../../../lib/utils/icons';
import { XIcon } from 'lucide-react';

const Header = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setUserAvatar(null);
      return;
    }

    fetch(`${API_ENDPOINT}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch /users/me. Status code ${res.status}`
          );
        }
        return res.json();
      })
      .then((data) => {
        setUserAvatar(data.avatar_url || null);
      })
      .catch((err) => {
        console.log(`Error fetching user data: ${err.message}`);
      });
  }, [token]);

  const handleTwitterLogin = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/twitter/login`);
      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        console.log(`Error logging in with Twitter ${data}`);
      }
    } catch (error) {
      console.log(`Error logging in with Twitter: ${error}`);
    }
  };

  return (
    <nav className="navDesktop">
      <div className="navDesktopContents">
        <Link to="/" className="navDesktopLogoLink">
          <HeaderZapLogo/>
        </Link>

        <div className="navDesktopLinks">
          <Link to="/">Tip</Link>

          {token && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
            </>
          )
          }
          <Link to="/faq">FAQs</Link>
        </div>

        <div className="navDesktopActions">
          {token ? (
            <div className='flex gap-3 items-center'>
              <Link to="/profile">
                <img
                  className="navDesktopProfilePic"
                  src={userAvatar || '/default-avatar.png'}
                  alt="ProfilePicture"
                />
              </Link>
              <LogoutButton/>
            </div>
          ) : (
            
            <button onClick={handleTwitterLogin} className="navDesktopXButton">
              <span>Log in with</span>
              <XIcon/>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
import { LogOut } from "lucide-react"
import { Button } from "../../../components/ui/button"

export function LogoutButton() {
  const handleLogout = () => {
    // Clear localStorage, sessionStorage, and cookies
    localStorage.clear();
    sessionStorage.clear();
    clearCookies();

    // Optionally, you can clear the cache (e.g., by reloading or forcing a cache reset)
    // If you are using service workers or caching mechanisms, you'd need to handle them accordingly.

    // Redirect to the homepage
    window.location.href = '/';  // Or use useHistory if using React Router
    console.log("Logout clicked")
  }


  // Function to clear all cookies
  const clearCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
    });
  };
  return (
    <Button onClick={handleLogout} variant="ghost" className="text-sm text-white font-bold bg-inherit">
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  )
}
export default Header;
