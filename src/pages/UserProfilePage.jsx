import React from 'react';
import ProfileTop from '../PageComponents/UserProfilePage/ProfileTop';
import ProfileFeed from '../PageComponents/UserProfilePage/ProfileFeed';
import { useParams } from 'react-router-dom';

//import { userParams } from 'react-router-dom';

function UserProfilePage() {
  

  
  return (
    <div className="content max-w-[640px] w-full mx-auto py-16">
      <ProfileTop />
      <ProfileFeed />
    </div>
  );
}

export default UserProfilePage;
