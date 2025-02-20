import React, { memo } from 'react';

import ProfileTop from './components/ProfileTop';
import ProfileFeed from './components/ProfileFeed';
import './styles.scss';

function UserProfilePage() {
  return (
    <div className="content container max-w-[640px] w-full mx-auto py-16">
      <ProfileTop />
      <ProfileFeed />
    </div>
  );
}

export default memo(UserProfilePage);
