import React from 'react';
import { CONFIG } from '../lib/config.js';

export default function Header() {
  return (
    <header className="border-b border-brand-line/70 bg-brand-cream/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <a href="#/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-navy text-white font-display font-bold">L</span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-brand-navy">{CONFIG.brandName}</span>
            <span className="block text-[11px] uppercase tracking-wider text-brand-navy/60">{CONFIG.brandTagline}</span>
          </span>
        </a>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand-navy/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-navy/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Booking open this week
        </span>
      </div>
    </header>
  );
}
