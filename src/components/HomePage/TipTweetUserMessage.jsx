import React from 'react';

function TipTweetUserMessage() {
  return (
    <div className="tipTweetUserMessage">
      <h3>
        Send{' '}
        <a
          href="https://x.com/imaginator"
          target="_blank"
          rel="noopener noreferrer"
          className="tipTweetUser"
        >
          @imaginator
        </a>{' '}
        a tip of{' '}
        <a className="tipTweetSat">
          1,000 sat
          <img src="img/12x12-edit.svg" alt="Edit" />
        </a>
      </h3>
      <div className="tipTweetMessage">
        “Hey man, cool stuff! Here’s a little something for you.” -
        @self_profile
      </div>
    </div>
  );
}

export default TipTweetUserMessage;
