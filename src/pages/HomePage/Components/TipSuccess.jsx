import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

import { resetToInitialState } from '../homePageSlice';

function TipSuccess() {
  const state = useSelector((state) => state.homePage);
  const { tweetData = null } = state;

  const dispatch = useDispatch();

  const onViewClick = () => window.open(tweetData?.url, '_blank');

  const resetProgress = () => {
    dispatch(resetToInitialState());
    const container = document.getElementById('tweet-embed-container');
    if (container) {
      container.innerHTML = '';
    }
  };

  return (
    <div className="tipCard">
      <h1 className="tipSuccess">Tip Success!</h1>
      <h3 style={{ maxWidth: '85%' }}>
        You successfully sent{' '}
        <a
          href={`https://x.com/${tweetData?.accountTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tipTweetUser"
        >
          {tweetData?.accountTitle}
        </a>
        a tip of <a className="tipTweetSat">{tweetData.satAmount}sat</a> with
        ZapZap
      </h3>
      <div className="tipSuccessButtonGroup">
        <button
          onClick={onViewClick}
          className="tipQRViewTweetButton blue stroke"
        >
          View Tip Tweet <SquareArrowOutUpRight />
        </button>
        <button
          onClick={resetProgress}
          className="tipQRSendAnotherButton primary filled"
        >
          Send Another Tip
        </button>
      </div>
    </div>
  );
}

export default TipSuccess;
