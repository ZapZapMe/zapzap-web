import React from 'react';
import { useSelector } from 'react-redux';
import TipSatForm from './TipSatsForm';
import TipTweetCard from './TipTweetCard';
import TipQR from './TipQR';
import TipCommentForm from './TipCommentForm';
import TipSuccess from './TipSuccess';

function TipCard() {
  const state = useSelector((state) => state.homePage);

  const { isLoading = false, isTweetLoaded = false, step } = state;

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <TipTweetCard />;
      case 2:
        return <TipCommentForm />;
      case 3:
        return <TipSatForm />;
      case 4:
        return <TipQR />;
      case 5:
        return <TipSuccess />;
      default:
        return null;
    }
  };

  return (
    <div className="tip-container">
      <div className="tipCard">{renderCurrentStep()}</div>

      <div
        id="tweet-embed-container"
        className={`tweet-embed-container ${isTweetLoaded ? 'loaded' : ''}`}
      ></div>
      {isLoading ? <div className="tweet-loader">Loading tweet...</div> : null}
    </div>
  );
}

// MainContainer
// C1: to store whats the current twitter post.
// C2: what to do with that post ( enter tweet => tipcomment => tipSatform => TipQR)

export default TipCard;
