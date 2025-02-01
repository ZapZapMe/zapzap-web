import React, { useEffect, useState } from 'react';
import TipSatForm from './TipSatsForm';
import TipTweetCard from './TipTweetCard';
import TipQR from './TipQR';
import TipCommentForm from './TipCommentForm';
import { createInvoice } from '../../lib/utils/apiHandlers';

function TipCard() {
  const [step, setStep] = useState(1);
  const [tweetData, setTweetData] = useState(null);
  console.log("🚀 ~ TipCard ~ tweetData:", tweetData)
  const [isTweetLoaded, setIsTweetLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [invoiceData, setInvoiceData] = useState();

  function extractTwitterHandle(url) {
    const match = url.match(/(?:twitter.com|x.com)\/([^/?]+)/i);
    return match ? `@${match[1]}` : null;
  }

  const handleTweetSubmit = async (tweetUrl) => {
    setTweetData({ url: tweetUrl, accountTitle:extractTwitterHandle(tweetUrl) });
    setStep(2);
  };

  const handleCommentSubmit = (comment, shouldSkip=false)=>{
    setStep(3)
    if (!shouldSkip){
      setTweetData(prev=>({...prev, comment}))
    }
  }
  const handleSatSubmit = async(amount) => {
    setTweetData(prev=>({...prev, satAmount:amount}))
    
    
    const response = await createInvoice({
      amount_sats:amount,
      comment:tweetData.comment?.text??"",
      tip_sender:"anonymous",
      tweet_url:tweetData?.url
    })

    if (response && response.status===200){
      // 
      console.log(response.data)
      setInvoiceData(response.data)
      setStep(4);

    }   
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };


  // useEffect(() => {
  //   // Load Twitter widgets script
  //   if (!window.twttr) {
  //     // const script = document.createElement('script');
  //     // script.src = 'https://platform.twitter.com/widgets.js';
  //     // script.async = true;
  //     // document.body.appendChild(script);
  //   }
  //   console.log('====================================');
  //   console.log('in useeffect');
  //   console.log('====================================');
  //   // If we have initial tweet data, load the tweet
  //   if (tweetData && window.twttr) {
  //     const tweetId = tweetData.url.split('/').pop();
  //     window.twttr.widgets.createTweetEmbed(
  //       tweetId,
  //       document.getElementById('tweet-embed-container'),
  //       {
  //         theme: 'dark',
  //         align: 'center'
  //       }
  //     ).then(() => {
  //       setIsTweetLoaded(true);
  //     });
  //   }
  // }, [tweetData]);
  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return <TipTweetCard onSubmit={handleTweetSubmit} initialTweetData={tweetData} setIsTweetLoaded={setIsTweetLoaded} isTweetLoaded={isTweetLoaded} />;
      case 2:
        return <TipCommentForm initialComment={tweetData?.comment?.text??""} onSubmit={handleCommentSubmit} onBack={handleBack} twitterHandle={tweetData?.accountTitle??""} />;
      case 3:
        return <TipSatForm onSubmit={handleSatSubmit} onBack={handleBack} tweetData={tweetData}/>;
      case 4:
        return <TipQR tweetData={tweetData} invoiceData={invoiceData}  onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className='tip-container'>
      <div className="tipCard">
        {renderCurrentStep()}
      </div>

      <div 
           id="tweet-embed-container" 
           className={`tweet-embed-container ${isTweetLoaded ? 'loaded' : ''}`}
         >
           {isLoading && <div className="tweet-loader">Loading tweet...</div>}
        </div>
    </div>
  );
}


// MainContainer
  // C1: to store whats the current twitter post.
  // C2: what to do with that post ( enter tweet => tipcomment => tipSatform => TipQR)

export default TipCard;