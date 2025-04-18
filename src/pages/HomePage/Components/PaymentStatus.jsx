import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { API_ENDPOINT } from '../../../config';
import {
  fetchTip,
  setPaymentStatus,
  setIsPaid,
  setTweetData,
  setProcessingGif,
} from '../homePageSlice';

function PaymentStatus({ paymentHash, onSuccess }) {
  const state = useSelector((state) => state.homePage);
  const {
    tipData,
    invoiceData,
    paymentStatus,
    isPaid,
    tenorGifObject,
    processingGif,
  } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!paymentHash) return;

    if (tipData?.paid_in && !tenorGifObject?.tenorUrl) {
      dispatch(setIsPaid(true));
      dispatch(setPaymentStatus('Payment completed!'));
      onSuccess();
      return;
    }

    // If we have a paid tip with gif and already have the gif, proceed to success
    if (
      tipData?.paid_in &&
      tenorGifObject?.tenorUrl &&
      state.tweetData?.gifTweetUrl
    ) {
      dispatch(setIsPaid(true));
      dispatch(setPaymentStatus('Payment completed!'));
      onSuccess();
      return;
    }

    // If we have a paid tip with gif but don't have the gif yet, show processing state
    if (
      tipData?.paid_in &&
      tenorGifObject?.tenorUrl &&
      !state.tweetData?.gifTweetUrl
    ) {
      dispatch(setIsPaid(true));
      dispatch(setProcessingGif(true));
      dispatch(setPaymentStatus('Processing the payment... Please wait!'));
      // continue with SSE connection to wait for gif url
    }

    let eventSource;
    let timeoutId;

    const subscribeToEvent = () => {
      if (eventSource) {
        eventSource.close();
      }

      eventSource = new EventSource(
        `${API_ENDPOINT}/sse/subscribe?payment_hash=${paymentHash}`
      );
      console.log(`SSE connection established for ${paymentHash}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Handle paid status - payment received but GIF not yet posted
        if (data.status === 'paid') {
          dispatch(setPaymentStatus('Payment completed!'));
          dispatch(setIsPaid(true));

          // If we have a gif to post, show processing state
          if (tenorGifObject?.tenorUrl) {
            dispatch(setProcessingGif(true));
            dispatch(
              setPaymentStatus('Processing the payment... Please wait!')
            );

            // set a timeout in case gif posting takes too long
            if (!timeoutId) {
              timeoutId = setTimeout(() => {
                dispatch(
                  setPaymentStatus(
                    'Payment completed! GIF processing timed out.'
                  )
                );
                eventSource.close();
                onSuccess();
              }, 30000); // timeout
            }
          } else {
            // no gif to post, proceed to success
            eventSource.close();
            onSuccess();
          }
        }

        // handle gif_ready status
        if (data.status === 'gif_ready' && data.tweet_url) {
          dispatch(setProcessingGif(false));

          // clear any timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }

          // store the tweet URL in redux for Tweet it! button
          dispatch(setTweetData({ gifTweetUrl: data.tweet_url }));

          // Update status and proceed to success screen
          dispatch(setPaymentStatus('Payment and GIF posting completed!'));
          toast.success('GIF posted successfully!');

          // close the connection and proceed to success
          eventSource.close();
          onSuccess();
        }
      };

      eventSource.onerror = (err) => {
        console.error('EventSource error:', err);

        // only show error if we are not already paid
        if (!isPaid) {
          toast.error('Connection error occurred');
          dispatch(setPaymentStatus('Connection error - please refresh'));
        }

        eventSource.close();

        // If we're processing a gif and encounter an error, retry the connection
        if (processingGif || !isPaid) {
          setTimeout(subscribeToEvent, 1000);
        }

        // dispatch(setPaymentStatus('Connection error - please refresh'));
      };
    };

    subscribeToEvent();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const needsReconnect =
          !eventSource || eventSource.readyState === EventSource.CLOSED;

        if (needsReconnect) {
          console.log('Reconnecting to SSE...');

          if (processingGif || !isPaid) {
            if (invoiceData?.tip_id) {
              dispatch(fetchTip(invoiceData.tip_id));
            }

            subscribeToEvent();
          }
        } else {
          console.log('SSE connection is still active.');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [
    paymentHash,
    onSuccess,
    isPaid,
    processingGif,
    dispatch,
    tipData?.paid_in,
    invoiceData?.tip_id,
    tenorGifObject?.tenorUrl,
    state.tweetData?.gifTweetUrl,
  ]);

  return (
    <div>
      <div
        style={{
          padding: '1rem',
          background: isPaid ? '#d4edda' : '#fff3cd',
          border: `1px solid ${isPaid ? '#c3e6cb' : '#ffeeba'}`,
          borderRadius: '4px',
          margin: '1rem',
          textAlign: 'center',
        }}
      >
        {processingGif ? (
          <div style={{ marginTop: '0.5rem' }}>
            <div
              className="spinner"
              style={{
                width: '20px',
                height: '20px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
                display: 'inline-block',
                marginRight: '10px',
                verticalAlign: 'middle',
              }}
            />
            <style jsx>{`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
            <span style={{ verticalAlign: 'middle' }}>
              This may take up to 30 seconds...
            </span>
          </div>
        ) : null}
        {paymentStatus}
      </div>

      {isPaid && !processingGif ? (
        <div
          style={{
            padding: '1rem',
            background: '#d1ecf1',
            border: '1px solid #bee5eb',
            borderRadius: '4px',
            margin: '1rem',
            textAlign: 'center',
          }}
        >
          Success! Thank you for your payment.
        </div>
      ) : null}
    </div>
  );
}

export default PaymentStatus;
