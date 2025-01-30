import React from 'react';

const FeedItem = ({ profilePic, username, amount, timeAgo, comment }) => (
  <div className="feedItem">
    <img className="feedItemProfilePic" src={profilePic} alt={username} />
    <div className="feedItemDetails">
      <div className="feedItemReceivedFromUser">
        <a href={`https://x.com/${username}`} target="_blank" rel="noopener noreferrer">@{username}</a> sent a tip
      </div>
      <div className="feedItemSatTime">
        <b>{amount} sat</b> · {timeAgo}
      </div>
      {comment && <div className="feedItemComment">{comment}</div>}
    </div>
  </div>
);

export default FeedItem;
