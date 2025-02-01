// TipSatsForm.jsx
import React, { useState } from 'react';

function TipSatForm({ onSubmit, onBack, tweetData }) {
  const [satValue, setSatValue] = useState('');

  const handleChange = (e) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/[^\d]/g, '');
    setSatValue(value);
  };

  const handleQuickSat = (val) => {
    setSatValue(val);
  };

  const formatSatValue = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat().format(value);
  };

  return (
    <>
      <h3>Enter Amount</h3>
      <div className="tipSatForm">
        <div className="tipSatInputRow">
          <input
            className={`tipSatInput ${satValue ? 'edited' : ''}`}
            type="text"
            placeholder="0"
            value={formatSatValue(satValue)}
            onChange={handleChange}
            style={{
              width: `${Math.max(formatSatValue(satValue).length, 1)}ch`
            }}
          />
          <div>sat</div>
        </div>

        <div className="tipQuickSat">
          {[1000, 2000, 4000, 10000].map(amount => (
            <span 
              key={amount}
              onClick={() => handleQuickSat(amount)}
            >
              {formatSatValue(amount)}
            </span>
          ))}
        </div>

        <div className="tipTweetFormButtonGroup">
          <button 
            className="tipSatBackButton black stroke"
            onClick={onBack}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 2L9 16L23 30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="tipSatButton primary filled stretch"
            disabled={!satValue}
            onClick={() => onSubmit(parseInt(satValue, 10))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default TipSatForm;