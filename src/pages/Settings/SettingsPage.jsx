import React, { useState } from 'react';
import { useAuth } from '../../lib/contexts/AuthContext'; // if you have an AuthContext
import './settings.scss';
import WalletIcon from '../../assets/wallet.png';
import { updateWalletAddress } from '../../lib/utils/apiHandlers';
import Suggestions from '../../PageComponents/SettingsPage/SuggestionsDropdown';
import EditIcon from '../../components/ui/SvgIcons/EditIcon';
import { toast } from 'react-hot-toast';
import { Info } from 'lucide-react';

import ZZButton from '../../components/ui/ZZButton';
// implement the SettingsPage component from https://www.figma.com/design/PzKNr8l3FXJsgvgeZGtWNz/ZapZap?node-id=68-3642&t=N2Pzyoa9tuSmVmun-0

const nostrLink = 'https://nostr.how/en/guides/setup-zapping-wallet';

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuth();
  // Pressing Enter in the input to push the address

  const handleEditWalletAddress = (value) => () => {
    setIsEditing(value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const wallet_address = formData.get('wallet_address');
    updateUser({ ...user, wallet_address });

    toast.promise(
      updateWalletAddress(wallet_address), // This must be a Promise!
      {
        loading: 'Updating wallet address...',
        success: () => {
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
              <p>
                Here's a list of wallets that{' '}
                <a
                  href={nostrLink}
                  target="_blank"
                  className={'infoLink'}
                  rel="noreferrer"
                >
                  support lightning payments.
                </a>
              </p>
              <p>Your tips will be instantly paid out to the wallet address.</p>
            </div>
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
                  <ZZButton
                    onClick={handleEditWalletAddress(true)}
                    className="zz-right-alined-item"
                    variant="outline-secondary"
                    size="sm"
                  >
                    <EditIcon />
                    Edit
                  </ZZButton>
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
                <ZZButton size="sm" className="primary filled" type="submit">
                  Save
                </ZZButton>
                {isEditing ? (
                  <ZZButton
                    onClick={handleEditWalletAddress(false)}
                    variant="outline-secondary"
                    size="sm"
                  >
                    Cancel
                  </ZZButton>
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
