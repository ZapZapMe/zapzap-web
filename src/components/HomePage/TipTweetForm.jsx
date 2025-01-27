import React from "react";

function TipTweetForm() {
  return (
    <div className="tipTweetForm">
      <input
        className="tipTweetURLInput"
        type="text"
        placeholder="https://x.com/user/status/123456789101112"
      />
      <span className="tipTweetURLErrorMsg hide">Enter a valid Tweet URL</span>
    </div>
  );
}

export default TipTweetForm;
