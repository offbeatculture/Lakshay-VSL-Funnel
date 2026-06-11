import { CONFIG } from './config.js';

const LEAD_KEY = 'lakshay_lead_v1';

export function saveLead(lead) {
  const payload = { ...lead, ts: new Date().toISOString() };
  try {
    localStorage.setItem(LEAD_KEY, JSON.stringify(payload));
  } catch (_) {
    /* storage may be disabled — non-fatal */
  }
  // Fire-and-forget POST. We don't block the user's journey on webhook latency.
  // NOTE: sent as text/plain to avoid CORS preflight — Apps Script doPost
  // reads e.postData.contents as a raw string regardless of content type.
  if (CONFIG.leadWebhookUrl) {
    fetch(CONFIG.leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  }
  // Optional: ping Meta Pixel if it's loaded.
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
  return payload;
}

export function getLead() {
  try {
    const raw = localStorage.getItem(LEAD_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function clearLead() {
  try { localStorage.removeItem(LEAD_KEY); } catch (_) {}
}
