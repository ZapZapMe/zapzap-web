import React from 'react';

import TwitterHandle from './TwitterHandle';
import { useSelector } from 'react-redux';

const TipTitle = ({ tip_sender, recipient, type }) => {
  const { user } = useSelector((state) => state.auth);

  // =========== SENT
  if (type === 'sent') {
    // ---------- logged in user sent a tip
    if (user?.twitter_username === tip_sender) {
      return (
        <>
          You tipped <TwitterHandle handle={recipient} />{' '}
        </>
      );
    }
    // ----------- Others page
    if (tip_sender) {
      return (
        <>
          <TwitterHandle handle={tip_sender} /> sent a tip to{' '}
          <TwitterHandle handle={recipient} />{' '}
        </>
      );
    }
  }

  // ======== RECEIVED => @someone sent a tip
  if (recipient) {
    return (
      <>
        Received a tip from {` `}
        <TwitterHandle handle={tip_sender || 'anonymous'} />
      </>
    );
  }
};

export default TipTitle;
