import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Pencil } from 'lucide-react';
import CommentBox from './CommentBox';
import { useAuth } from '../../../lib/contexts/AuthContext';
import PaymentStatus from './PaymentStatus';
import CopyButton from './CopyButton';
import { setStep } from '../homePageSlice';
import toast from 'react-hot-toast';
import ZZButton from '../../../components/ui/ZZButton';

function TipQR() {
  const state = useSelector((state) => state.homePage);
  const { invoiceData, tweetData } = state;
  const dispatch = useDispatch();

  const { user } = useAuth();
  const twitter_username = user?.twitter_username;
  const payment_hash = invoiceData?.payment_hash;
  const invoice = invoiceData?.bolt11_invoice || '';

  const handleOpenWallet = () => {
    if (!invoice) {
      toast.error('No invoice to open wallet');
      return;
    }

    const walletUrl = `lightning:${invoice}`;
    window.open(walletUrl, '_blank');
  };

  const handleMoveForward = useCallback(() => {
    dispatch(setStep(5));
  }, [dispatch]);

  return (
    <div className="tipQR">
      <div className=" w-full flex items-center gap-4 flex-col text-[#333333]">
        <div className="block text-base font-bold leading-8 tracking-wide">
          Send <span className="twitter-handle">{tweetData?.accountTitle}</span>{' '}
          a tip of{' '}
          <span className="inline-flex max-h-6 items-center gap-1 bg-yellow-400 px-2 py-0.5 rounded text-black mx-1">
            {tweetData?.satAmount} sat
            <Pencil className="w-4 h-4" />
          </span>
        </div>
        {tweetData?.comment && twitter_username && (
          <CommentBox
            text={tweetData?.comment.text}
            twitterHandler={twitter_username}
          />
        )}
      </div>

      {/* ============ QR code + copy invoice button ============ */}
      <div className="max-w-[248px] flex flex-col gap-3">
        <QRCodeSVG value={invoice} size={256} className="bg-white p-4" />
        <p>Scan with a Bitcoin Lightning wallet</p>
        <div className="tipQRAddress">
          <CopyButton value={invoice} />
        </div>
      </div>

      <ZZButton
        className="tipQRButton primary filled"
        onClick={handleOpenWallet}
      >
        Open in Wallet
      </ZZButton>

      <PaymentStatus onSuccess={handleMoveForward} paymentHash={payment_hash} />
    </div>
  );
}

export default TipQR;
