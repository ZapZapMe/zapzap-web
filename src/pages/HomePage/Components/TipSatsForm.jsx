import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import CommentBox from './CommentBox';
import { createInvoice } from '../../../lib/utils/apiHandlers';
import {
  setSatValue,
  setTweetData,
  setComment,
  setInvoiceData,
  setStep,
} from '../homePageSlice';
import ZZButton from '../../../components/ui/ZZButton';

function TipSatForm() {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const { satValue, tweetData = null, comment = '' } = state;

  const { user } = useSelector((state) => state.auth);

  const twitter_username = user?.twitter_username;

  const handleChange = (e) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/[^\d]/g, '');
    dispatch(setSatValue(value));
  };

  const handleQuickSat = (val) => {
    dispatch(setSatValue(val));
  };

  const formatSatValue = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat().format(value);
  };

  const handleSatSubmit = async () => {
    const amount = parseInt(satValue, 10);

    dispatch(setTweetData({ satAmount: amount }));
    dispatch(setComment(tweetData?.comment?.text));
    const body = {
      amount_sats: amount,
      comment: comment || '',
      tip_sender: twitter_username || 'anonymous',
      shouldPostOnX: tweetData?.comment?.postOnX,
      tweet_url: tweetData?.url,
    };

    toast.promise(
      createInvoice(body), // This must be a Promise!
      {
        loading: 'Creating tip...',
        success: (response) => {
          dispatch(setInvoiceData(response.data));
          dispatch(setStep(4));
          return 'Tip created successfully!';
        },
        error: (error) => {
          if (error.detail) {
            return 'Unauthorized! Please log in again.';
          }
          return 'Something went wrong!';
        },
      }
    );
  };

  const handleGoBack = () => {
    dispatch(setStep(2));
  };

  return (
    <>
      <div className=" w-full flex items-center gap-4 flex-col text-[#333333]">
        <span className="tip-comment-form__header">
          I want to tip{' '}
          <span className="twitter-handle">{tweetData?.accountTitle}</span>
        </span>
        {tweetData?.comment && twitter_username && (
          <CommentBox
            text={tweetData?.comment.text}
            twitterHandler={twitter_username}
          />
        )}
      </div>

      <div className="tipSatForm">
        <div className="tipSatInputRow">
          <input
            className={`tipSatInput ${satValue ? 'edited' : ''}`}
            type="text"
            placeholder="0"
            value={formatSatValue(satValue)}
            onChange={handleChange}
          />
          <div>sats</div>
        </div>

        <div className="tipQuickSat">
          {[1000, 2000, 4000, 10000].map((amount) => (
            <span key={amount} onClick={() => handleQuickSat(amount)}>
              {formatSatValue(amount)}
            </span>
          ))}
        </div>

        <div className="tipTweetFormButtonGroup">
          <button
            onClick={handleGoBack}
            className="rounded-full border border-black"
          >
            <ChevronLeft size={24} />
          </button>
          <ZZButton
            className="flex-grow-1 primary filled"
            disabled={!satValue}
            onClick={handleSatSubmit}
          >
            Next
          </ZZButton>
        </div>
      </div>
    </>
  );
}

export default TipSatForm;
