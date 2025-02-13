import React from 'react';

const TwitterHandle = ({ handle }) => {
  const navigateToProfile = () => {
    if (handle) window.open(`/${handle}`, '_blank');
  };

  return (
    <span
      onClick={navigateToProfile}
      className="cursor-pointer text-blue-700 font-bold"
    >
      @{handle ?? 'anonymous'}
    </span>
  );
};

export default TwitterHandle;
