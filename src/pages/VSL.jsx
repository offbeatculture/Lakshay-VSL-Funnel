import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useT } from '../lib/lang.jsx';
import { CONFIG } from '../lib/config.js';
import { getLead } from '../lib/lead.js';

const RAZORPAY_URL = 'https://pages.razorpay.com/connect-lakshay';

function WistiaVideo() {
  useEffect(() => {
    // Load Wistia player script
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const playerScript = document.createElement('script');
      playerScript.src = 'https://fast.wistia.com/player.js';
      playerScript.async = true;
      document.body.appendChild(playerScript);
    }

    // Load specific Wistia video embed script
    if (!document.querySelector('script[src="https://fast.wistia.com/embed/hwqmujzb5q.js"]')) {
      const embedScript = document.createElement('script');
      embedScript.src = 'https://fast.wistia.com/embed/hwqmujzb5q.js';
      embedScript.async = true;
      embedScript.type = 'module';
      document.body.appendChild(embedScript);
    }
  }, []);

  return (
    <>
      <style>
        {`
          wistia-player[media-id='hwqmujzb5q']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/hwqmujzb5q/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 56.25%;
          }

          wistia-player[media-id='hwqmujzb5q'] {
            display: block;
            width: 100%;
            border-radius: 1rem;
            overflow: hidden;
          }
        `}
      </style>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <wistia-player
          media-id="hwqmujzb5q"
          aspect="1.7777777777777777"
        ></wistia-player>
      </div>
    </>
  );
}

function buildRazorpayUrl() {
  const lead = getLead();

  const url = new URL(RAZORPAY_URL);

  if (lead?.name) {
    url.searchParams.set('name', lead.name);
  }

  if (lead?.phone_digits) {
    url.searchParams.set('phone', lead.phone_digits);
  } else if (lead?.phone) {
    url.searchParams.set('phone', lead.phone.replace(/\D/g, ''));
  }

  return url.toString();
}

export default function VSL() {
  const t = useT();
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(CONFIG.ctaRevealSeconds);

  // Gate: if no lead in storage, send user back to opt-in.
  useEffect(() => {
    const lead = getLead();
    if (!lead) navigate('/', { replace: true });
  }, [navigate]);

  // Reveal CTA after configured delay. Persists across reloads using sessionStorage
  // so reloads don't reset the timer.
  useEffect(() => {
    const KEY = 'lakshay_vsl_started_at';
    let startedAt = Number(sessionStorage.getItem(KEY));

    if (!startedAt) {
      startedAt = Date.now();
      sessionStorage.setItem(KEY, String(startedAt));
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = Math.max(CONFIG.ctaRevealSeconds - elapsed, 0);
      setRemaining(left);
    };

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, []);

  const ctaReady = remaining <= 0;

  function handleBookClick() {
    window.location.href = buildRazorpayUrl();
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-navy text-brand-cream">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-content px-5 pt-8 pb-10 lg:pt-12">
          <div className="text-center">
            <span className="pill bg-brand-orange/15 text-brand-orange ring-brand-orange/30">
              {t.vsl.eyebrow}
            </span>

            <h1 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              {t.vsl.headline}
            </h1>

            <p className="mt-3 text-sm text-brand-cream/70 sm:text-base">
              {t.vsl.sub}
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-4xl">
            <WistiaVideo />
          </div>

          {/* CTA reveal block */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {t.vsl.ctaTitle}
              </h2>

              <p className="mt-2 text-sm text-brand-cream/70">
                {t.vsl.ctaSub}
              </p>

              <div className="mt-5">
                {ctaReady ? (
                  <button
                    onClick={handleBookClick}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {`${t.vsl.cta} — Pay Rs.1,000`}

                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-brand-cream/70">
                    <svg
                      className="h-5 w-5 animate-spin text-brand-orange"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeOpacity=".25"
                        strokeWidth="4"
                      />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>

                    <span>{t.vsl.ctaPending(remaining)}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg bg-brand-orange/10 px-4 py-3 text-xs text-brand-cream/85 ring-1 ring-brand-orange/30">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 10-1.5 0v4.5c0 .414.336.75.75.75h3a.75.75 0 000-1.5h-2.25v-3.75z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>{t.vsl.guarantee}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}