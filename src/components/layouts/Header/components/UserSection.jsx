import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { twitterLogin } from '../../../../lib/auth/authSlice';
import LogoutButton from './LogoutButton';

const UserSection = () => {
  const { token, user, authorizationUrl } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorizationUrl) {
      window.location.href = authorizationUrl;
    }
  }, [authorizationUrl]);

  const handleTwitterLogin = async () => dispatch(twitterLogin());

  return token ? (
    <div className="flex gap-3 items-center">
      <Link to={`/${user?.twitter_username}`}>
        <img
          className="navDesktopProfilePic"
          src={user?.avatar_url || '/img/default-avatar.png'}
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

export default UserSection;
