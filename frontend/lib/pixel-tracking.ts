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
    private static pixelId: string = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

    static init(): void {
        if (typeof window !== 'undefined' && this.pixelId) {
            // Initialize Facebook Pixel
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
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

            // Track page view
            this.track('PageView');
        }
    }

    static track(eventName: string, eventData?: Record<string, any>): void {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', eventName, eventData);
        }
    }

    static trackPurchase(value: number, currency: string = 'BRL', contentIds?: string[]): void {
        this.track('Purchase', {
            value: value,
            currency: currency,
            content_ids: contentIds,
        });
    }

    static trackAddToCart(value: number, currency: string = 'BRL', contentIds?: string[]): void {
        this.track('AddToCart', {
            value: value,
            currency: currency,
            content_ids: contentIds,
        });
    }

    static trackInitiateCheckout(value: number, currency: string = 'BRL', contentIds?: string[]): void {
        this.track('InitiateCheckout', {
            value: value,
            currency: currency,
            content_ids: contentIds,
        });
    }

    static trackLead(value?: number, currency: string = 'BRL'): void {
        this.track('Lead', {
            value: value,
            currency: currency,
        });
    }

    static trackCompleteRegistration(): void {
        this.track('CompleteRegistration');
    }

    static trackViewContent(contentIds?: string[], value?: number, currency: string = 'BRL'): void {
        this.track('ViewContent', {
            content_ids: contentIds,
            value: value,
            currency: currency,
        });
    }
}
