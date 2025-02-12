// TipSatsForm.jsx
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import CommentBox from './CommentBox';
import { useAuth } from '../../../lib/contexts/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { setSatValue } from '../homePageSlice';

function TipSatForm({ onSubmit, onBack }) {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const { satValue, tweetData } = state;

  const { user } = useAuth();
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

  return (
    <>
      {/* <h3>Enter Amount</h3> */}
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
          <div>sat</div>
        </div>

        <div className="tipQuickSat">
          {[1000, 2000, 4000, 10000].map((amount) => (
            <span key={amount} onClick={() => handleQuickSat(amount)}>
              {formatSatValue(amount)}
            </span>
          ))}
        </div>

        <div className="tipTweetFormButtonGroup">
          {/* <button 
            className="tipSatBackButton black stroke"
            onClick={onBack}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 2L9 16L23 30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button> */}
          <button
            onClick={() => onBack()}
            className="rounded-full border border-black"
          >
            <ChevronLeft size={24} />
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
