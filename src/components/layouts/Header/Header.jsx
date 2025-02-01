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
            <Link to="/profile">
              <img
                className="navDesktopProfilePic"
                src={userAvatar || '/default-avatar.png'}
                alt="ProfilePicture"
              />
            </Link>
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

export default Header;
