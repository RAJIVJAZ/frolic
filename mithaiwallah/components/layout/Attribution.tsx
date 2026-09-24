'use client';

import { useEffect } from 'react';

const KEY = 'mw_attribution';

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_path?: string;
};

/**
 * First-touch attribution: the UTM tags and referrer of the page a visitor
 * landed on, kept for the session so a lead submitted three pages later is
 * still credited to the Instagram reel or email that brought them.
 */
export function AttributionCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      const q = new URLSearchParams(window.location.search);
      const data: Attribution = {
        utm_source: q.get('utm_source') ?? undefined,
        utm_medium: q.get('utm_medium') ?? undefined,
        utm_campaign: q.get('utm_campaign') ?? undefined,
        referrer: document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined,
        landing_path: window.location.pathname,
      };
      sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // Storage blocked (private mode, strict settings): attribution is a nicety.
    }
  }, []);
  return null;
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Attribution;
  } catch {
    return {};
  }
}
