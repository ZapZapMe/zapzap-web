import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import { useParams } from 'react-router-dom';
import { getUsersTipReceived } from '../../lib/utils/apiHandlers';
import FeedItemSkeleton from '../../components/ui/LoadingSkeleton/FeedItemSkeleton';

const TipsRecieved = ({data, isLoading}) => {
  // const {username} = useParams();
  // const [tipsReceieved, setTipsReceived] = useState([]);
  // // useEffect for fetching feed
  // const fetchDaFeed = async () => {
  //   const receieved = await getUsersTipReceived(username);

  //   if (receieved.status === 200) setTipsReceived(receieved.data);
  // };

  // useEffect(() => {
  //   fetchDaFeed();
  // }, []);
  if (isLoading) return [...Array(3)].map((_, index) => <FeedItemSkeleton key={index} />)
  if (data)
    return data?.map((item, index) => (
      <FeedItem mode="received" key={index} {...item} />
    ));

  return <>No tips received yet!</>;
};

export default TipsRecieved;
