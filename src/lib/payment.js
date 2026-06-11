import { CONFIG } from './config.js';

let checkoutScriptPromise = null;
function loadCheckoutScript() {
  if (checkoutScriptPromise) return checkoutScriptPromise;
  checkoutScriptPromise = new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => reject(new Error('Failed to load Razorpay'));
    document.head.appendChild(s);
  });
  return checkoutScriptPromise;
}

// Starts the payment flow. Calls onSuccess() if the user pays successfully
// (only fires in 'checkout' mode — 'link' mode hands off to Razorpay's page
// and depends on the dashboard-configured callback URL to bring the user back).
export async function startPayment({ lead, onSuccess, onDismiss }) {
  const r = CONFIG.razorpay || {};

  if (r.mode === 'link') {
    if (!r.linkUrl || r.linkUrl.includes('YOUR-LINK-CODE')) {
      alert('Razorpay payment link is not configured yet. Set CONFIG.razorpay.linkUrl in src/lib/config.js.');
      return;
    }
    // Append prefill params Razorpay payment links understand.
    let url = r.linkUrl;
    try {
      const u = new URL(r.linkUrl);
      if (lead?.name) u.searchParams.set('prefill[name]', lead.name);
      if (lead?.phone) u.searchParams.set('prefill[contact]', lead.phone);
      url = u.toString();
    } catch (_) {}
    window.location.href = url;
    return;
  }

  // Inline checkout modal
  if (!r.keyId) {
    alert('Razorpay key is not configured. Set CONFIG.razorpay.keyId in src/lib/config.js.');
    return;
  }
  try {
    await loadCheckoutScript();
  } catch (e) {
    alert('Could not load Razorpay. Check your internet connection and try again.');
    return;
  }
  const rzp = new window.Razorpay({
    key: r.keyId,
    amount: r.amountPaise,
    currency: r.currency || 'INR',
    name: 'Lakshay Aggarwal — Consultation',
    description: r.description || 'Consultation booking',
    prefill: {
      name: lead?.name || '',
      contact: lead?.phone || ''
    },
    notes: {
      city: lead?.city || '',
      stage: lead?.stage || ''
    },
    theme: { color: '#F26B1F' },
    handler: function (response) {
      try {
        localStorage.setItem('lakshay_payment_id', response.razorpay_payment_id || '');
      } catch (_) {}
      onSuccess && onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        onDismiss && onDismiss();
      }
    }
  });
  rzp.open();
}
