// Single source of truth for funnel configuration.
// Update these values before launch — no code edits needed elsewhere.

export const CONFIG = {
  // === BRAND ===
  brandName: 'Lakshay Aggarwal',
  brandTagline: 'Civil Engineer · Delhi NCR',
  phoneDisplay: '+91 98XXX XXXXX',
  email: 'consult@lakshayaggarwal.in',
  officeAddress: 'Delhi Office (in-person consults available)',

  // === FUNNEL DESTINATIONS ===
  // Calendly / Cal.com / SavvyCal etc. Replace this with the real booking URL.
  // It will be embedded as an iframe on /schedule.
  calendlyUrl: 'https://calendly.com/your-handle/consultation',

  // After someone schedules (Calendly redirect URL or polled event), they should
  // land on /thank-you. Set this as the redirect URL in Calendly's settings:
  //    https://YOUR-DOMAIN/#/thank-you
  thankYouPath: '/thank-you',

  // === RAZORPAY PAYMENT ===
  // The user must pay Rs.1,000 BEFORE they can book a slot in Calendly.
  // Two modes are supported — pick whichever is easier for you:
  //
  // MODE 'link' (recommended, zero-code):
  //   1. In Razorpay dashboard → Payment Links → Create a Rs.1,000 link.
  //   2. In the link's "Customise" section, set the Callback URL to:
  //        https://YOUR-DOMAIN/#/schedule
  //      and tick "Send SMS / Email" off (we already handle messaging).
  //   3. Paste the link URL below as `razorpay.linkUrl`.
  //   When the user clicks the booking CTA, we send them to this Razorpay-hosted
  //   page. After successful payment, Razorpay redirects them to /#/schedule
  //   which loads Calendly.
  //
  // MODE 'checkout' (inline modal, needs Razorpay Key ID):
  //   Use this once you have a real backend or want a smoother UX.
  //   Set razorpay.keyId to your live/test key and razorpay.amountPaise = 100000.
  razorpay: {
    mode: 'link', // 'link' | 'checkout'
    linkUrl: 'https://rzp.io/l/YOUR-LINK-CODE',
    keyId: '',
    amountPaise: 100000,
    currency: 'INR',
    description: 'Consultation with Lakshay Aggarwal'
  },

  // === LEAD CAPTURE WEBHOOK ===
  // Plug Google Sheets (via Apps Script), Zapier, Make, or any HTTPS endpoint
  // that accepts JSON. Leave empty to only store leads in localStorage.
  // Endpoint will receive: { name, phone, city, stage, problem, source, ts }
  //
  // SET THIS to your Apps Script Web App URL — see README for the 5-step setup
  // targeting your sheet (1wKEAoWL_isNkb_4tQzy0h0yeX9gVaRYvSqheZFLVrVM).
  leadWebhookUrl: 'https://script.google.com/macros/s/AKfycbw4wavMQf_-mCp1SJydCia1VsqMVEgDtgBj074t52DiFq_iEKRscTGxGs6vu9x5z5ecFA/exec',

  // === VSL VIDEO ===
  // Use Vimeo (recommended in the launch plan — NOT YouTube) or a direct mp4.
  // For Vimeo private embed, set type 'vimeo' and the embed URL.
  // For self-hosted mp4 on Hostinger, set type 'mp4' and the file URL.
  video: {
    type: 'vimeo', // 'vimeo' | 'youtube' | 'mp4'
    src: 'https://player.vimeo.com/video/000000000?h=xxxx&badge=0&autopause=0&player_id=0&app_id=58479',
    poster: '' // optional poster image URL for mp4
  },

  // === CTA REVEAL DELAY ===
  // Number of seconds to wait before the "Book My Call" button appears on the
  // VSL page. The launch plan recommends a few minutes — set to ~180s once live.
  // Use a small value (e.g. 5) while testing.
  ctaRevealSeconds: 180,

  // === SCARCITY ===
  slotsTotal: 8,
  slotsTaken: 5,

  // === SOCIAL PROOF ===
  testimonials: [
    {
      quote:
        'Lakshay helped us avoid a Rs.6 lakh mistake in our foundation. He spoke to our builder, gave a clear plan — and the chaos stopped.',
      name: 'Rajeev S.',
      city: 'Gurgaon'
    },
    {
      quote:
        'Our project was stuck at 70% for 18 months. After two sessions with Lakshay, work was completed in 5 months. We finally moved in.',
      name: 'Dr. Anjali M.',
      city: 'Noida'
    },
    {
      quote:
        'I was about to fire my builder. Lakshay showed me a better way — kept the team, fixed the plan, saved months of restart.',
      name: 'Vikram K.',
      city: 'Faridabad'
    }
  ]
};

export default CONFIG;
