import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentBox = ({ text, twitterHandler }) => {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const { tenorGifObject } = state;
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex  items-start w-fit gap-3 p-2 border">
      <img
        height={32}
        width={32}
        className="navDesktopProfilePic object-contain w-full"
        src={user?.avatar_url || '/img/default-avatar.png'}
        alt="ProfilePicture"
      />

      <div className="flex-col gap-4">
        <div className="rounded-lg ">&quot;{text}&quot;</div>

        {tenorGifObject ? (
          <img
            className="rounded-2xl sm:max-h-[300px] max-h-[231px]"
            src={tenorGifObject?.url}
            alt={tenorGifObject?.description}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CommentBox;
