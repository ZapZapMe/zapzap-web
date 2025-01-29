import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { API_ENDPOINT } from '../../../config';

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
        alert(`Error fetching user data: ${err.message}`);
      });
  }, [token]);

  const handleTwitterLogin = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/twitter/login`);
      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert(`Error logging in with Twitter ${data}`);
      }
    } catch (error) {
      alert(`Error logging in with Twitter: ${error}`);
    }
  };

  return (
    <nav className="navDesktop">
      <div className="navDesktopContents">
        <Link to="/" className="navDesktopLogoLink">
          <svg
            width="135"
            height="39"
            viewBox="0 0 135 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.425 0C16.0982 0 14.9289 0.871654 14.55 2.14328L9.57462 18.8401C9.28801 19.8019 10.0085 20.7684 11.0122 20.7684H14.7984C15.3208 20.7684 15.6832 21.2892 15.5016 21.7791L12.0013 31.2212L10.7229 35.8125C10.3485 37.157 12.0961 38.0393 12.9557 36.9397L27.7342 18.0344C28.504 17.0497 27.8023 15.6106 26.5524 15.6106H22.4168C21.793 15.6106 21.4419 14.8936 21.8243 14.4008L31.1222 2.41963C31.8871 1.43411 31.1847 0 29.9372 0L17.425 0Z"
              fill="#CCA119"
            />
            <path
              d="M8.42505 0C7.09816 0 5.92889 0.871654 5.54997 2.14328L0.574618 18.8401C0.288006 19.8019 1.00852 20.7684 2.01215 20.7684H5.79837C6.32083 20.7684 6.68321 21.2892 6.50161 21.7791L3.00134 31.2212L1.72292 35.8125C1.34853 37.157 3.09612 38.0393 3.9557 36.9397L18.7342 18.0344C19.504 17.0497 18.8023 15.6106 17.5524 15.6106H13.4168C12.793 15.6106 12.4419 14.8936 12.8243 14.4008L22.1222 2.41963C22.8871 1.43411 22.1847 0 20.9372 0L8.42505 0Z"
              fill="#F7CF52"
            />
            <path
              d="M46.104 23.252H52.92V27.5H40.2V23.492L46.92 14.732H40.2V10.508H52.92V14.516L46.104 23.252ZM54.5972 20.732C54.5972 19.308 54.8372 18.076 55.3172 17.036C55.8132 15.98 56.4852 15.18 57.3332 14.636C58.1812 14.076 59.1332 13.796 60.1892 13.796C61.0692 13.796 61.8292 13.98 62.4692 14.348C63.1092 14.7 63.5972 15.188 63.9332 15.812V13.964H69.2372V27.5H63.9332V25.652C63.5972 26.276 63.1092 26.772 62.4692 27.14C61.8292 27.492 61.0692 27.668 60.1892 27.668C59.1332 27.668 58.1812 27.396 57.3332 26.852C56.4852 26.292 55.8132 25.492 55.3172 24.452C54.8372 23.396 54.5972 22.156 54.5972 20.732ZM63.9332 20.732C63.9332 20.012 63.7492 19.452 63.3812 19.052C63.0132 18.652 62.5412 18.452 61.9652 18.452C61.3892 18.452 60.9172 18.652 60.5492 19.052C60.1812 19.452 59.9972 20.012 59.9972 20.732C59.9972 21.452 60.1812 22.012 60.5492 22.412C60.9172 22.812 61.3892 23.012 61.9652 23.012C62.5412 23.012 63.0132 22.812 63.3812 22.412C63.7492 22.012 63.9332 21.452 63.9332 20.732ZM76.9577 15.812C77.2937 15.188 77.7737 14.7 78.3977 14.348C79.0377 13.98 79.7977 13.796 80.6777 13.796C81.7337 13.796 82.6857 14.076 83.5337 14.636C84.3817 15.18 85.0457 15.98 85.5257 17.036C86.0217 18.076 86.2697 19.308 86.2697 20.732C86.2697 22.156 86.0217 23.396 85.5257 24.452C85.0457 25.492 84.3817 26.292 83.5337 26.852C82.6857 27.396 81.7337 27.668 80.6777 27.668C79.7977 27.668 79.0377 27.492 78.3977 27.14C77.7737 26.772 77.2937 26.276 76.9577 25.652V33.98H71.6297V13.964H76.9577V15.812ZM80.8697 20.732C80.8697 20.012 80.6857 19.452 80.3177 19.052C79.9497 18.652 79.4777 18.452 78.9017 18.452C78.3257 18.452 77.8537 18.652 77.4857 19.052C77.1177 19.452 76.9337 20.012 76.9337 20.732C76.9337 21.452 77.1177 22.012 77.4857 22.412C77.8537 22.812 78.3257 23.012 78.9017 23.012C79.4777 23.012 79.9497 22.812 80.3177 22.412C80.6857 22.012 80.8697 21.452 80.8697 20.732ZM93.8462 23.252H100.662V27.5H87.9422V23.492L94.6622 14.732H87.9422V10.508H100.662V14.516L93.8462 23.252ZM102.339 20.732C102.339 19.308 102.579 18.076 103.059 17.036C103.555 15.98 104.227 15.18 105.075 14.636C105.923 14.076 106.875 13.796 107.931 13.796C108.811 13.796 109.571 13.98 110.211 14.348C110.851 14.7 111.339 15.188 111.675 15.812V13.964H116.979V27.5H111.675V25.652C111.339 26.276 110.851 26.772 110.211 27.14C109.571 27.492 108.811 27.668 107.931 27.668C106.875 27.668 105.923 27.396 105.075 26.852C104.227 26.292 103.555 25.492 103.059 24.452C102.579 23.396 102.339 22.156 102.339 20.732ZM111.675 20.732C111.675 20.012 111.491 19.452 111.123 19.052C110.755 18.652 110.283 18.452 109.707 18.452C109.131 18.452 108.659 18.652 108.291 19.052C107.923 19.452 107.739 20.012 107.739 20.732C107.739 21.452 107.923 22.012 108.291 22.412C108.659 22.812 109.131 23.012 109.707 23.012C110.283 23.012 110.755 22.812 111.123 22.412C111.491 22.012 111.675 21.452 111.675 20.732ZM124.7 15.812C125.036 15.188 125.516 14.7 126.14 14.348C126.78 13.98 127.54 13.796 128.42 13.796C129.476 13.796 130.428 14.076 131.276 14.636C132.124 15.18 132.788 15.98 133.268 17.036C133.764 18.076 134.012 19.308 134.012 20.732C134.012 22.156 133.764 23.396 133.268 24.452C132.788 25.492 132.124 26.292 131.276 26.852C130.428 27.396 129.476 27.668 128.42 27.668C127.54 27.668 126.78 27.492 126.14 27.14C125.516 26.772 125.036 26.276 124.7 25.652V33.98H119.372V13.964H124.7V15.812ZM128.612 20.732C128.612 20.012 128.428 19.452 128.06 19.052C127.692 18.652 127.22 18.452 126.644 18.452C126.068 18.452 125.596 18.652 125.228 19.052C124.86 19.452 124.676 20.012 124.676 20.732C124.676 21.452 124.86 22.012 125.228 22.412C125.596 22.812 126.068 23.012 126.644 23.012C127.22 23.012 127.692 22.812 128.06 22.412C128.428 22.012 128.612 21.452 128.612 20.732Z"
              fill="#F7F7F7"
            />
          </svg>
        </Link>

        <div className="navDesktopLinks">
          <Link to="/">Tip</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
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
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.9405 0H16.6548L10.7249 6.77744L17.7009 16H12.2388L7.96062 10.4066L3.06544 16H0.349538L6.6921 8.75077L0 0H5.60082L9.4679 5.11262L13.9405 0ZM12.9879 14.3754H14.4919L4.78359 1.53928H3.16964L12.9879 14.3754Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
