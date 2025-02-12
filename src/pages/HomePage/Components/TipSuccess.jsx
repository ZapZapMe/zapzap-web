import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

function TipSuccess({ resetProgress }) {
  const state = useSelector((state) => state.homePage);
  const { tweetData = null } = state;

  const onViewClick = () => window.open(tweetData?.url, '_blank');

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
