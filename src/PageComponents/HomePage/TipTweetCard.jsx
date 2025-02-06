import React, { useState, useEffect } from 'react';

function TipTweetCard({ onSubmit, initialTweetData = null, setIsTweetLoaded, isTweetLoaded }) {
  const [tweetURL, setTweetURL] = useState(initialTweetData?.url || '');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 

  const handleTweetURLChange = async (e) => {
    const url = e.target.value;
    setTweetURL(url);
    setIsTweetLoaded(false);

    // Clear previous tweet
    const container = document.getElementById('tweet-embed-container');
    if (container) {
      container.innerHTML = '';
    }

    const tweetRegex = /^https:\/\/(?:www\.)?(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status\/(\d+)$/;
    const match = url.match(tweetRegex);

    setIsInvalid(!match && url.length > 0);

    if (match && window.twttr) {
      setIsLoading(true);
      try {
        await window.twttr.widgets.createTweetEmbed(
          match[2],
          document.getElementById('tweet-embed-container'),
          {
            theme: 'dark',
            align: 'center'
          }
        ).then(() => {
          setIsTweetLoaded(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error embedding tweet:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h3>Tip a Tweet</h3>
      <div className="tipTweetForm">
        <input
          className={`tipTweetURLInput ${isInvalid ? 'invalid' : ''}`}
          type="text"
          placeholder="https://x.com/user/status/123456789101112"
          value={tweetURL}
          onChange={handleTweetURLChange}
        />
        {isInvalid && (
          <span className="tipTweetURLErrorMsg">
            Enter a valid Tweet URL
          </span>
        )}
        
        {/* <div 
          id="tweet-embed-container" 
          className={`tweet-embed-container ${isTweetLoaded ? 'loaded' : ''}`}
        >
          {isLoading && <div className="tweet-loader">Loading tweet...</div>}
        </div> */}
      </div>

      <button
        className="tipTweetURLButton primary filled"
        disabled={isInvalid || !tweetURL || !isTweetLoaded}
        onClick={() => onSubmit(tweetURL)}
      >
        Tip This Tweet
      </button>
    </>
  );
}

export default TipTweetCard;