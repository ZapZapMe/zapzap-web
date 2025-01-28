import React, { useState } from 'react';

function TipSatForm() {
  const [satValue, setSatValue] = useState(''); // or 0

  const handleChange = (e) => {
    setSatValue(e.target.value);
  };

  const handleQuickSat = (val) => {
    setSatValue(val);
  };

  return (
    <div className="tipSatForm">
      <div className="tipSatInputRow">
        <div>
          <input
            className="tipSatInput"
            placeholder="0"
            value={satValue}
            onChange={handleChange}
          />
        </div>

        <div>sats</div>
      </div>
      <div className="tipQuickSat">
        <span onClick={() => handleQuickSat('1000')}>1,000</span>
        <span onClick={() => handleQuickSat('2000')}>2,000</span>
        <span onClick={() => handleQuickSat('4000')}>4,000</span>
        <span onClick={() => handleQuickSat('10000')}>10,000</span>
      </div>
    </div>
  );
}

export default TipSatForm;
