import Stripe from 'stripe'
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.STRIPE_SECRET )
const stripe = new Stripe(process.env.STRIPE_SECRET )
const pay = async (req,res) => {
    try {
        const { amount, currency, paymentMethodId, charity, donor } = req.body;
        console.log(req.body)
        // Validation checks
        if (!amount || !currency || !paymentMethodId || !charity || !donor) {
            return res.status(400).json({ error: 'Amount, currency, payment method ID, charity, and donor are required.' });
        }

        // Create a PaymentIntent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
            metadata: {
            payment_method: paymentMethodId,
            donorName: donor,
            charity:charity,
            amount: amount
          }// Default to 'card'
        });

       
        return res.status(200).json({
          clientSecret: paymentIntent.client_secret,
        });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export {pay}