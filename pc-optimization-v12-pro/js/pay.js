// ===== Configure this to your deployed server URL (no trailing slash) =====
const API_BASE = "https://YOUR-SERVER-URL.com"; // e.g. https://speedboost-api.onrender.com

// Map product skus to labels & amounts
const productMap = {
  safe: { price: 12, name: "Safe Optimization" },
  balanced: { price: 18, name: "Balanced Optimization" },
  max: { price: 24, name: "Max Optimization" }
};

function getSelectedOpt() {
  return document.querySelector('input[name="opt"]:checked').value;
}

// ---------- Stripe Checkout flow ----------
document.addEventListener('DOMContentLoaded', () => {
  const stripeBtn = document.getElementById('stripePay');
  if (!stripeBtn) return;

  stripeBtn.addEventListener('click', async () => {
    try {
      const sku = getSelectedOpt();
      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, successUrl: window.location.origin + '/purchase-success.html' })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to create session');
      }
      const { sessionId, publishableKey } = await res.json();
      const stripe = Stripe(publishableKey);
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) alert(error.message || 'Stripe redirect failed.');
    } catch (e) {
      console.error(e);
      alert('Could not start Stripe checkout. See console for details.');
    }
  });
});

// ---------- PayPal Buttons ----------
if (typeof paypal !== 'undefined') {
  paypal.Buttons({
    createOrder: function(data, actions) {
      const sku = getSelectedOpt();
      const details = productMap[sku];
      return actions.order.create({
        purchase_units: [{
          amount: { value: details.price.toFixed(2) },
          description: details.name
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Payment completed by ' + details.payer.name.given_name + '!');
        // TODO: call your server to verify & fulfill order (webhook recommended)
        window.location.href = 'purchase-success.html';
      });
    },
    onError: function(err) {
      console.error(err);
      alert('PayPal payment failed — see console for details.');
    }
  }).render('#paypal-button-container');
}
