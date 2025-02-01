import React from 'react';
import ProfileTop from '../PageComponents/UserProfilePage/ProfileTop';
import ProfileFeed from '../PageComponents/UserProfilePage/ProfileFeed';

//import { userParams } from 'react-router-dom';

function UserProfilePage() {
  // const { username } = useParams();
  return (
    <div className="content">
      <ProfileTop />
      <ProfileFeed />
    </div>
  );
}

export default UserProfilePage;
