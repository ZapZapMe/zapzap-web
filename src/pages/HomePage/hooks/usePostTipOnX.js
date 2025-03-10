import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Phrases, Site } from '../constants';
import { API_ENDPOINT } from '../../../config';
import { setTweetData } from '../homePageSlice';

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
  // `!\nClaim your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nGet your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  // `!\nRedeem at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nCollect your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nYour sats await at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  `!\nFind your sats at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
  // `!\nClaim now at ${Site.ZAPZAP}/${Phrases.RECEIVER}!`,
];

const usePostTipOnX = () => {
  const state = useSelector((state) => state.homePage);
  const { tweetData = null, invoiceData = null, tenorGifObject = null } = state;
  const dispatch = useDispatch();
  const [isWaitingForGif, setIsWaitingForGif] = useState(false);

  // Check if we need to wait for a GIF URL
  useEffect(() => {
    // If we have a tenor GIF but no GIF tweet URL, and we're on the success page
    if (
      tenorGifObject?.tenorUrl &&
      !tweetData?.gifTweetUrl &&
      invoiceData?.payment_hash
    ) {
      const paymentHash = invoiceData.payment_hash;
      setIsWaitingForGif(true);

      // Create an EventSource to listen for GIF URL
      const es = new EventSource(
        `${API_ENDPOINT}/sse/subscribe?payment_hash=${paymentHash}`
      );

      es.onmessage = (event) => {
        console.log('Success page SSE message received:', event.data);
        const data = JSON.parse(event.data);

        // Handle "gif_ready" status
        if (data.status === 'gif_ready' && data.tweet_url) {
          console.log(
            'GIF tweet URL received on success page:',
            data.tweet_url
          );

          // Store the tweet URL in Redux
          dispatch(setTweetData({ gifTweetUrl: data.tweet_url }));

          setIsWaitingForGif(false);
          es.close();

          toast.success('GIF processing completed!');
        }
      };

      es.onerror = (err) => {
        console.error('Success page EventSource error:', err);
        // Don't close on error, try to keep the connection open
      };

      // Set a timeout to stop waiting after 30 seconds
      const timeoutId = setTimeout(() => {
        setIsWaitingForGif(false);
        if (es) {
          es.close();
        }
      }, 30000);

      return () => {
        clearTimeout(timeoutId);
        if (es) {
          es.close();
        }
      };
    }

    // Return cleanup function
    return () => {
      // Cleanup function can be empty if no EventSource was created
      // but must return a function to avoid the ESLint error
    };
  }, [
    tenorGifObject?.tenorUrl,
    tweetData?.gifTweetUrl,
    invoiceData?.payment_hash,
    dispatch,
  ]);

  const handlePostTipOnX = useCallback(() => {
    if (!tweetData) {
      toast.error('Tweet data not available');
      return;
    }

    // If we're still waiting for GIF URL, show a toast
    if (isWaitingForGif) {
      toast.loading('Still processing your GIF. Please wait a moment...');
      return;
    }

    const tweetId = tweetData?.tweetId || '';
    const tweet = tweetData?.comment?.text;
    const accountTitle = tweetData?.accountTitle?.replace('@', '') || '';
    const satAmount = tweetData?.satAmount || 0;
    const gifTweetUrl = tweetData?.gifTweetUrl || '';

    const comment = tweet ? `⚡ ${tweet} ⚡\n` : '';

    const randomEncouragePhrase = phrases[
      Math.floor(Math.random() * phrases.length)
    ].replace(Phrases.AMOUNT, satAmount);

    const randomReceivePhrase = receivePhrases[
      Math.floor(Math.random() * receivePhrases.length)
    ].replace(Phrases.RECEIVER, accountTitle);

    const targetGroupText = `${!invoiceData?.has_wallet_address ? '- via @ZapZapBot!' : randomReceivePhrase}`;

    // Only include Tenor GIF URL if we don't have a GIF tweet URL
    const includeGifUrl = !gifTweetUrl && tenorGifObject?.tenorUrl;
    const gif = includeGifUrl ? tenorGifObject?.tenorUrl : '';

    // Include the GIF tweet URL if available
    const gifMessage = gifTweetUrl
      ? `\n\nCheck out the GIF I sent: ${gifTweetUrl}`
      : '';

    const tweetText = encodeURIComponent(
      `${comment}${randomEncouragePhrase}${targetGroupText}${gifMessage}${gif ? '\n' + gif : ''}`
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
  }, [tweetData, invoiceData, tenorGifObject, isWaitingForGif]);

  return handlePostTipOnX;
};

export default usePostTipOnX;
