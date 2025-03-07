import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Info } from 'lucide-react';

import WalletIcon from '../../assets/wallet.png';
// import { updateWalletAddress } from '../../lib/utils/apiHandlers';

import Suggestions from './components/SuggestionsDropdown';
import EditIcon from '../../components/ui/SvgIcons/EditIcon';
import ZZButton from '../../components/ui/ZZButton';
import { updateUser } from '../../lib/auth/authSlice';
import {
  setIsEditing,
  updateWalletAddress,
  resetSettingsState,
} from './settingsSlice';

import './styles.scss';

const nostrLink = 'https://nostr.how/en/guides/setup-zapping-wallet';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const { isEditing, isLoading, error, success } = useSelector(
    (state) => state.settings
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      toast.loading('Updating wallet address...');
    } else {
      if (error) {
        toast.error('Something went wrong!');
      }
      if (success) {
        toast.success('Wallet updated successfully!');
      }
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  }, [isLoading, error, success]);

  useEffect(() => {
    return () => {
      dispatch(resetSettingsState());
    };
  }, [dispatch]);

  // Pressing Enter in the input to push the address
  const handleEditWalletAddress = (value) => () => {
    dispatch(setIsEditing(value));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const wallet_address = formData.get('wallet_address');
    dispatch(updateUser({ ...user, wallet_address }));

    dispatch(updateWalletAddress(wallet_address));
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

export default Settings;
