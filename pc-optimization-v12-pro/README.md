# SpeedBoost — v12 Pro (Stripe + PayPal)

This bundle contains a static website (GitHub Pages/Netlify) and a small Node/Express API to create Stripe Checkout sessions.

## Deploy the site (GitHub Pages)
1. Extract the ZIP, open the folder `pc-optimization-v12-pro/`.
2. Create a new GitHub repository and upload the **contents of this folder** (so `index.html` is at the root).
3. In your repo, go to **Settings → Pages** → Source: `main`, Folder: `/ (root)` → Save.
4. Your site will go live at `https://<username>.github.io/<repo>/`.

## Deploy the API (Render/Heroku/Railway/Vercel)
1. Open `/server`. Create a new service/app from that folder.
2. Add env vars:
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `STRIPE_PUBLISHABLE_KEY=pk_test_...`
3. Deploy and copy the public base URL (e.g. `https://speedboost-api.onrender.com`).

## Wire them together
- Edit `js/pay.js` and set `API_BASE` to your deployed server URL.
- In `purchase.html`, replace `YOUR_PAYPAL_CLIENT_ID` with your PayPal Client ID (Sandbox for testing, Live for production).

## Test the flow
- Stripe test cards: `4242 4242 4242 4242` any future expiry, any CVC, any ZIP.
- PayPal: use developer sandbox buyer accounts.

## Notes
- No raw card forms are used. You are not storing or handling card numbers.
- Use Stripe webhooks (`checkout.session.completed`) on your server if you want to auto-fulfill orders.
