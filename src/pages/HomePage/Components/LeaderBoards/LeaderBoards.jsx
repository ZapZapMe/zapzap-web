import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import { Tabs } from '../../constants';
import {
  fetchLeaderboardReceived,
  fetchLeaderboardSent,
  setActiveTab,
} from '../../homePageSlice';
import './LeaderBoards.scss';
import TabContent from './TabContent';

const LeaderBoards = () => {
  const state = useSelector((state) => state.homePage);

  const { leaderboardLoading = false, activeTab } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboardReceived());
    dispatch(fetchLeaderboardSent());
  }, [dispatch]);

  const handleTabChange = (tab) => () => dispatch(setActiveTab(tab));

  return (
    <div className="leaderboards-container">
      <h3>Leaderboards {leaderboardLoading ? 'are loading' : ''}</h3>
      {leaderboardLoading ? (
        <Spinner animation="grow" variant="warning" />
      ) : (
        <>
          <div className="flex w-100 mt-2 p-1 cursor-pointer text-sm font-bold rounded-full bg-[#333333]">
            <div
              onClick={handleTabChange(Tabs.RECEIVED)}
              className={`flex-1 py-3  rounded-full text-center  ${
                activeTab === Tabs.RECEIVED
                  ? 'bg-amber-500 text-black'
                  : ' text-white '
              }`}
            >
              Tips Received
            </div>
            <div
              onClick={handleTabChange(Tabs.SENT)}
              className={`flex-1 py-3 rounded-full text-center  ${
                activeTab === Tabs.SENT
                  ? 'bg-amber-500 text-black'
                  : ' text-white'
              }`}
            >
              Tips Sent
            </div>
          </div>

          <TabContent tabName={activeTab} />
        </>
      )}
    </div>
  );
};

export default LeaderBoards;
