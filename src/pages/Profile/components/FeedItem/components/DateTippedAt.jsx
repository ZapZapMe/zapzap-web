import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { formatDateDifference } from '../../../../../lib/utils/helperFunctions';

const DateTippedAt = ({ created_at, handle, tweet_id }) => {
  const navigateToProfile = () => {
    if (handle)
      window.open(`https://x.com/${handle}/status/${tweet_id}`, '_blank');
  };

  return (
    <span
      onClick={() => navigateToProfile()}
      className="inline-flex cursor-pointer gap-1 items-center"
    >
      {formatDateDifference(created_at)}{' '}
      <SquareArrowOutUpRight color="#1DA1F2" size={12} />
    </span>
  );
};

export default DateTippedAt;
