import React, { useState, useRef } from 'react';
import { API_ENDPOINT } from '../../config';
import { useAuth } from '../../lib/contexts/AuthContext'; // if you have an AuthContext
import './settings.scss';
import WalletIcon from '../../assets/wallet.png';
import { updateWalletAddress } from '../../lib/utils/apiHandlers';
import Suggestions from '../../PageComponents/SettingsPage/SuggestionsDropdown';
import EditIcon from '../../components/ui/SvgIcons/EditIcon';
import { toast } from 'react-hot-toast';
import { Info } from 'lucide-react';

import BootstrapIconButton from '../../components/ui/BootstrapIconButton';
import Button from 'react-bootstrap/esm/Button';
// implement the SettingsPage component from https://www.figma.com/design/PzKNr8l3FXJsgvgeZGtWNz/ZapZap?node-id=68-3642&t=N2Pzyoa9tuSmVmun-0

const SettingsPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuth();
  console.log('🚀 ~ SettingsPage ~ user:', user);
  // Pressing Enter in the input to push the address

  const handleEditWalletAddress = (value) => () => {
    setIsEditing(value);
  };

  const handleClose = () => {
    setShowInfo(false);
  };
  //  {name:"shaw", wallet_address:4123}
  //  { name:'shaw',  wallet_address:4123}
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const wallet_address = formData.get('wallet_address');
    updateUser({ ...user, wallet_address });

    toast.promise(
      updateWalletAddress(wallet_address), // This must be a Promise!
      {
        loading: 'Updating wallet address...',
        success: (response) => {
          console.log(response.data);
          setIsEditing(false);
          return 'Wallet updated successfully!';
        },
        error: 'Something went wrong!',
      }
    );
  };

  return (
    <>
      <div className={'settingsPageContainer'}>
        {!user?.wallet_address && (
          <div className="pleaseAddWallet">
            <Info size={16} />
            <span>Please add a wallet address</span>
          </div>
        )}
        <div className="settingsContainer">
          <h1 className={'settingsHeader'}>Settings</h1>
          <div className={'infoBanner'}>
            <div className={'infoText'}>
              Your tips will be instantly paid out to this wallet address.{' '}
              {/* <a href="#" className={'infoLink'}>
                Supported wallets FAQ.
              </a> */}
            </div>
            <button className={'closeButton'} onClick={handleClose}></button>
          </div>

          <form onSubmit={handleSave}>
            <div className={'inputGroup'}>
              <label htmlFor="wallet" className={'inputLabel zz-input-label'}>
                <img
                  alt="wallet"
                  loading="lazy"
                  style={{ height: '24px', width: '24px' }}
                  src={WalletIcon}
                />
                Wallet address
                {!isEditing && user?.wallet_address ? (
                  <BootstrapIconButton
                    onClick={handleEditWalletAddress(true)}
                    className="zz-right-alined-item"
                    variant="outline-secondary"
                  >
                    <EditIcon />
                    Edit
                  </BootstrapIconButton>
                ) : null}
              </label>

              {isEditing || !user?.wallet_address ? (
                <Suggestions />
              ) : (
                <p className="zz-text-wrapper">{user?.wallet_address}</p>
              )}
            </div>
            {isEditing || !user?.wallet_address ? (
              <div className="zz-button-group">
                <button type="submit" className={'saveButton'}>
                  Save
                </button>
                {isEditing ? (
                  <Button
                    onClick={handleEditWalletAddress(false)}
                    variant="outline-secondary"
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
