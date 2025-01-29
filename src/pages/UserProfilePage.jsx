import React from 'react';
import ProfileTop from '../components/UserProfilePage/ProfileTop';
import ProfileFeed from '../components/UserProfilePage/ProfileFeed';

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
