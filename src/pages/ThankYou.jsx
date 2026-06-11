import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useT } from '../lib/lang.jsx';

export default function ThankYou() {
  const t = useT();

  // Fire conversion event for Pixel if available.
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Schedule');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-content px-5 pt-10 pb-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-brand-orange/15">
              <svg className="h-9 w-9 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="pill bg-brand-orange/10 text-brand-orangeDark ring-brand-orange/20">{t.thanks.eyebrow}</span>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              {t.thanks.headline}
            </h1>
            <p className="mt-3 text-brand-navy/75">{t.thanks.sub}</p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl card p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-brand-navy">Before the call</h2>
            <ul className="mt-3 space-y-3">
              {t.thanks.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-brand-ink/90">
                  <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-brand-navy text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center font-display text-lg italic text-brand-navy/80">
            “{t.thanks.footer}”
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
