'use client';

// Serviço de rastreamento de pixel para Facebook/Meta
export interface PixelEvent {
  eventName: string;
  eventId?: string;
  customData?: Record<string, any>;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

export class PixelTrackingService {
  private static instance: PixelTrackingService;
  private isInitialized = false;

  static getInstance(): PixelTrackingService {
    if (!PixelTrackingService.instance) {
      PixelTrackingService.instance = new PixelTrackingService();
    }
    return PixelTrackingService.instance;
  }

  init(pixelId: string): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Facebook Pixel Code
    (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);

    // Initialize pixel
    (window as any).fbq('init', pixelId);
    (window as any).fbq('track', 'PageView');

    this.isInitialized = true;
  }

  track(eventName: string, eventData?: Record<string, any>): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    (window as any).fbq('track', eventName, eventData);
  }

  trackPurchase(value: number, currency: string, contentIds: string[]): void {
    this.track('Purchase', {
      value: value,
      currency: currency,
      content_ids: contentIds
    });
  }

  trackAddToCart(value: number, currency: string, contentIds: string[]): void {
    this.track('AddToCart', {
      value: value,
      currency: currency,
      content_ids: contentIds
    });
  }

  trackLead(): void {
    this.track('Lead');
  }

  trackCompleteRegistration(): void {
    this.track('CompleteRegistration');
  }
}

// Hook para usar o pixel tracking
export const usePixelTracking = (pixelId?: string) => {
  const pixelService = PixelTrackingService.getInstance();

  if (pixelId) {
    pixelService.init(pixelId);
  }

  const track = (eventName: string, eventData?: Record<string, any>) => {
    pixelService.track(eventName, eventData);
  };

  const trackPurchase = (value: number, currency: string, contentIds: string[]) => {
    pixelService.trackPurchase(value, currency, contentIds);
  };

  const trackAddToCart = (value: number, currency: string, contentIds: string[]) => {
    pixelService.trackAddToCart(value, currency, contentIds);
  };

  return {
    track,
    trackPurchase,
    trackAddToCart
  };
};

// Instância exportada para uso direto
export const pixelTracking = PixelTrackingService.getInstance();