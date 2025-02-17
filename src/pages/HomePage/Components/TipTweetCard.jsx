import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  setIsTweetLoaded,
  setTweetURL,
  setIsLoading,
  setIsInvalid,
  setTweetData,
  setStep,
  setSelfTipping,
} from '../homePageSlice';
import { useAuth } from '../../../lib/contexts/AuthContext';

const selfTipMessage = "You can't Tip yourself!";

function TipTweetCard() {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const { user } = useAuth();

  const {
    isLoading = false,
    isInvalid = false,
    isTweetLoaded = false,
    isSelfTipping = false,
    tweetURL,
  } = state;

  function extractTwitterHandle(url) {
    const match = url.match(/(?:twitter.com|x.com)\/([^/?]+)/i);
    return match ? `@${match[1]}` : null;
  }

  const handleTweetSubmit = async () => {
    dispatch(
      setTweetData({
        url: tweetURL,
        accountTitle: extractTwitterHandle(tweetURL),
      })
    );
    dispatch(setStep(2));
  };

  const handleTweetURLChange = async (e) => {
    const url = e.target.value.split('?')[0];
    dispatch(setTweetURL(url));
    dispatch(setIsTweetLoaded(false));

    const twitterAccountName = extractTwitterHandle(url);

    if (
      twitterAccountName &&
      user?.twitter_username &&
      twitterAccountName?.replace('@', '')?.toLowerCase() ===
        user?.twitter_username?.toLowerCase()
    ) {
      dispatch(setSelfTipping(true));
      toast.error(selfTipMessage);

      return;
    }

    if (isSelfTipping) {
      dispatch(setSelfTipping(false));
    }

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
          className={`tipTweetURLInput ${isInvalid || isSelfTipping ? 'invalid' : ''}`}
          type="text"
          placeholder="https://x.com/user/status/123456789101112"
          value={tweetURL || ''}
          onChange={handleTweetURLChange}
        />
        {isInvalid ? (
          <span className="tipTweetURLErrorMsg">Enter a valid Tweet URL</span>
        ) : null}

        {isSelfTipping ? (
          <span className="tipTweetURLErrorMsg">{selfTipMessage}</span>
        ) : null}
      </div>

      <button
        className="tipTweetURLButton primary filled"
        disabled={isInvalid || isSelfTipping || !tweetURL || !isTweetLoaded}
        onClick={handleTweetSubmit}
      >
        Tip This Tweet
      </button>
    </>
  );
}

export default TipTweetCard;
