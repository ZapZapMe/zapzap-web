import { SquareArrowOutUpRight } from 'lucide-react';
import { useAuth } from '../../lib/contexts/AuthContext';
import { formatDateDifference } from '../../lib/utils/helperFunctions';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const sampleAvatar =
  'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
const FeedItem = (props) => {
  const {
    tip_sender = 'anonymous',
    created_at,
    tweet_id,
    recipient,
    amount_sats,
    avatar_url,
    comment,
    tip_type,
    mode,
  } = props;
  console.log('🚀 ~ FeedItem ~ props:', props);
  const navigate = useNavigate();

  return (
    <div className="feedItem">
      <img
        className="feedItemProfilePic"
        src={avatar_url ?? sampleAvatar}
        alt={tip_sender}
      />
      <div className="feedItemDetails">
        <div className="feedItemReceivedFromUser">
          <TipTitle
            recipient={recipient}
            tip_sender={tip_sender}
            type={tip_type}
          />
        </div>
        <div className="feedItemSatTime">
          <b>{amount_sats} sat</b> -{' '}
          <DateTippedAt
            handle={recipient}
            tweet_id={tweet_id}
            created_at={created_at}
          />
        </div>
        {comment && <div className="feedItemComment">{comment}</div>}
      </div>
    </div>
  );
};

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

export default FeedItem;

const TipTitle = ({ tip_sender, recipient, type }) => {
  const { username } = useParams();
  const { user } = useAuth();

  // =========== SENT
  if (type === 'sent') {
    // ---------- logged in user sent a tip
    if (user?.twitter_username === tip_sender) {
      return (
        <>
          You tipped <TwitterHandle handle={recipient} />{' '}
        </>
      );
    }
    // ----------- Others page
    if (tip_sender) {
      return (
        <>
          <TwitterHandle handle={tip_sender} /> sent a tip to{' '}
          <TwitterHandle handle={recipient} />{' '}
        </>
      );
    }
  }

  // ======== RECEIVED => @someone sent a tip
  if (recipient) {
    return (
      <>
        Receieved a tip from {` `}
        <TwitterHandle handle={tip_sender ?? 'anonymous'} />
      </>
    );
  }
};

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
