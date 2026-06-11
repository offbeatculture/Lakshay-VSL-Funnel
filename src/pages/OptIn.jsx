import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TrustBar from '../components/TrustBar.jsx';
import LeadForm from '../components/LeadForm.jsx';
import { useT } from '../lib/lang.jsx';
import { CONFIG } from '../lib/config.js';

export default function OptIn() {
  const t = useT();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const slotsLeft = Math.max(CONFIG.slotsTotal - CONFIG.slotsTaken, 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-brand-cream to-brand-sand" />
            <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-brand-navy/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-content px-5 pt-10 pb-6 lg:pt-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left — copy */}
              <div className="lg:col-span-7">
                <span className="pill">
                  <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                  {t.optin.eyebrow}
                </span>

                <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
                  {t.optin.headline}
                </h1>
                <p className="mt-4 text-lg text-brand-navy/80">{t.optin.sub}</p>
                <p className="mt-3 text-base text-brand-navy/70">{t.optin.support}</p>

                {/* Hero photo — real construction site (replace /public/hero.jpg with Lakshay's own photo when available; falls back to Unsplash). */}
                <figure className="mt-7 overflow-hidden rounded-2xl bg-brand-navy shadow-card ring-1 ring-brand-navy/10">
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="/hero.jpg"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80'; }}
                      alt="Civil engineer on a Delhi NCR residential construction site reviewing structural work"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="eager"
                      fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        Live from an active NCR site
                      </span>
                    </div>
                    <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg bg-black/55 px-3 py-2 backdrop-blur-sm text-white text-xs">
                      <span className="font-semibold">Lakshay Aggarwal · Civil Engineer · Delhi NCR</span>
                      <span className="opacity-90">12+ yrs · 40+ projects rescued</span>
                    </figcaption>
                  </div>
                </figure>

                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="btn-primary"
                  >
                    ▶  {t.optin.cta}
                  </button>
                  <span className="text-sm font-semibold text-brand-navy">
                    🔒 {t.optin.scarcity(slotsLeft)}
                  </span>
                </div>
              </div>

              {/* Right — lead form card */}
              <div className="lg:col-span-5">
                <div ref={formRef} className="card p-6 sm:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-brand-navy">{t.optin.formTitle}</h2>
                    <span className="pill bg-brand-orange/10 text-brand-orangeDark ring-brand-orange/20">Free · 4 min video</span>
                  </div>
                  <p className="mb-5 text-sm text-brand-navy/70">{t.optin.above}</p>
                  <LeadForm onSuccess={() => navigate('/vsl')} />
                  <p className="mt-4 text-center text-[11px] text-brand-navy/55">{t.optin.formNote}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <TrustBar items={t.optin.trust} />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto mt-10 max-w-content px-5">
          <h3 className="text-center font-display text-2xl font-bold text-brand-navy">Real Delhi NCR homeowners I&rsquo;ve unstuck</h3>
          <p className="mt-2 text-center text-sm text-brand-navy/65">Same chaos you&rsquo;re in right now. Same fix you&rsquo;re one call away from.</p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CONFIG.testimonials.map((t, i) => (
              <figure key={i} className="card p-5">
                <svg className="h-5 w-5 text-brand-orange" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 7h4v4H7c0 3 1 4 4 5v2c-5 0-8-2-8-7V7zm10 0h4v4h-4c0 3 1 4 4 5v2c-5 0-8-2-8-7V7z" />
                </svg>
                <blockquote className="mt-3 text-sm leading-relaxed text-brand-ink/90">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-xs font-semibold text-brand-navy/70">{t.name} · {t.city}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
