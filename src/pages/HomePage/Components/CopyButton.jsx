import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCopied } from '../homePageSlice';

const CopyButton = ({ value }) => {
  const state = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    dispatch(setCopied(true));
    setTimeout(() => dispatch(setCopied(false)), 2000);
  };

  return (
    <>
      <div className="flex-1 truncate px-4 py-2 text-sm text-gray-500">
        {value}
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 px-4 py-2 text-ellipsis text-sm font-medium text-white bg-black rounded-r-md hover:bg-gray-800"
      >
        {state.copied ? 'Copied' : 'Copy'}
      </button>
    </>
  );
};

export default CopyButton;
