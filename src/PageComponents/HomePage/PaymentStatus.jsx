import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function PaymentStatus({ paymentHash }) {
  const [status, setStatus] = useState('Waiting for payment...');
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!paymentHash) return;

    const eventSource = new EventSource(`http://localhost:8080/sse/subscribe?payment_hash=${paymentHash}`);

    eventSource.onmessage = (event) => {
      console.log("🚀 ~ useEffect ~ event:", event)
      const message = JSON.parse(event.data).status;
      
      // Handle special "end" message from server
      if (message === 'paid') {
        eventSource.close();
        toast.success("Payment completed!")
        setStatus('Payment completed!');
        setIsPaid(true);
        return;
      }

      // Update status with server message
      setStatus(message);
    };

    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      toast.error("Something went Wrong")
      eventSource.close();
      setStatus('Connection error - please refresh');
    };

    return () => {
      eventSource.close();
    };
  }, [paymentHash]);

  return (
    <div>
      <div style={{ 
        padding: '1rem',
        background: isPaid ? '#d4edda' : '#fff3cd',
        border: `1px solid ${isPaid ? '#c3e6cb' : '#ffeeba'}`,
        borderRadius: '4px',
        margin: '1rem'
      }}>
        {status}
      </div>
      
      {isPaid && (
        <div style={{ 
          padding: '1rem',
          background: '#d1ecf1',
          border: '1px solid #bee5eb',
          borderRadius: '4px',
          margin: '1rem'
        }}>
          Success! Thank you for your payment.
        </div>
      )}
    </div>
  );
}

export default PaymentStatus;