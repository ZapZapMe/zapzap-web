import React from 'react';
import TipSatForm from './TipSatsForm';
import TipTweetFormButtonGroup from './TipTweetFormButtonGroup';
import TipTweetUserMessage from './TipTweetUserMessage';
import TipQR from './TipQR';
import TipSuccess from './TipSuccess';

function TipCard({ type }) {
  return (
    <div className="tipCard">
      {type === 'form' && (
        <>
          <TipSatForm />
          <TipTweetFormButtonGroup />
        </>
      )}
      {type === 'userMessage' && (
        <>
          <TipTweetUserMessage />
          <TipQR />
        </>
      )}
      {type === 'success' && <TipSuccess />}
    </div>
  );
}

export default TipCard;
