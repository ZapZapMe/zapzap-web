import React from 'react';
import { Link } from 'react-router-dom';

const TwitterHandle = ({ handle }) => {
  const navigateToProfile = () => {
    if (handle) window.open(`/${handle}`, '_self');
  };

  return (
    <Link to={`/${handle}`} className="cursor-pointer text-blue-700 font-bold">
      @{handle ?? 'anonymous'}
    </Link>
  );
};

export default TwitterHandle;
