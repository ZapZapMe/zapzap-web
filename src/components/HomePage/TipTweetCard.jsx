import React, { useState } from 'react';

function TipTweetCard() {
  const [tweetURL, setTweetURL] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const tweetRegex = /^(https?:\/\/)?(www\.)?x\.com\/user\/status\/\d+$/;

  const handleChange = (e) => {
    const val = e.target.value;
    setTweetURL(val);

    if (!val) {
      setIsInvalid(false);
    } else {
      setIsInvalid(!tweetRegex.test(val));
    }
  };

  const isButtonDisabled = !tweetURL || isInvalid;

  const handleTip = () => {
    alert(`Tipping tweet: ${tweetURL}`);
  };

  return (
    <div className="tipCard">
      <h3>Tip a Tweet</h3>

      <div className="tipTweetForm">
        <input
          className={`tipTweetURLInput ${isInvalid ? 'invalid' : ''}`}
          type="text"
          placeholder="https://x.com/user/status/123456789101112"
          value={tweetURL}
          onChange={handleChange}
        />
        <span className={`tipTweetURLErrorMsg ${isInvalid ? '' : 'hide'}`}>
          Enter a valid Tweet URL
        </span>
      </div>

      <button
        className="tipTweetURLButton primary filled"
        disabled={isButtonDisabled}
        onClick={handleTip}
      >
        Tip This Tweet
      </button>
    </div>
  );
}

export default TipTweetCard;
