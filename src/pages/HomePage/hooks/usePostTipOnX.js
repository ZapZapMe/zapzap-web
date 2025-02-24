import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Phrases, Site } from '../constants';

const phrases = [
  `I just zapped you ${Phrases.AMOUNT} sats`,
  `Sent you some sats! ${Phrases.AMOUNT} sats`,
  `Here's a zap for you! ⚡ ${Phrases.AMOUNT} sats`,
  `Enjoy the sats 🚀 ${Phrases.AMOUNT} sats`,
  `Lightning fast zap of ${Phrases.AMOUNT} sats`,
  `Got some sats for you 🚀 ${Phrases.AMOUNT} sats`,
  `Zapped you ${Phrases.AMOUNT} sats with love ❤️`,
  `Zap zap zap! ${Phrases.AMOUNT} sats`,
  `Incoming ⚡ ${Phrases.AMOUNT} sats`,
  `Zap zap! ${Phrases.AMOUNT} sats`,
  `Sats on the way 🚀 ${Phrases.AMOUNT} sats`,
];

const receivePhrases = [
  ` - check ${Site.ZAPZAP}/${Phrases.RECEIVER} to claim!`,
  `!\nGrab them at ${Site.ZAPZAP}/${Phrases.RECEIVER}.`,
  ` - see ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nClaim your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nGet your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nRedeem at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nCollect your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nYour sats await at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nFind your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nClaim now at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
];

const usePostTipOnX = () => {
  const state = useSelector((state) => state.homePage);
  const { tweetData = null, invoiceData = null, tenorGifObject = null } = state;

  const handlePostTipOnX = useCallback(() => {
    const tweetId = tweetData?.tweetId || '';
    const tweet = tweetData?.comment?.text;
    const accountTitle = tweetData?.accountTitle?.replace('@', '') || '';
    const satAmount = tweetData?.satAmount || 0;

    const comment = tweet ? `⚡ ${tweet} ⚡\n` : '';

    const randomEncouragePhrase = phrases[
      Math.floor(Math.random() * phrases.length)
    ].replace(Phrases.AMOUNT, satAmount);
    const randomReceivePhrase = receivePhrases[
      Math.floor(Math.random() * receivePhrases.length)
    ].replace(Phrases.RECEIVER, accountTitle);

    const targetGroupText = `${!invoiceData.has_wallet_address ? '- via @ZapZapBot!' : randomReceivePhrase}`;

    const gif = tenorGifObject?.tenorUrl || '';

    const tweetText = encodeURIComponent(
      `${comment}${randomEncouragePhrase}${targetGroupText}\n${gif}`
    );

    if (!tweetId) {
      toast.error('Invalid tweet ID');
      return;
    }

    const tweetWindow = window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}&in_reply_to=${tweetId}`,
      '_blank'
    );

    if (tweetWindow) {
      tweetWindow.focus();
    }
  }, [tweetData, invoiceData, tenorGifObject]);

  return handlePostTipOnX;
};

export default usePostTipOnX;
