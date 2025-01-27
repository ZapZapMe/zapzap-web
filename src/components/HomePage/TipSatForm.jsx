import React from "react";

function TipSatForm() {
  return (
    <div className="tipSatForm">
      <div className="tipSatInputRow">
        <div className="tipSatInput" placeholder="0" contentEditable></div>
        <div>sat</div>
      </div>
      <div className="tipQuickSat">
        <span value="1000">1,000</span>
        <span value="2000">2,000</span>
        <span value="4000">4,000</span>
        <span value="10000">10,000</span>
      </div>
    </div>
  );
}

export default TipSatForm;
