import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GifPicker from 'gif-picker-react';

import { ChevronLeft, CircleX } from 'lucide-react';

import { TENOR_API_KEY } from '../../../config';
import {
  setComment,
  setIsNextDisabled,
  // setIsChecked,
  setStep,
  setTweetData,
  setTenorContainerVisible,
  setTenorGifObject,
} from '../homePageSlice';
import ZZButton from '../../../components/ui/ZZButton';

const TipCommentForm = () => {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const {
    isNextDisabled,
    isChecked,
    tweetData,
    comment,
    isTenorContainerVisible,
    tenorGifObject,
  } = state;

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

  const handleTenorContainerVisibility = () => {
    dispatch(setTenorContainerVisible(!isTenorContainerVisible));
  };

  // in case of undefined param, remove the gif and don't trigger the visibility
  const handleGifClick = (gif) => {
    dispatch(setTenorGifObject(gif));
    if (gif) return handleTenorContainerVisibility();
  };

  return (
    <div className="tip-comment-form">
      <span className="tip-comment-form__header">
        Send a tip message to{' '}
        <span className="twitter-handle">{tweetData?.accountTitle || ''}</span>
      </span>

      <div className="w-100 d-flex flex-column gap-2">
        {!isTenorContainerVisible ? (
          // Only show the text area and related elements when GIF picker is not visible
          <div className="flex form-control flex-col gap-2 p-3">
            <textarea
              rows="3"
              disabled={!token} // if no user, dont allow them to input
              onChange={handleChange}
              value={comment}
              placeholder={
                !token
                  ? 'Log in with X to send a custom message'
                  : `Tell ${tweetData?.accountTitle} something nice`
              }
              className="resize-none w-full outline-none border-none"
            />
            {tenorGifObject ? (
              <div className="relative">
                <img
                  className="rounded-2xl"
                  width={500}
                  height={500}
                  src={tenorGifObject?.url}
                  alt={tenorGifObject?.description}
                />
                <CircleX
                  onClick={() => handleGifClick(undefined)}
                  stroke="white"
                  fill="black"
                  className="absolute border-none top-4 right-4 cursor-pointer"
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="d-flex justify-content-end">
          <span
            onClick={handleTenorContainerVisibility}
            className="badge text-bg-dark text-end cursor-pointer"
          >
            {isTenorContainerVisible ? <i className="bi bi-x"></i> : 'GIF'}
          </span>
        </div>

        {isTenorContainerVisible ? (
          <div className="w-100">
            <GifPicker
              width="100%"
              tenorApiKey={TENOR_API_KEY}
              onGifClick={handleGifClick}
            />
          </div>
        ) : null}
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
