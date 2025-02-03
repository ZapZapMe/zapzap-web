import React, { useEffect, useState } from 'react';
import TipSatForm from './TipSatsForm';
import TipTweetCard from './TipTweetCard';
import TipQR from './TipQR';
import TipCommentForm from './TipCommentForm';
import { createInvoice } from '../../lib/utils/apiHandlers';
import toast from 'react-hot-toast';

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
    setStep(4);
    const response =  createInvoice({
      amount_sats:amount,
      comment:tweetData.comment?.text??"",
      tip_sender:"anonymous",
      tweet_url:tweetData?.url
    })


    toast.promise(response, {
      loading: 'Creating tip!',
      success: 'Tip created successfully!',
      error: 'Something went wrong!',
    });
    

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

  useEffect(() => {
    // Create an EventSource connection to your backend endpoint
    const eventSource = new EventSource('http://localhost:8080/sse/subscribe');

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      console.log("🚀 ~ useEffect ~ event:", event)
      const data = JSON.parse(event.data);
      if (data.type === 'success') {
        toast(data.message);
        
        // Clear notification after 5 seconds
        // setTimeout(() => {
        //   setNotification(null);
        // }, 5000);
      }
    };

    // Handle errors
    eventSource.onerror = () => {
      console.error('EventSource failed.');
      eventSource.close();
      toast.error("Something went wrong!")
    };

    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []);
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