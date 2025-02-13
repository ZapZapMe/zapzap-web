import React from 'react';
import { useSelector } from 'react-redux';

import FeedItem from './FeedItem';
import FeedItemSkeleton from '../../../components/ui/LoadingSkeleton/FeedItemSkeleton';
import { Tabs } from '../constants';

const TipsSent = () => {
  const state = useSelector((state) => state.profile);
  const { tipsSent, tipsLoading } = state;

  if (tipsLoading)
    return [...Array(3)].map((_, index) => <FeedItemSkeleton key={index} />);

  if (tipsSent?.length)
    return tipsSent?.map((item, index) => (
      <FeedItem mode={Tabs.SENT} key={index} {...item} />
    ));

  return <>No tips sent yet!</>;
};

export default TipsSent;
