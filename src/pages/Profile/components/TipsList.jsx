import React from 'react';
import { useSelector } from 'react-redux';

import FeedItem from './FeedItem';
import NoTipsPlaceholder from './NoTipsPlaceholder';
import FeedItemSkeleton from '../../../components/ui/LoadingSkeleton/FeedItemSkeleton';
import { Tabs } from '../constants';

const TipsList = () => {
  const state = useSelector((state) => state.profile);
  const { activeTab, tipsSent, tipsReceived, tipsLoading } = state;

  const tipsList = activeTab === Tabs.RECEIVED ? tipsReceived : tipsSent;

  if (tipsLoading)
    return [...Array(3)].map((_, index) => <FeedItemSkeleton key={index} />);

  if (tipsList?.length)
    return tipsList?.map((item, index) => (
      <FeedItem mode={Tabs.RECEIVED} key={index} {...item} />
    ));

  return <NoTipsPlaceholder />;
};

export default TipsList;
