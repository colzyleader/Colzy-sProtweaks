// server/server.js
// Minimal Express server to create Stripe Checkout sessions
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const skuMap = {
  safe: { unit_amount: 1200, currency: 'usd', name: 'Safe Optimization' },
  balanced: { unit_amount: 1800, currency: 'usd', name: 'Balanced Optimization' },
  max: { unit_amount: 2400, currency: 'usd', name: 'Max Optimization' }
};

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { sku, successUrl } = req.body;
    const item = skuMap[sku] || skuMap.safe;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: item.currency,
          product_data: { name: item.name },
          unit_amount: item.unit_amount
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: successUrl || 'https://example.com/purchase-success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: successUrl ? successUrl.replace('purchase-success.html', 'purchase.html?canceled=1') : 'https://example.com/purchase.html?canceled=1'
    });

    res.json({ sessionId: session.id, publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

app.get('/', (req, res) => res.send('SpeedBoost v12 Pro API ✓'));
const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`API listening on ${port}`));
