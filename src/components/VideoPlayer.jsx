import React from 'react';
import { CONFIG } from '../lib/config.js';

// Lazy-loaded video wrapper. 16:9 responsive frame.
export default function VideoPlayer() {
  const { video } = CONFIG;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-card ring-1 ring-brand-line/40" style={{ aspectRatio: '16 / 9' }}>
      {video.type === 'mp4' ? (
        <video
          className="absolute inset-0 h-full w-full"
          controls
          playsInline
          preload="metadata"
          poster={video.poster || undefined}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ) : (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={video.src}
          title="Lakshay Aggarwal — Consultation Video"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          frameBorder="0"
        />
      )}
    </div>
  );
}
