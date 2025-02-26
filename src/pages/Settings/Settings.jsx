import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

import WalletIcon from '../../assets/wallet.png';
import { updateWalletAddress } from '../../lib/utils/apiHandlers';

import Suggestions from './components/Suggestions';
import EditIcon from '../../components/ui/SvgIcons/EditIcon';
import { updateUser } from '../../lib/auth/authSlice';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const nostrLink = 'https://nostr.how/en/guides/setup-zapping-wallet';

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Pressing Enter in the input to push the address
  const handleEditWalletAddress = (value) => () => {
    setIsEditing(value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const wallet_address = formData.get('wallet_address');
    dispatch(updateUser({ ...user, wallet_address }));

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
    <div className="container">
      {!user?.wallet_address && (
        <Row className="justify-content-md-center pt-md-4">
          <Col md={6}>
            <Alert
              variant="warning"
              className="d-flex align-items-center gap-2 border-0"
            >
              <i class="bi bi-info-circle"></i>
              <span>Please add a wallet address</span>
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="justify-content-md-center mt-5 p-2">
        <Col md={6}>
          <Row className="justify-content-md-center">
            <Col>
              <h1 className="typography-display text-neutral-0">Settings</h1>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              <Alert
                variant="info"
                className="d-flex align-items-center gap-2 border-0"
              >
                <span className="typography-body">
                  Here's a list of wallets that{' '}
                  <a
                    href={nostrLink}
                    target="_blank"
                    className="text-decoration-underline hover:text-decoration-none"
                    rel="noreferrer"
                  >
                    support lightning payments.
                  </a>
                </span>
              </Alert>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              <form onSubmit={handleSave}>
                <label
                  htmlFor="wallet"
                  className="d-flex gap-2 align-items-center typography-body text-neutral-30 mb-2"
                >
                  <img
                    alt="wallet"
                    loading="lazy"
                    height={24}
                    width={24}
                    src={WalletIcon}
                  />
                  Wallet address
                  {!isEditing && user?.wallet_address ? (
                    <Button
                      onClick={handleEditWalletAddress(true)}
                      className="ms-auto d-flex align-items-center gap-1 typography-body-small text-neutral-30 text-decoration-none"
                      variant="link"
                      size="sm"
                    >
                      <EditIcon /> Edit
                    </Button>
                  ) : null}
                </label>
              </form>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              {isEditing || !user?.wallet_address ? (
                <Suggestions />
              ) : (
                <p className="py-1.5 typography-body text-neutral-0">
                  {user?.wallet_address}
                </p>
              )}
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              {isEditing || !user?.wallet_address ? (
                <div className="d-flex flex-row gap-2">
                  <Button
                    size="sm"
                    className="primary filled rounded-pill typography-label-12"
                    type="submit"
                  >
                    Save
                  </Button>
                  {isEditing ? (
                    <Button
                      onClick={handleEditWalletAddress(false)}
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-pill typography-label-12"
                    >
                      Cancel
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
