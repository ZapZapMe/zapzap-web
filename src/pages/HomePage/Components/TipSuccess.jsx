import React, { useEffect, useState } from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

import { resetToInitialState } from '../homePageSlice';
import ZZButton from '../../../components/ui/ZZButton';
import usePostTipOnX from '../hooks/usePostTipOnX';

function TipSuccess() {
  const state = useSelector((state) => state.homePage);
  const { tweetData = null, tenorGifObject = null } = state;
  const dispatch = useDispatch();
  const [isProcessingGif, setIsProcessingGif] = useState(false);

  // If tenor gif object but no GIF tweet url, still processing
  useEffect(() => {
    if (tenorGifObject?.tenorUrl && !tweetData?.gifTweetUrl) {
      setIsProcessingGif(true);
    } else {
      setIsProcessingGif(false);
    }
  }, [tenorGifObject?.tenorUrl, tweetData?.gifTweetUrl]);

  const onViewClick = () => window.open(tweetData?.url, '_blank');
  const onViewGifClick = () => window.open(tweetData?.gifTweetUrl, '_blank');

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
        a tip of <span className="tipTweetSat">{tweetData?.satAmount}sat</span>{' '}
        with ZapZap
      </h3>

      {isProcessingGif && (
        <div
          style={{
            padding: '1rem',
            background: '#fff3cd',
            border: '1px solid #ffeeba',
            borderRadius: '4px',
            margin: '1rem auto',
            textAlign: 'center',
            maxWidth: '85%',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>Processing your GIF...</div>
          <div
            className="spinner"
            style={{
              width: '20px',
              height: '20px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
              display: 'inline-block',
              marginRight: '10px',
              verticalAlign: 'middle',
            }}
          />
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
          <span style={{ verticalAlign: 'middle' }}>
            Please wait before tweeting
          </span>
        </div>
      )}

      <div className="tipSuccessButtonGroup">
        {tweetData?.comment?.postOnX ? (
          <ZZButton onClick={onViewClick} className="blue stroke">
            View Tip Tweet <SquareArrowOutUpRight />
          </ZZButton>
        ) : null}

        {tweetData?.gifTweetUrl ? (
          <ZZButton onClick={onViewGifClick} className="blue stroke">
            View GIF Tweet <SquareArrowOutUpRight />
          </ZZButton>
        ) : null}

        <ZZButton
          onClick={handlePostTipOnX}
          className="primary filled"
          disabled={isProcessingGif}
          style={{ opacity: isProcessingGif ? 0.7 : 1 }}
        >
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
