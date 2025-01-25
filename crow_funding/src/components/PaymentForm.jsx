import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios'
import {useSelector} from 'react-redux'
function DonationForm(){
  const navigate= useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const charityName = useSelector((data)=>data.campaign.name)
  const donor = useSelector((data)=> data.user.name)
  // Adjust the donation amount as needed (in cents, e.g., $50 = 5000 cents)
  const [donation,setDonation] = useState(20)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet.
    }

    const cardElement = elements.getElement(CardElement);

    setLoading(true);  // Show loading indicator

    try {
      // Create a payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentMethodError) {
        setError(paymentMethodError.messsage);
        setLoading(false);
        return;
      }

      // Send the payment method ID and donation amount to your server
      const response = await axios.post('http://localhost:8080/create_payment_intent/donate', {
          paymentMethodId: paymentMethod.id,
          amount: donation * 100, // Pass the donation amount to the server
          currency:'USD',
          charity:charityName,
          donor:donor,
      }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      

      const secret = response.data.clientSecret
      if (!secret) {
        setError('secret was not provided');
        setLoading(false);
      } else {
        // Confirm the payment using the clientSecret from the backend
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(secret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
          setSuccess(true); // Donation successful
        }

        setLoading(false);
      }
    } catch (error) {
      setError('Payment failed: ' + error.message);
      setLoading(false);
    }
  };
  useEffect(()=>{
      
      console.log('sheers')
      if (success){
          setTimeout(() => {
            navigate('/Home');
          }, 1000); 
      }
    
  },[success])

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Donate'}
      </button>
      <input onChange={(e)=>setDonation(e.target.value)} value={donation}/>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Donation Successful! Thank you!</div>}
    </form>
  );
}

export default DonationForm;
