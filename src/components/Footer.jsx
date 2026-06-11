import React from 'react';
import { CONFIG } from '../lib/config.js';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-line/60 bg-brand-navy text-brand-cream/80">
      <div className="mx-auto max-w-content px-5 py-8 text-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-base font-bold text-white">{CONFIG.brandName}</div>
            <div className="text-xs text-brand-cream/60">{CONFIG.brandTagline} · {CONFIG.officeAddress}</div>
          </div>
          <div className="text-xs text-brand-cream/60">
            © {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
