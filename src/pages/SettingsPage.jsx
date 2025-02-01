import React, { useState, useRef } from 'react';
import { API_ENDPOINT } from '../config';
import { useAuth } from '../lib/contexts/AuthContext'; // if you have an AuthContext
import "../styles/settings.scss"
import WalletIcon from "../assets/wallet.png"
import { updateWalletAddress } from '../lib/utils/apiHandlers';
import Suggestions from '../PageComponents/SettingsPage/SuggestionsDropdown';
// implement the SettingsPage component from https://www.figma.com/design/PzKNr8l3FXJsgvgeZGtWNz/ZapZap?node-id=68-3642&t=N2Pzyoa9tuSmVmun-0

const SettingsPage = () => {
  const [showInfo, setShowInfo] = useState(false)  

  // Pressing Enter in the input to push the address
  // const handleKeyDown = async (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     setSuggestions([]);
  //     await updateWalletAddress('d');
  //   }
  // };
  // const handleSave = (e) => {
  //   e.preventDefault()
  //   if (!walletAddress) {
  //     setShowError(true)
  //     setShowInfo(true)
  //     return
  //   }
  //   setShowError(false)
  //   setShowInfo(false)
  // }

  const handleClose = () => {
    setShowInfo(false)
  }
  return (
    <div className={'settingsContainer'}>
      <h1 className={'settingsHeader'}>Settings</h1>
        <div className={'infoBanner'}>
          <div className={'infoText'}>
            Your tips will be instantly paid out to this wallet address.{" "}
            <a href="#" className={'infoLink'}>
              Supported wallets FAQ.
            </a>
          </div>
          <button className={'closeButton'} onClick={handleClose}>
          </button>
        </div>


      {/* <form onSubmit={handleSave} className={'settingsForm'}> */}
        <div className={'inputGroup'}>
        <label htmlFor="wallet" className={'inputLabel'}>
              <img alt="wallet" loading='lazy' style={{height:"24px", width:"24px"}} src={WalletIcon}/>
            {/* <div className={'walletIcon'}>
            </div> */}
            Wallet address
          </label>
          {/* -------- suggestions -------- */}
          <Suggestions/>
         

        </div>

        <button type="submit" className={'saveButton'}>
          Save
        </button>
      {/* </form> */}
    
    </div>
  );
};

export default SettingsPage;
