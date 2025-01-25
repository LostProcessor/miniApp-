import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm.jsx';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QPmDMEUnqwnJDLoSTm49ho4z8PK95I5hYUWX1jyG9B2YFuA0LK1A2lx3GRHV0LMX0U78eaI9Mx9uRAJ5qOvHXzK00nOjbAwzq');

const PaymentRoute = () =>  {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default PaymentRoute
