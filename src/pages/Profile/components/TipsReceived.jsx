import React from 'react';
import { useSelector } from 'react-redux';

import FeedItem from './FeedItem';
import FeedItemSkeleton from '../../../components/ui/LoadingSkeleton/FeedItemSkeleton';
import { Tabs } from '../constants';

const TipsReceived = () => {
  const state = useSelector((state) => state.profile);
  const { tipsReceived, tipsLoading } = state;

  if (tipsLoading)
    return [...Array(3)].map((_, index) => <FeedItemSkeleton key={index} />);

  if (tipsReceived?.length)
    return tipsReceived?.map((item, index) => (
      <FeedItem mode={Tabs.RECEIVED} key={index} {...item} />
    ));

  return <>No tips received yet!</>;
};

export default TipsReceived;
