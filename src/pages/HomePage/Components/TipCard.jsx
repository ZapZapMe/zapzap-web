import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TipSatForm from './TipSatsForm';
import TipTweetCard from './TipTweetCard';
import TipQR from './TipQR';
import TipCommentForm from './TipCommentForm';
import { createInvoice } from '../../../lib/utils/apiHandlers';
import toast from 'react-hot-toast';
import TipSuccess from './TipSuccess';
import { useAuth } from '../../../lib/contexts/AuthContext';
import {
  setStep,
  setTweetData,
  setInvoiceData,
  setComment,
} from '../homePageSlice';

function TipCard() {
  const state = useSelector((state) => state.homePage);

  const {
    isLoading = false,
    isTweetLoaded = false,
    step,
    tweetData = null,
    comment = '',
    // invoiceData = null,
  } = state;
  const dispatch = useDispatch();

  // const [step, setStep] = useState(1);
  // const [tweetData, ] = useState(null);
  // -------> interface for tweetData
  // tweetData:{
  //   comment:{
  //     text:string
  //   },
  //   accountTitle:string
  //   satAmount:number;
  //   tip_sender:string;
  //   url:string;
  // }
  const { user } = useAuth();
  const twitter_username = user?.twitter_username;

  const handleCommentSubmit = (comment, shouldSkip = false) => {
    dispatch(setStep(3));
    if (!shouldSkip) {
      dispatch(setTweetData({ comment }));
    }
  };

  const handleSatSubmit = async (amount) => {
    dispatch(setTweetData({ satAmount: amount }));
    dispatch(setComment(tweetData?.comment?.text));
    const body = {
      amount_sats: amount,
      comment: comment || '',
      tip_sender: twitter_username ?? 'anonymous',
      shouldPostOnX: tweetData?.comment?.postOnX,
      tweet_url: tweetData?.url,
    };

    toast.promise(
      createInvoice(body), // This must be a Promise!
      {
        loading: 'Creating tip...',
        success: (response) => {
          console.log(response.data);
          dispatch(setInvoiceData(response.data));
          dispatch(setStep(4));
          return 'Tip created successfully!';
        },
        error: (error) => {
          console.log('🚀 ~ handleSatSubmit ~ error:', error);
          if (error.detail) {
            return 'Unauthorized! Please log in again.';
          }
          return 'Something went wrong!';
        },
      }
    );
  };

  const handleBack = () => {
    dispatch(setStep(step - 1));
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <TipTweetCard />;
      case 2:
        return (
          <TipCommentForm onSubmit={handleCommentSubmit} onBack={handleBack} />
        );
      case 3:
        return <TipSatForm onSubmit={handleSatSubmit} onBack={handleBack} />;
      case 4:
        return (
          <TipQR onBack={handleBack} onSuccess={() => dispatch(setStep(5))} />
        );
      case 5:
        return <TipSuccess />;
      default:
        return null;
    }
  };

  return (
    <div className="tip-container">
      <div className="tipCard">{renderCurrentStep()}</div>

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
