'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && GA_TRACKING_ID) {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];

      // Configure Google Analytics
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
        anonymize_ip: true, // Privacy-focused
        allow_google_signals: false, // Privacy-focused
        allow_ad_personalization_signals: false, // Privacy-focused
        cookie_flags: 'SameSite=None;Secure',
      });
    }
  }, []);

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track blog post reads
export const trackBlogRead = (
  postTitle: string,
  category: string,
  readingTime: number
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'blog_read', {
      event_category: 'Blog',
      event_label: postTitle,
      custom_parameter_1: category,
      custom_parameter_2: readingTime,
    });
  }
};
export default GoogleAnalytics;
