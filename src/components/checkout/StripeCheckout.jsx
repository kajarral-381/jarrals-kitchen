import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './StripeCheckout.css';

// Load the Stripe publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, onSuccess, onError, metadata }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create a payment intent when the component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'pkr',
            metadata,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
        if (onError) onError(err);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount, metadata, onError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: metadata?.customerName || 'Customer',
          },
        },
      });

      if (error) {
        setError(error.message);
        if (onError) onError(error);
      } else if (paymentIntent.status === 'succeeded') {
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && <div className="card-error">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`pay-button ${loading ? 'loading' : ''}`}
      >
        {loading ? 'Processing...' : `Pay ₨${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount, onSuccess, onError, metadata }) => {
  return (
    <div className="stripe-checkout-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          metadata={metadata}
        />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
