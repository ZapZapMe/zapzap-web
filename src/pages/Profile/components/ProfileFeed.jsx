import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import TipsSent from './TipsSent';
import TipsReceived from './TipsReceived';
import {
  getUsersTipReceived,
  getUsersTipSent,
} from '../../../lib/utils/apiHandlers';
import {
  setActiveTab,
  setTipsReceived,
  setTipsSent,
  setTipsLoading,
} from '../profileSlice';
import { Tabs } from '../constants';

const ProfileFeed = () => {
  const state = useSelector((state) => state.profile);
  const { activeTab } = state;

  const dispatch = useDispatch();

  const { username } = useParams();

  useEffect(() => {
    const fetchDaFeed = async () => {
      dispatch(setTipsLoading(true));

      const [received, sent] = await Promise.all([
        getUsersTipReceived(username),
        getUsersTipSent(username),
      ]);

      if (received.status === 200) dispatch(setTipsReceived(received.data));

      if (sent.status === 200) dispatch(setTipsSent(sent.data));

      dispatch(setTipsLoading(false));
    };

    fetchDaFeed();
  }, [username, dispatch]);

  const handleTabChange = (tab) => () => dispatch(setActiveTab(tab));

  return (
    <div className="profileBottom">
      {/* Tabs */}
      <div className="flex mt-2 cursor-pointer text-sm font-bold rounded-full bg-[#333333]">
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
            activeTab === Tabs.SENT ? 'bg-amber-500 text-black' : ' text-white'
          }`}
        >
          Tips Sent
        </div>
      </div>

      <div className="profileFeed">
        {activeTab === Tabs.SENT ? <TipsSent /> : <TipsReceived />}
      </div>
    </div>
  );
};

export default ProfileFeed;
