import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from '../../../config';
import { HeaderZapLogo } from '../../../lib/utils/icons';
import LogoutButton from './components/LogoutButton';
import useLogout from './hooks';
import './navbar.scss';
import { LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';

const mobile_menu_id = 'mobile-menu';

const navLinks = [
  {
    href: '/',
    text: 'Tip',
  },
  {
    href: (username) => `/${username}`,
    text: 'Profile',
    shouldProtect: true,
  },
  {
    href: '/settings',
    text: 'Settings',
    shouldProtect: true,
  },
  {
    href: '/faqs',
    text: 'FAQs',
  },
];

const NavLinks = ({ username, closeMenu }) => {
  const { token } = useSelector((state) => state.auth);
  const handleLogout = useLogout();
  return (
    <div className="desktop-links-container ">
      {navLinks.map((link, index) => {
        // Determine the actual href value
        const href =
          typeof link.href === 'function' ? link.href(username) : link.href;

        if (link.shouldProtect && !token) {
          return <div key={index} className="hidden"></div>;
        }

        return (
          <Link
            key={index}
            to={href}
            className="nav-link"
            onClick={closeMenu} // Close the mobile menu when a link is clicked
          >
            {link.text}
          </Link>
        );
      })}
      {token ? (
        <div className="block md:hidden">
          <hr className="zz-divider" />
          <Link
            to="/"
            className="nav-link"
            onClick={handleLogout} // Close the mobile menu when a link is clicked
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

const UserSection = ({ userAvatar, handleTwitterLogin, username }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? (
    <div className="flex gap-3 items-center">
      <Link to={`/${username}`}>
        <img
          className="navDesktopProfilePic"
          src={userAvatar || '/img/default-avatar.png'}
          alt="ProfilePicture"
        />
      </Link>
      <div className="hidden md:block">
        <LogoutButton />
      </div>
    </div>
  ) : (
    <button onClick={handleTwitterLogin} className="login-button">
      Log in with
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </button>
  );
};

const Header = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setUserAvatar(null);
      return;
    }

    setUserAvatar(user?.avatar_url);
  }, [user]);

  const handleTwitterLogin = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/auth/twitter/login`);
      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        console.error(`Error logging in with Twitter ${data}`);
      }
    } catch (error) {
      console.error(`Error logging in with Twitter: ${error}`);
    }
  };

  const menuCloseHandler = () => setIsMenuOpen(false);
  // useClickOutside(null, menuCloseHandler, mobile_menu_id);

  return (
    <nav className="zz-navbar">
      <div className="zz-navbar-container">
        <div className="zz-navbar-content">
          <Link to="/" className="navDesktopLogoLink">
            <HeaderZapLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavLinks
              username={user?.twitter_username}
              closeMenu={menuCloseHandler}
            />
          </div>
          <div className="desktop-nav">
            <UserSection
              handleTwitterLogin={handleTwitterLogin}
              userAvatar={userAvatar}
              username={user?.twitter_username}
            />
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-nav">
            <UserSection
              handleTwitterLogin={handleTwitterLogin}
              userAvatar={userAvatar}
              username={user?.twitter_username}
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id={mobile_menu_id}
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
      >
        <NavLinks
          username={user?.twitter_username}
          closeMenu={menuCloseHandler}
        />
      </div>
    </nav>
  );
};

export default Header;
