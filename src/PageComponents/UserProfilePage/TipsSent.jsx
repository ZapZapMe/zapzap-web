import React from 'react'
import FeedItem from './FeedItem';
const FEED_ITEMS = [
    {
      profilePic: 'img/default-avatar.png',
      username: 'someone_else',
      amount: '4,000',
      timeAgo: 'Just now',
    },
    {
      profilePic: 'img/default-avatar.png',
      username: 'short',
      amount: '5,000',
      timeAgo: '2 hours ago',
      comment: 'Tip 4 u',
    },
    {
      profilePic: 'img/default-avatar.png',
      username: 'very_very_looong_username',
      amount: '1,000,000',
      timeAgo: '4 days ago',
      comment:
        'Very long tip message for you just you. Looooooooong tip message for a big tip from me to you.',
    },
    {
      profilePic: 'img/default-avatar.png',
      username: 'normalguy',
      amount: '10,000',
      timeAgo: '2 weeks ago',
      comment: 'Just a normal guy sending you a normal tip.',
    },
    {
      profilePic: 'img/default-avatar.png',
      username: 'elonmusk',
      amount: '4,000',
      timeAgo: '1 year ago',
    },
  ];
const TipsSent = () => {
  return (
    FEED_ITEMS.map((item, index) => (
        <FeedItem key={index} {...item} />
      ))
  )
}

export default TipsSent