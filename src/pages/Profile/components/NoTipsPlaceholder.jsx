import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Links, Tabs } from '../constants';

const NoTipsPlaceholder = () => {
  const state = useSelector((state) => state.profile);
  const { activeTab } = state;

  const { user } = useSelector((state) => state.auth);
  const { username } = useParams();

  const xLink = username ? `${Links.X}/${username}` : Links.X;

  return (
    <div className="zz-no-tips-block">
      <img
        src="/img/icons/favicon-96x96.png"
        alt="ZapZapGrey"
        className="zz-decolorized"
        height={26}
      />
      {!user ||
      user?.twitter_username?.toLowerCase() !== username?.toLowerCase() ? (
        <>
          {' '}
          {activeTab === Tabs.RECEIVED ? (
            <p className="zz-helper-text">
              Be the first to tip a{' '}
              <a
                href={xLink}
                target="_blank"
                rel="noreferrer"
                className="zz-tweet-colored-text"
              >
                Tweet
              </a>{' '}
              from{' '}
              <a
                href={xLink}
                target="_blank"
                rel="noreferrer"
                className="zz-tweet-decolorized-text"
              >
                @{username}
              </a>
            </p>
          ) : (
            <p className="zz-helper-text">
              <a
                href={xLink}
                target="_blank"
                rel="noreferrer"
                className="zz-tweet-decolorized-text"
              >
                @{username}
              </a>{' '}
              has not sent any tips
            </p>
          )}
        </>
      ) : (
        <span className="zz-helper-text">
          You have not {activeTab === Tabs.RECEIVED ? Tabs.RECEIVED : Tabs.SENT}{' '}
          any tips.
        </span>
      )}
    </div>
  );
};

export default NoTipsPlaceholder;
