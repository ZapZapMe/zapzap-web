import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';

import useLogout from '../hooks';

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

const NavLinks = ({ closeMenu }) => {
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = useLogout();

  return (
    <div className="desktop-links-container ">
      {navLinks.map((link, index) => {
        // Determine the actual href value
        const href =
          typeof link.href === 'function'
            ? link.href(user?.twitter_username || '')
            : link.href;

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

export default NavLinks;
