import React, { useState } from 'react';
import { API_ENDPOINT } from '../config';
import { useAuth } from '../contexts/AuthContext'; // if you have an AuthContext

// implement the SettingsPage component from https://www.figma.com/design/PzKNr8l3FXJsgvgeZGtWNz/ZapZap?node-id=68-3642&t=N2Pzyoa9tuSmVmun-0

const SettingsPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { token } = useAuth();

  // roughly ordered by popularity
  const domains = [
    'walletofsatoshi.com',
    'strike.me',
    'bitrefill.me',
    'stacker.news',
    'phoenixwallet.me',
    'getalby.com',
    'ln.tips',
    'coincorner.io',
    'sparkwallet.me',
  ];

  const updateWalletAddress = async (newAddress) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wallet_address: newAddress }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update wallet address. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error('Error updating wallet address:', error);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setWalletAddress(input);

    const atIndex = input.lastIndexOf('@');
    if (atIndex !== -1) {
      const query = input.slice(atIndex + 1).toLowerCase();
      const filtered = domains.filter((domain) => domain.startsWith(query));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (domain) => {
    const atIndex = walletAddress.lastIndexOf('@');
    const newAddress = walletAddress.slice(0, atIndex + 1) + domain;
    setWalletAddress(newAddress);
    setSuggestions([]);
    await updateWalletAddress(newAddress);
  };

  // Pressing Enter in the input to push the address
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSuggestions([]);
      await updateWalletAddress(walletAddress);
    }
  };

  return (
    <div id="SettingsWrapper">
      <label htmlFor="wallet-address">Wallet Address:</label>
      <input
        type="text"
        id="wallet-address"
        name="wallet-address"
        value={walletAddress}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="satoshi@example.org"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((domain, index) => (
            <li key={index} onClick={() => handleSuggestionClick(domain)}>
              {walletAddress.slice(0, walletAddress.lastIndexOf('@') + 1) +
                domain}
            </li>
          ))}
        </ul>
      )}
      <div>
        <p>
          Wallet addresses look like name@phoenixwallet.me or name@strike.me
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
