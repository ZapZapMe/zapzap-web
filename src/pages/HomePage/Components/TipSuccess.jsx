import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

import { resetToInitialState } from '../homePageSlice';
import ZZButton from '../../../components/ui/ZZButton';
import usePostTipOnX from '../hooks/usePostTipOnX';

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

  const handlePostTipOnX = usePostTipOnX();

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
        a tip of <a className="tipTweetSat">{tweetData?.satAmount}sat</a> with
        ZapZap
      </h3>
      <div className="tipSuccessButtonGroup">
        {tweetData?.comment?.postOnX ? (
          <ZZButton onClick={onViewClick} className="blue stroke">
            View Tip Tweet <SquareArrowOutUpRight />
          </ZZButton>
        ) : null}
        <ZZButton onClick={handlePostTipOnX} className="primary filled">
          Tweet it!
        </ZZButton>
        <ZZButton onClick={resetProgress} className="primary filled">
          Send Another Tip
        </ZZButton>
      </div>
    </div>
  );
}

export default TipSuccess;
