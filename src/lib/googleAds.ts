'use client';

const GOOGLE_ADS_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO ?? '';

export function fireGoogleAdsConversion(eventLabel?: string) {
  if (!GOOGLE_ADS_SEND_TO) return;
  if (typeof window === 'undefined') return;

  const anyWindow = window as any;

  // Preferred: if gtag is already available
  if (typeof anyWindow.gtag === 'function') {
    try {
      anyWindow.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_SEND_TO,
        ...(eventLabel ? { event_label: eventLabel } : {}),
      });
    } catch {
      // ignore
    }
    return;
  }

  // Fallback: push into dataLayer (will be picked up once gtag loads)
  anyWindow.dataLayer = anyWindow.dataLayer || [];
  try {
    anyWindow.dataLayer.push({
      event: 'conversion',
      send_to: GOOGLE_ADS_SEND_TO,
      ...(eventLabel ? { event_label: eventLabel } : {}),
    });
  } catch {
    // ignore
  }
}
