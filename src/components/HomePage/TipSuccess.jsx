import React from 'react';

function TipSuccess() {
  return (
    <div className="tipCard">
      <h1 className="tipSuccess">Tip Success!</h1>
      <h3>
        You successfully sent{' '}
        <a
          href="https://x.com/imaginator"
          target="_blank"
          rel="noopener noreferrer"
          className="tipTweetUser"
        >
          @imaginator
        </a>
        a tip of <a className="tipTweetSat">1,000 sat</a> with ZapZap
      </h3>
      <div className="tipSuccessButtonGroup">
        <button className="tipQRViewTweetButton blue stroke">
          View Tip Tweet
        </button>
        <button className="tipQRSendAnotherButton primary filled">
          Send Another Tip
        </button>
      </div>
    </div>
  );
}

export default TipSuccess;
