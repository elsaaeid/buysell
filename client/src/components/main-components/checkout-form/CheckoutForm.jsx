import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { completeCheckout } from '../redux/actions/cartActions';

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      dispatch(completeCheckout(paymentMethod.id));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;