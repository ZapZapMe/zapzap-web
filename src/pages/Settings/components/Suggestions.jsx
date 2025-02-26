import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CloseButton from 'react-bootstrap/CloseButton';

import SuggestionsDropdown from './SuggestionsDropdown';
import useClickOutside from '../../../lib/hooks/useClickOutside';
import { domains } from '../../../lib/utils/constants/settings.constants';

const Suggestions = () => {
  const inputRef = useRef(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.wallet_address) {
      setWalletAddress(user?.wallet_address);
    }
  }, [user?.wallet_address]);

  const handleChange = (input) => {
    setWalletAddress(input);
    const shouldShowSuggestions = input.includes('@');
    const atIndex = input.lastIndexOf('@');
    if (shouldShowSuggestions) {
      const query = input.slice(atIndex + 1).toLowerCase();
      const filtered = domains.filter((domain) => domain.startsWith(query));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (domain) => {
    inputRef.current?.focus();
    const atIndex = walletAddress.lastIndexOf('@');
    const newAddress = walletAddress.slice(0, atIndex + 1) + domain;
    setWalletAddress(newAddress);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const toggleShowSuggestions = () => setShowSuggestions((prev) => !prev);
  useClickOutside(null, toggleShowSuggestions, 'suggestions-container');

  return (
    <>
      <InputGroup className="mb-3 position-relative">
        <Form.Control
          id="wallet_address"
          autoComplete="off"
          required
          type="email"
          name="wallet_address"
          value={walletAddress}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="satoshi@example.org"
          className="w-100 bg-transparent border-0 row typography-body text-neutral-0"
        />
        {walletAddress && <CloseButton onClick={() => handleChange('')} />}
        <SuggestionsDropdown
          shouldShow={showSuggestions}
          filteredElements={suggestions}
          onClick={handleSuggestionClick}
          prefIx={walletAddress.slice(0, walletAddress.lastIndexOf('@') + 1)}
        />
      </InputGroup>
    </>
  );
};

export default Suggestions;
