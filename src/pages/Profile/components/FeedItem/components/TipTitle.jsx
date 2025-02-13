import React from 'react';
import { useAuth } from '../../../../../lib/contexts/AuthContext';

import TwitterHandle from './TwitterHandle';

const TipTitle = ({ tip_sender, recipient, type }) => {
  const { user } = useAuth();

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
        <TwitterHandle handle={tip_sender ?? 'anonymous'} />
      </>
    );
  }
};

export default TipTitle;
