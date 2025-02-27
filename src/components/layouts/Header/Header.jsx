import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setIsMenuOpen } from '../../../lib/auth/authSlice';
import { HeaderZapLogo } from '../../../lib/utils/icons';
import UserSection from './components/UserSection';
import NavLinks from './components/NavLinks';
import './navbar.scss';

const mobile_menu_id = 'mobile-menu';

const Header = () => {
  const { isMenuOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const menuCloseHandler = () => dispatch(setIsMenuOpen(false));

  return (
    <nav className="zz-navbar">
      <div className="zz-navbar-container">
        <div className="zz-navbar-content">
          <Link to="/" className="navDesktopLogoLink">
            <HeaderZapLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavLinks closeMenu={menuCloseHandler} />
          </div>
          <div className="desktop-nav">
            <UserSection />
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-nav">
            <UserSection />
            <button
              onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
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
        <NavLinks closeMenu={menuCloseHandler} />
      </div>
    </nav>
  );
};

export default Header;
