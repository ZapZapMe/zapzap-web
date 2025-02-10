import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Pencil } from 'lucide-react';
import CommentBox from './CommentBox';
import { useAuth } from '../../lib/contexts/AuthContext';
import PaymentStatus from './PaymentStatus';

function TipQR({ tweetData, invoiceData, onSuccess }) {
  const { user } = useAuth();
  const twitter_username = user?.twitter_username;
  const payment_hash = invoiceData?.payment_hash;
  const invoice =
    invoiceData?.bolt11_invoice ??
    'lnbc5140n1pncj87ldqgf389v5zwnp4qtyjfy99jhnpj8u9en49meskq8x08czk5axrh4cju64fvpcfenrfupp58ava342wms8mr2dw6f9ewwcnwppvvfuvh2uaq3j6ll8hj5l72g0qsp5wzfumejdcll86dtn9tvznhkkeaqt7yfnqut0kd7h5x70acl8gsms9qyysgqcqpcxqyz5vq434vvr5nxyyvumg0ee6469mq0ly3ldjvp72k20rd4q08s25zs233gg34u7gjtuzssypteezmvr0px2hg5ej6n8x60sq63ylyvsf267qqaph8vk';
  console.log('🚀 ~ TipQR ~ invoice:', invoice);
  // 'lnbc5140n1pncj87ldqgf389v5zwnp4qtyjfy99jhnpj8u9en49meskq8x08czk5axrh4cju64fvpcfenrfupp58ava342wms8mr2dw6f9ewwcnwppvvfuvh2uaq3j6ll8hj5l72g0qsp5wzfumejdcll86dtn9tvznhkkeaqt7yfnqut0kd7h5x70acl8gsms9qyysgqcqpcxqyz5vq434vvr5nxyyvumg0ee6469mq0ly3ldjvp72k20rd4q08s25zs233gg34u7gjtuzssypteezmvr0px2hg5ej6n8x60sq63ylyvsf267qqaph8vk';

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(invoice).then(() => {
  //     console.log('Copied to clipboard!');
  //   });
  // };

  // ('lighting:lnbc12313123123');
  const handleOpenWallet = () => {
    // link or scheme to open wallet
    console.log('Opening wallet...');
  };

  return (
    <div className="tipQR">
      <div className=" w-full flex items-center gap-4 flex-col text-[#333333]">
        <div className="block text-base font-bold leading-8 tracking-wide">
          Send <span className="twitter-handle">{tweetData.accountTitle}</span>{' '}
          a tip of{' '}
          <span className="inline-flex max-h-6 items-center gap-1 bg-yellow-400 px-2 py-0.5 rounded text-black mx-1">
            {tweetData.satAmount} sat
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

      <button className="tipQRButton primary filled" onClick={handleOpenWallet}>
        Open in Wallet
      </button>

      <PaymentStatus onSuccess={onSuccess} paymentHash={payment_hash} />
    </div>
  );
}

export default TipQR;

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        {copied ? 'Copied' : 'Copy'}
      </button>
    </>
  );
}
