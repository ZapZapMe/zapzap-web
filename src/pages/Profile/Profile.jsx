import React from 'react';

import ProfileTop from './components/ProfileTop';
import ProfileFeed from './components/ProfileFeed';

function UserProfilePage() {
  return (
    <div className="content container max-w-[640px] w-full mx-auto py-16">
      <ProfileTop />
      <ProfileFeed />
    </div>
  );
}

export default UserProfilePage;
