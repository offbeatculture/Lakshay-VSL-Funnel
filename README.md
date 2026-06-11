# Lakshay Aggarwal — VSL Funnel

A 4-step VSL funnel built in **React 18 + Vite + Tailwind CSS**.

```
[ Ad ] → /          (Opt-in page — captures lead)
       → /vsl        (VSL video; CTA reveals after a delay)
       → /schedule   (Embedded booking calendar)
       → /thank-you  (Confirmation + prep steps)
```

Lightweight (~70 KB gzipped JS), mobile-first, English copy tuned with
Russell Brunson&rsquo;s *Copywriting Secrets* principles, and 100% static —
drop the `dist/` folder onto Hostinger and you&rsquo;re live.

---

## 1. Install & run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## 2. Configure before launch

Open **`src/lib/config.js`** — every funnel-level setting lives here:

| Field | What to set it to |
|---|---|
| `calendlyUrl` | Your Calendly / Cal.com / SavvyCal booking link |
| `leadWebhookUrl` | Google Sheets Apps Script / Zapier / Make / CRM endpoint (POST JSON). Leave empty if you only want localStorage. |
| `video.type` + `video.src` | `vimeo` (recommended) or `mp4` (self-hosted) + the embed URL |
| `ctaRevealSeconds` | Seconds before the “Book My Call” CTA appears on the VSL page. Use `5` for testing, `180` (3 min) for production. |
| `slotsTotal` / `slotsTaken` | Powers the scarcity line (“Only X slots left”) |
| `testimonials` | Real client quotes once Lakshay shares them |

Open **`index.html`** to:
- Replace `PIXEL_ID` in the commented-out Meta Pixel snippet and uncomment it.
- Replace `og-image.jpg` with a real OG image (1200×630).

Open **`src/lib/lang.jsx`** to tweak the English copy. All strings live in one file.

### Hero image

The opt-in page hero loads from **`/public/hero.jpg`**. If that file isn&rsquo;t present it auto-falls-back to a free Unsplash construction-site photo. Drop in a real on-site shot of Lakshay (1600×1000, 16:10) when ready — no code changes needed.

## 3. Build

```bash
npm run build
```

This outputs a static site to **`dist/`**.

## 4. Deploy to Hostinger

1. Log into Hostinger → File Manager → `public_html/`.
2. Delete the default `index.html` if present.
3. Upload **everything inside `dist/`** (not the folder itself) into `public_html/`.
4. Visit your domain — done.

### Why HashRouter?

The app uses `HashRouter`, so URLs look like `yourdomain.com/#/vsl`. This avoids
needing `.htaccess` rewrite rules on shared hosting (a frequent Hostinger pain
point). Set Calendly’s redirect to `https://yourdomain.com/#/thank-you` and the
funnel still works.

### Custom domain HTTPS

Hostinger auto-issues SSL after DNS resolves — usually within 15 minutes. The
Meta Pixel will only fire on HTTPS.

## 5. Google Sheets lead capture (your sheet)

Your sheet: <https://docs.google.com/spreadsheets/d/1wKEAoWL_isNkb_4tQzy0h0yeX9gVaRYvSqheZFLVrVM/edit>

Setup (one-time, ~2 minutes):

1. Open the sheet → make sure the first row has these headers (left to right):
   `Timestamp | Name | Phone | City | Stage | Problem | Source`
2. **Extensions → Apps Script**. Delete the boilerplate `function myFunction()` and paste:
   ```js
   const SHEET_ID = '1wKEAoWL_isNkb_4tQzy0h0yeX9gVaRYvSqheZFLVrVM';

   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents);
       const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
       sheet.appendRow([
         data.ts || new Date().toISOString(),
         data.name || '',
         data.phone || '',
         data.city || '',
         data.stage || '',
         data.problem || '',
         data.source || ''
       ]);
       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
3. Save → click **Deploy → New deployment** → gear icon → **Web app**.
4. Set: *Execute as*: **Me**, *Who has access*: **Anyone**. Click **Deploy**.
5. Authorize when prompted. Copy the **Web app URL** that ends in `/exec`.
6. Paste it into `src/lib/config.js` as `leadWebhookUrl` and rebuild.

That's it — every form submission lands as a new row in your sheet within 1 second.

> Note on CORS: Google Apps Script Web Apps return CORS-friendly responses for `Anyone`-access deployments. The funnel sends the POST with `keepalive: true` so the user's journey is never blocked on the network.

## 6. Razorpay Rs.1,000 payment (before Calendly)

Flow: **VSL CTA → Razorpay (Rs.1,000) → Calendly → Thank You.**

### Easiest setup — Razorpay Payment Link (no code)

1. Razorpay Dashboard → **Payment Links → New Payment Link**.
2. Amount: **Rs.1,000**. Title: "Consultation with Lakshay Aggarwal".
3. Open **Advanced Options → Callback URL** and paste:
   ```
   https://YOUR-DOMAIN/#/schedule
   ```
   (For local testing, you can temporarily put `http://localhost:5173/#/schedule`.)
4. Tick **"Send a callback on payment success"**.
5. Save → copy the short link (looks like `https://rzp.io/l/abc123`).
6. Paste it into `src/lib/config.js`:
   ```js
   razorpay: {
     mode: 'link',
     linkUrl: 'https://rzp.io/l/abc123',
     ...
   }
   ```

When a user clicks the booking CTA on `/vsl`, they're redirected to Razorpay's
hosted page. After successful payment, Razorpay sends them to `/#/schedule`,
which loads Calendly. After they pick a slot, Calendly's `event_scheduled`
postMessage fires and the funnel auto-navigates to `/thank-you`.

### Advanced — Inline Razorpay Checkout

Set `razorpay.mode: 'checkout'` and provide `razorpay.keyId` (from Razorpay Dashboard → Settings → API Keys). The funnel will open Razorpay's modal instead of redirecting. Use this once you want a smoother UX and have backend webhook verification in place.

## 7. Quick funnel test before going live

1. Open the site in an incognito window on your phone.
2. Fill the form → verify the WhatsApp number lands in your sheet.
3. Confirm you land on `/vsl` and the video plays.
4. Watch until the CTA appears (or temporarily set `ctaRevealSeconds: 5`).
5. Click "Book My Consultation Call — Pay Rs.1,000" → Razorpay opens.
6. Pay (use Razorpay test mode if you're not live yet) → confirm you land on `/schedule`.
7. Pick a Calendly slot → confirm auto-redirect to `/thank-you`.
8. Confirm the Meta Pixel `Lead` and `Schedule` events fire (Pixel Helper extension).

---

## File map

```
src/
├── main.jsx                # Router setup
├── index.css               # Tailwind layers + brand utilities
├── lib/
│   ├── config.js           # 👉 EDIT ME — funnel settings
│   ├── lang.jsx            # 👉 EDIT ME — all on-page copy (English)
│   └── lead.js             # localStorage + webhook + Pixel
├── components/
│   ├── Header.jsx          # Logo + booking-open badge
│   ├── Footer.jsx
│   ├── LeadForm.jsx        # 6-field qualifier form
│   ├── VideoPlayer.jsx     # Vimeo / YouTube / mp4
│   ├── TrustBar.jsx
│   └── ScrollToTop.jsx
└── pages/
    ├── OptIn.jsx           # Page 1
    ├── VSL.jsx             # Page 2
    ├── Schedule.jsx        # Page 3
    └── ThankYou.jsx        # Page 4
```
