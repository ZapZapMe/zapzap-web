import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsTweetLoaded,
  setTweetURL,
  setIsLoading,
  setIsInvalid,
} from '../homePageSlice';

function TipTweetCard({ onSubmit }) {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const {
    isLoading = false,
    isInvalid = false,
    isTweetLoaded = false,
    tweetURL,
  } = state;

  const handleTweetURLChange = async (e) => {
    const url = e.target.value;
    dispatch(setTweetURL(url));
    dispatch(setIsTweetLoaded(false));

    // Clear previous tweet
    const container = document.getElementById('tweet-embed-container');
    if (container) {
      container.innerHTML = '';
    }

    const tweetRegex =
      /^https:\/\/(?:www\.)?(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status\/(\d+)$/;
    const match = url.match(tweetRegex);

    dispatch(setIsInvalid(!match && url.length > 0));

    if (match && window.twttr) {
      dispatch(setIsLoading(true));
      try {
        await window.twttr.widgets
          .createTweetEmbed(
            match[2],
            document.getElementById('tweet-embed-container'),
            {
              theme: 'dark',
              align: 'center',
            }
          )
          .then(() => {
            dispatch(setIsTweetLoaded(true));
            dispatch(setIsLoading(false));
          });
      } catch (error) {
        console.error('Error embedding tweet:', error);
        dispatch(setIsLoading(false));
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
          value={tweetURL || ''}
          onChange={handleTweetURLChange}
        />
        {isInvalid ? (
          <span className="tipTweetURLErrorMsg">Enter a valid Tweet URL</span>
        ) : null}

        <div
          id="tweet-embed-container"
          className={`tweet-embed-container ${isTweetLoaded ? 'loaded' : ''}`}
        >
          {isLoading ? (
            <div className="tweet-loader">Loading tweet...</div>
          ) : null}
        </div>
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
