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
  private pixelId: string;

  constructor(pixelId: string) {
    this.pixelId = pixelId;
    this.initializePixel();
  }

  static getInstance(pixelId?: string): PixelTrackingService {
    if (!PixelTrackingService.instance && pixelId) {
      PixelTrackingService.instance = new PixelTrackingService(pixelId);
    }
    return PixelTrackingService.instance;
  }

  private initializePixel(): void {
    if (typeof window === 'undefined') return;

    (function(f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
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
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // Track page view
    this.track('PageView');
  }

  track(eventName: string, eventData?: PixelEvent): void {
    if (typeof window === 'undefined') return;

    (window as any).fbq('track', eventName, eventData);
  }

  trackPurchase(value: number, currency: string, contentIds: string[]): void {
    this.track('Purchase', {
      eventName: 'Purchase',
      customData: {
        value,
        currency,
        content_ids: contentIds,
      },
    });
  }

  trackAddToCart(value: number, currency: string, contentIds: string[]): void {
    this.track('AddToCart', {
      eventName: 'AddToCart',
      customData: {
        value,
        currency,
        content_ids: contentIds,
      },
    });
  }
}

// Hook para usar o serviço de pixel tracking
export const usePixelTracking = (pixelId?: string) => {
  const service = PixelTrackingService.getInstance(pixelId);

  const track = (eventName: string, eventData?: PixelEvent) => {
    service.track(eventName, eventData);
  };

  const trackPurchase = (value: number, currency: string, contentIds: string[]) => {
    service.trackPurchase(value, currency, contentIds);
  };

  const trackAddToCart = (value: number, currency: string, contentIds: string[]) => {
    service.trackAddToCart(value, currency, contentIds);
  };

  return {
    track,
    trackPurchase,
    trackAddToCart
  };
};