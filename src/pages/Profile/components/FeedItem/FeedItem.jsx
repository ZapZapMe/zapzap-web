import React from 'react';

import { TipSender } from '../../constants';
import DateTippedAt from './components/DateTippedAt';
import TipTitle from './components/TipTitle';

const sampleAvatar =
  'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

const FeedItem = (props) => {
  const {
    tip_sender = TipSender.ANONYMOUS,
    created_at,
    tweet_id,
    recipient,
    amount_sats,
    avatar_url,
    comment,
    tip_type,
  } = props;

  return (
    <div className="feedItem">
      <img
        className="feedItemProfilePic"
        src={avatar_url || sampleAvatar}
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
          <b>{amount_sats} sats</b> -{' '}
          <DateTippedAt
            handle={recipient}
            tweet_id={tweet_id}
            created_at={created_at}
          />
        </div>
        {comment ? <div className="feedItemComment">{comment}</div> : null}
      </div>
    </div>
  );
};

export default FeedItem;
