import React from "react";

function TipTweetFormButtonGroup() {
  return (
    <div className="tipTweetFormButtonGroup">
      <button className="tipSatBackButton black stroke">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M23 2L9 16L23 30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="tipSatButton primary filled stretch" disabled>
        Next
      </button>
    </div>
  );
}

export default TipTweetFormButtonGroup;
