import React from "react";

function TipTweetCard() {
  return (
    <div className="tipCard">
      <h3>Tip a Tweet</h3>
      <div className="tipTweetForm">
        <input
          className="tipTweetURLInput"
          type="text"
          placeholder="https://x.com/user/status/123456789101112"
        />
        <span className="tipTweetURLErrorMsg hide">Enter a valid Tweet URL</span>
      </div>
      <button className="tipTweetURLButton primary filled" disabled>
        Tip This Tweet
      </button>
    </div>
  );
}

export default TipTweetCard;
