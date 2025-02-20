import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_ENDPOINT } from '../../../config';

function PaymentStatus({ paymentHash, onSuccess }) {
  const [status, setStatus] = useState('Waiting for payment...');
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!paymentHash) return;

    let eventSource;

    const subscribeToEvent = () => {
      eventSource = new EventSource(
        `${API_ENDPOINT}/sse/subscribe?payment_hash=${paymentHash}`
      );

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data)?.status;

        // Handle special "end" message from server
        if (message === 'paid') {
          eventSource.close();
          toast.success('Payment completed!');
          setStatus('Payment completed!');
          setIsPaid(true);
          onSuccess();
          return;
        }

        // Update status with server message
        setStatus(message);
      };

      eventSource.onerror = (err) => {
        console.error('EventSource error:', err);
        toast.error('Something went Wrong');
        eventSource.close();
        setStatus('Connection error - please refresh');
      };
    };

    subscribeToEvent();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isPaid) {
        subscribeToEvent();
      } else if (eventSource) {
        eventSource.close();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [paymentHash, onSuccess, isPaid]);

  return (
    <div>
      <div
        style={{
          padding: '1rem',
          background: isPaid ? '#d4edda' : '#fff3cd',
          border: `1px solid ${isPaid ? '#c3e6cb' : '#ffeeba'}`,
          borderRadius: '4px',
          margin: '1rem',
        }}
      >
        {status}
      </div>

      {isPaid && (
        <div
          style={{
            padding: '1rem',
            background: '#d1ecf1',
            border: '1px solid #bee5eb',
            borderRadius: '4px',
            margin: '1rem',
          }}
        >
          Success! Thank you for your payment.
        </div>
      )}
    </div>
  );
}

export default PaymentStatus;
