import React, { createContext, useContext, useEffect } from 'react';

const LangCtx = createContext({ lang: 'en' });

export function LangProvider({ children }) {
  useEffect(() => { document.documentElement.lang = 'en'; }, []);
  return <LangCtx.Provider value={{ lang: 'en' }}>{children}</LangCtx.Provider>;
}

export function useLang() { return useContext(LangCtx); }

// Single source of truth for every line of copy on the funnel.
// Rewritten using Russell Brunson's "Copywriting Secrets" principles:
//   - One Big Domino promise (a specific outcome, in a specific timeframe, without the specific pain)
//   - Visceral, named-enemy pain language ("contractor ghosting you")
//   - Curiosity-driven open loops in CTA pending messaging
//   - Risk reversal stated boldly, not apologetically
//   - "You / I" personal voice — never "we / our team"
//   - Specific numbers beat vague claims (₹5–20 lakhs, 14 days, 40+ projects)
export const STRINGS = {
  en: {
    optin: {
      eyebrow: 'For Delhi NCR homeowners whose dream home is stuck, bleeding money, or sliding off track',
      headline: 'How To Get Your Stuck Home Construction Back On Track In The Next 14 Days — Without Firing Your Contractor, Starting Over, Or Throwing One More Rupee At The Problem.',
      sub: 'If delays, budget blowouts, and a contractor who suddenly "won\'t pick up the phone" have hijacked your dream home — there is one 60-minute call that can fix it. And if it doesn\'t, you don\'t pay a single rupee.',
      support: 'Watch the 4-minute video below. I\'ll show you the 3 mistakes 9 out of 10 NCR homeowners make the moment their build goes off the rails — and the exact playbook I\'ve used to rescue 40+ stuck projects across Delhi, Gurgaon, Noida and Faridabad in the last 12 years.',
      above: 'Watch the short video, then tell me about your project — I personally read every entry before our call.',
      cta: '▶  Show Me The Video',
      formTitle: 'Tell Me About Your Project',
      formNote: 'I read every submission myself. Your video link + a short WhatsApp note from me will land within minutes.',
      scarcity: (left) => `Only ${left} consultation slots left this month — I take every call personally.`,
      trust: ['12+ Years On NCR Sites', '40+ Rescued Projects', '100% Money-Back Guarantee', 'Delhi · Gurgaon · Noida · Faridabad']
    },
    form: {
      name: 'Your full name',
      phone: 'WhatsApp number',
      city: 'City',
      stage: 'What stage is your project in right now?',
      stages: ['Still planning', 'Just started', 'Stuck mid-way', 'Almost done — but problems'],
      problem: 'In one line — what is driving you mad right now?',
      problemPh: 'e.g. Builder is 8 months behind, won\'t pick up, and now wants another ₹4 lakhs…',
      source: 'How did you hear about me?',
      sources: ['Instagram / Facebook ad', 'Google search', 'A friend told me', 'Somewhere else'],
      submit: 'Send Me The Video  →',
      submitting: 'Loading…',
      consent: 'By continuing you\'re okay with me sending one WhatsApp note to the number above. No spam — ever.'
    },
    vsl: {
      eyebrow: 'Watch this before you book the call',
      headline: 'In the next 4 minutes, I\'ll show you exactly why your home is stuck — and the 3-step fix to get it moving again this week.',
      sub: 'Lakshay Aggarwal · Civil Engineer · 40+ NCR builds rescued in 12 years',
      ctaTitle: 'Ready to fix this? Book your private ₹1,000 consultation.',
      ctaSub: '60 minutes. One-on-one with me — not an assistant. Online (Zoom) or in person at our Delhi office. I review your contract, your drawings and your timeline, then hand you a written action plan you can use the same day.',
      cta: 'Yes, Book My Consultation Call',
      ctaPending: (s) => `Keep watching — I\'m about to reveal the #1 mistake costing NCR homeowners ₹5–20 lakhs on stuck builds. Your booking link unlocks in ${s}s.`,
      guarantee: '100% money-back guarantee. If you don\'t leave the call with at least 3 concrete, actionable fixes you can apply this week — I refund every rupee. No forms. No follow-up questions. No awkwardness.'
    },
    schedule: {
      eyebrow: 'Final step',
      headline: 'Pick the time that works for you',
      sub: 'Choose a slot below. A WhatsApp confirmation from me lands within minutes.',
      fallback: 'Calendar not loading? Tap the button below to open it directly.',
      open: 'Open Booking Calendar'
    },
    thanks: {
      eyebrow: 'You\'re booked.',
      headline: 'Now let\'s get your home back on track.',
      sub: 'Check WhatsApp on the number you provided. I\'ve sent your confirmation, your calendar invite, and a short prep note. Read the prep note before our call so we can hit the ground running on minute one.',
      bullets: [
        'Add the meeting to your calendar (link is in the WhatsApp note).',
        'Write down the 3 things you most want solved on the call.',
        'Keep your contract, latest drawings, and most recent bills handy — we will review them live.',
        'If anything changes, WhatsApp me 30 minutes before and I\'ll reschedule. No drama.'
      ],
      footer: 'One honest call creates clarity. And clarity is what gets your home moving again.'
    }
  }
};

export function useT() {
  return STRINGS.en;
}
