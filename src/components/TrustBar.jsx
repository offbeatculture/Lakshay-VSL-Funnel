import React from 'react';

export default function TrustBar({ items }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {items.map((it) => (
        <span key={it} className="pill">
          <svg className="h-3.5 w-3.5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
          </svg>
          {it}
        </span>
      ))}
    </div>
  );
}
