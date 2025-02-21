import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft } from 'lucide-react';

import {
  setComment,
  setIsNextDisabled,
  // setIsChecked,
  setStep,
  setTweetData,
} from '../homePageSlice';
import ZZButton from '../../../components/ui/ZZButton';

const TipCommentForm = () => {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const { isNextDisabled, isChecked, tweetData, comment } = state;

  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const inputVal = e.target.value;
    dispatch(setComment(inputVal));
    dispatch(setIsNextDisabled(inputVal.length === 0 ? true : false));
  };

  // const handleToggle = () => {
  //   dispatch(setIsChecked(!isChecked));
  // };

  const handleSubmit =
    (shouldSkip = false) =>
    () => {
      dispatch(setStep(3));
      if (!shouldSkip) {
        dispatch(
          setTweetData({ comment: { text: comment, postOnX: isChecked } })
        );
      }
    };

  const handleGoBack = () => {
    dispatch(setStep(1));
  };

  return (
    <div className="tip-comment-form">
      <span className="tip-comment-form__header">
        Send a tip message to{' '}
        <span className="twitter-handle">{tweetData?.accountTitle || ''}</span>
      </span>

      {/* --------- input --------- */}
      <div className="input_container">
        <input
          disabled={!token} // if no user, dont allow them to input
          onChange={handleChange}
          value={comment}
          placeholder={
            !token
              ? 'Log in with X to send a custom message'
              : 'Write your tip message here'
          }
          className="tip-comment-form__input"
        />
        {/* {!isNextDisabled ? (
          <div className="flex items-center self-start gap-2">
            <button
              onClick={handleToggle}
              aria-checked={isChecked}
              role="checkbox"
            >
              {isChecked && (
                <svg
                  className="absolute inset-0 w-7 h-7 m-auto text-yellow-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className="text-sm text-gray-700">Post tip on X</span>
          </div>
        ) : null} */}
      </div>
      <div className="tip-comment-form__footer">
        <button onClick={handleGoBack} className="back-button">
          <ChevronLeft />
        </button>
        <ZZButton
          onClick={handleSubmit()}
          disabled={isNextDisabled}
          className="flex-grow-1 primary filled"
        >
          Next
        </ZZButton>
        <button onClick={handleSubmit(true)} className="skip-button">
          Skip
        </button>
      </div>
    </div>
  );
};

export default TipCommentForm;
