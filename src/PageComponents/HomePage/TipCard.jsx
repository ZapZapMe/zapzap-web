import React, { useState } from 'react';
import TipSatForm from './TipSatsForm';
import TipTweetCard from './TipTweetCard';
import TipQR from './TipQR';

function TipCard() {
  const [step, setStep] = useState(1);
  const [tweetData, setTweetData] = useState(null);
  const [satAmount, setSatAmount] = useState(null);

  const handleTweetSubmit = async (tweetUrl) => {
    setTweetData({ url: tweetUrl });
    setStep(2);
  };

  const handleSatSubmit = (amount) => {
    setSatAmount(amount);
    setStep(3);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return <TipTweetCard onSubmit={handleTweetSubmit} initialTweetData={tweetData} />;
      case 2:
        return <TipSatForm onSubmit={handleSatSubmit} onBack={handleBack} tweetData={tweetData} />;
      case 3:
        return <TipQR tweetData={tweetData} satAmount={satAmount} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="tipCard">
      {renderCurrentStep()}
    </div>
  );
}

export default TipCard;