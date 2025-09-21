
# SpeedBoost v12 Pro — API (Stripe Checkout)
Minimal Node/Express server that creates Stripe Checkout sessions.

## Quick start (local)
1) Install deps
   ```bash
   cd server
   npm install
   ```
2) Copy `.env.example` to `.env` and paste your Stripe test keys:
   ```bash
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   PORT=4242
   ```
3) Run:
   ```bash
   npm start
   ```

## Deploy (Render / Railway / Heroku / Vercel)
- Create a new service from this `server/` folder.
- Add environment variables `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`.
- Note the deployed **base URL** (e.g., https://your-api.onrender.com).

## Frontend configuration
- Edit `js/pay.js` in the web root and set `API_BASE` to the deployed base URL.
- In `purchase.html`, replace `YOUR_PAYPAL_CLIENT_ID` in the PayPal SDK script tag.
