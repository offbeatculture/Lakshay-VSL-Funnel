import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useT } from '../lib/lang.jsx';
import { CONFIG } from '../lib/config.js';
import { getLead } from '../lib/lead.js';

export default function Schedule() {
  const t = useT();
  const navigate = useNavigate();

  useEffect(() => {
    const lead = getLead();
    if (!lead) navigate('/', { replace: true });
  }, [navigate]);

  // Listen for Calendly's postMessage so we can redirect to /thank-you
  // after a slot is actually booked (no need to configure Calendly redirect).
  useEffect(() => {
    function onMsg(e) {
      if (!e?.data || typeof e.data !== 'object') return;
      if (e.data.event === 'calendly.event_scheduled') {
        navigate('/thank-you', { replace: true });
      }
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [navigate]);

  // Pre-fill Calendly with the lead's data when possible.
  const lead = getLead() || {};
  const calUrl = (() => {
    try {
      const u = new URL(CONFIG.calendlyUrl);
      if (lead.name) u.searchParams.set('name', lead.name);
      // Calendly needs an email field — phone goes in custom answer if configured.
      // We pass phone as a1 (first custom question) by convention.
      if (lead.phone) u.searchParams.set('a1', lead.phone);
      return u.toString();
    } catch {
      return CONFIG.calendlyUrl;
    }
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-content px-5 pt-8 pb-10">
          <div className="text-center">
            <span className="pill bg-emerald-50 text-emerald-700 ring-emerald-200">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              Payment received · {t.schedule.eyebrow}
            </span>
            <h1 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-extrabold leading-tight text-brand-navy sm:text-3xl lg:text-4xl">
              {t.schedule.headline}
            </h1>
            <p className="mt-3 text-brand-navy/70">{t.schedule.sub}</p>
          </div>

          <div className="mx-auto mt-7 max-w-4xl">
            <div className="card overflow-hidden">
              <iframe
                title="Booking calendar"
                src={calUrl}
                className="h-[760px] w-full"
                loading="eager"
                frameBorder="0"
              />
            </div>
            <p className="mt-3 text-center text-sm text-brand-navy/60">
              {t.schedule.fallback}{' '}
              <a href={calUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-orange hover:underline">
                {t.schedule.open} →
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
