import useClickOutside from '../../../lib/hooks/useClickOutside';
import { domains } from '../../../lib/utils/constants/settings.constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWalletAddress,
  setSuggestions,
  setShowSuggestions,
} from '../settingsSlice';

const Suggestions = () => {
  const inputRef = useRef(null);
  const { walletAddress, suggestions, showSuggestions } = useSelector(
    (state) => state.settings
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.wallet_address) {
      dispatch(setWalletAddress(user?.wallet_address));
    }
  }, [dispatch, user?.wallet_address]);

  const handleChange = (input) => {
    dispatch(setWalletAddress(input));
    const shouldShowSuggestions = input.includes('@');
    const atIndex = input.lastIndexOf('@');
    if (shouldShowSuggestions) {
      const query = input.slice(atIndex + 1).toLowerCase();
      const filtered = domains.filter((domain) => domain.startsWith(query));
      dispatch(setSuggestions(filtered));
      dispatch(setShowSuggestions(true));
    } else {
      dispatch(setSuggestions([]));
      dispatch(setShowSuggestions(false));
    }
  };

  const handleSuggestionClick = async (domain) => {
    // const baseAddress = walletAddress.split('@')[0];
    inputRef.current?.focus();
    const atIndex = walletAddress.lastIndexOf('@');
    const newAddress = walletAddress.slice(0, atIndex + 1) + domain;
    dispatch(setWalletAddress(newAddress));
    dispatch(setSuggestions([]));
    dispatch(setShowSuggestions(false));
  };

  const toggleShowSuggestions = () =>
    dispatch(setShowSuggestions(!showSuggestions));
  useClickOutside(null, toggleShowSuggestions, 'suggestions-container');

  return (
    <div className={'inputWrapper'} ref={inputRef}>
      {/* -------- input for wallet address -------------- */}
      <input
        id="wallet_address"
        autoComplete="off"
        required
        type="email"
        name="wallet_address"
        value={walletAddress}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="satoshi@example.org"
        className={'walletInput w-full'}
      />
      {/* {showError && <ErrorMessage />} */}

      {/* ========= CLOSE BUTTON ========= */}
      {walletAddress && (
        <button
          type="button"
          className={'clearButton'}
          onClick={() => dispatch(setWalletAddress(''))}
        >
          ×
        </button>
      )}

      {/* ========= Suggestions Dropdown ========= */}
      <SuggestionsDropdown
        shouldShow={showSuggestions}
        filteredElements={suggestions}
        onClick={handleSuggestionClick}
        prefIx={walletAddress.slice(0, walletAddress.lastIndexOf('@') + 1)}
      />
    </div>
  );
};

// const ErrorMessage = () => {
//   return (
//     <div className={'warningMessage'}>
//       <span className={'warningIcon'}>⚠</span>
//       Please add a wallet address
//     </div>
//   );
// };

// interface ISuggestionsDropdown {
//   shouldShow: boolean;
//   filteredElements: any[];
//   onClick: (param: string) => void;
//   prefIx: string;
// }
const SuggestionsDropdown = ({
  shouldShow,
  filteredElements,
  onClick,
  prefIx,
}) => {
  const [currIdx, setCurrIdx] = useState(0);

  const upHandler = useCallback(() => {
    if (currIdx === 0) return;
    const selectedIdx =
      (currIdx + filteredElements.length - 1) % filteredElements.length;
    setCurrIdx(selectedIdx);
    document.getElementById(`command-${selectedIdx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currIdx, filteredElements.length]);

  const downHandler = useCallback(() => {
    if (currIdx === filteredElements.length - 1) return;
    const selectedIdx = (currIdx + 1) % filteredElements.length;
    setCurrIdx(selectedIdx);
    document.getElementById(`command-${selectedIdx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currIdx, filteredElements.length]);

  const enterHandler = useCallback(() => {
    if (filteredElements.length === 0) return;
    onClick(filteredElements[currIdx]);
  }, [currIdx, filteredElements, onClick]);

  const handleKeydown = useCallback(
    (event) => {
      if (event.key === 'ArrowUp') {
        return upHandler();
      }

      if (event.key === 'ArrowDown') {
        return downHandler();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        enterHandler();
        return;
      }
    },
    [downHandler, enterHandler, upHandler]
  );

  useEffect(() => {
    setCurrIdx(0);
  }, [filteredElements]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);
  return (
    shouldShow && (
      <div id="suggestions-container" className={'suggestions'}>
        <div className={'suggestionsHeader'}>Suggestions</div>
        {filteredElements.map((suggestion, index) => (
          <button
            onMouseEnter={() => setCurrIdx(index)}
            key={suggestion}
            className={`suggestionItem ${index === currIdx ? 'activeItem' : ''}`}
            onClick={() => onClick(suggestion)}
            type="button"
          >
            {prefIx + suggestion}
          </button>
        ))}
        {filteredElements.length === 0 && (
          <span className="text-xs text-gray-400 p-2">No data to show.</span>
        )}
      </div>
    )
  );
};

export default Suggestions;
