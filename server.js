import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
// Using the provided Secret Key
const stripe = new Stripe('sk_test_51SWN4x2MF48BNtSNPaL1nIHhGItjobWfZt7o3rQx7j2oy0ngmDYSAS5IeWL0JmSMBx9FJKUriAGCJ41vbH8zQz2g00KxKBiDkK');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
