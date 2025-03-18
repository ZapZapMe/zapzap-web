import React from 'react';
import { useSelector } from 'react-redux';

const CommentBox = ({ text }) => {
  const state = useSelector((state) => state.homePage);
  const { tenorGifObject } = state;
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex rounded-lg items-start w-full gap-3 p-3 border">
      <img
        height={32}
        width={32}
        className="navDesktopProfilePic object-contain w-full"
        src={user?.avatar_url || '/img/default-avatar.png'}
        alt="ProfilePicture"
      />

      <div className="w-full flex-col gap-4">
        <div className=" ">&quot;{text}&quot;</div>

        {tenorGifObject ? (
          <img
            className="rounded-lg w-full"
            src={tenorGifObject?.url}
            alt={tenorGifObject?.description}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CommentBox;
