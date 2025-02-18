import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth } from '../../../lib/contexts/AuthContext';
import { resetToInitialState } from '../homePageSlice';
import ZZButton from '../../../components/ui/ZZButton';
import toast from 'react-hot-toast';

function TipSuccess() {
  const state = useSelector((state) => state.homePage);
  const { tweetData = null } = state;

  const { user } = useAuth();

  const dispatch = useDispatch();

  const onViewClick = () => window.open(tweetData?.url, '_blank');

  const resetProgress = () => {
    dispatch(resetToInitialState());
    const container = document.getElementById('tweet-embed-container');
    if (container) {
      container.innerHTML = '';
    }
  };

  const handlePostTipOnX = () => {
    const tweet = tweetData?.comment?.text;
    const comment = tweet ? `⚡ ${tweet} ⚡\n` : '';
    const satAmount = tweetData?.satAmount || 0;
    const accountTitle = tweetData?.accountTitle?.replace('@', '') || '';
    const tweetId = tweetData?.tweetId || '';
    const tweetText = encodeURIComponent(
      `${comment}I just zapped you ${satAmount} sats zap-zap.me/${accountTitle} - via @ZapZapBot!`
    );

    if (!tweetId) {
      toast.error('Invalid tweet ID');
      return;
    }

    const tweetWindow = window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}&in_reply_to=${tweetId}`,
      '_blank'
    );

    if (tweetWindow) {
      tweetWindow.focus();
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
