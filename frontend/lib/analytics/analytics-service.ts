// Serviço de analytics para Google Analytics e outros
export interface AnalyticsEvent {
        action: string;
        category: string;
        label?: string;
        value?: number;
        custom_parameters?: Record<string, any>;
}

export interface AnalyticsConfig {
        measurementId: string;
        debug?: boolean;
        enabled?: boolean;
}

export class AnalyticsService {
        private measurementId: string;
        private debug: boolean;
        private enabled: boolean;
        private isInitialized: boolean = false;

        constructor(config: AnalyticsConfig) {
                this.measurementId = config.measurementId;
                this.debug = config.debug || false;
                this.enabled = config.enabled !== false;
        }

        async initialize(): Promise<void> {
                if (!this.enabled || this.isInitialized) return;

                try {
                        // Carregar script do Google Analytics
                        const script = document.createElement('script');
                        script.async = true;
                        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
                        document.head.appendChild(script);

                        // Initialize gtag
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        function gtag(...args: any[]) {
                                (window as any).dataLayer.push(args);
                        }

                        (window as any).gtag = gtag;
                        gtag('js', new Date());
                        gtag('config', this.measurementId, {
                                page_title: document.title,
                                page_location: window.location.href
                        });

                        this.isInitialized = true;

                        if (this.debug) {
                                console.log('Analytics initialized with ID:', this.measurementId);
                        }
                } catch (error) {
                        console.error('Failed to initialize analytics:', error);
                }
        }

        trackEvent(event: AnalyticsEvent): void {
                if (!this.enabled || !this.isInitialized) return;

                try {
                        (window as any).gtag('event', event.action, {
                                event_category: event.category,
                                event_label: event.label,
                                value: event.value,
                                ...event.custom_parameters
                        });

                        if (this.debug) {
                                console.log('Analytics event tracked:', event);
                        }
                } catch (error) {
                        console.error('Failed to track analytics event:', error);
                }
        }

        trackPageView(pagePath: string, pageTitle?: string): void {
                if (!this.enabled || !this.isInitialized) return;

                try {
                        (window as any).gtag('config', this.measurementId, {
                                page_path: pagePath,
                                page_title: pageTitle || document.title
                        });

                        if (this.debug) {
                                console.log('Page view tracked:', { pagePath, pageTitle });
                        }
                } catch (error) {
                        console.error('Failed to track page view:', error);
                }
        }

        trackPurchase(transactionId: string, value: number, currency: string = 'BRL', items: any[] = []): void {
                if (!this.enabled || !this.isInitialized) return;

                try {
                        (window as any).gtag('event', 'purchase', {
                                transaction_id: transactionId,
                                value: value,
                                currency: currency,
                                items: items
                        });

                        if (this.debug) {
                                console.log('Purchase tracked:', { transactionId, value, currency, items });
                        }
                } catch (error) {
                        console.error('Failed to track purchase:', error);
                }
        }

        setUserProperties(properties: Record<string, any>): void {
                if (!this.enabled || !this.isInitialized) return;

                try {
                        (window as any).gtag('config', this.measurementId, {
                                user_properties: properties
                        });

                        if (this.debug) {
                                console.log('User properties set:', properties);
                        }
                } catch (error) {
                        console.error('Failed to set user properties:', error);
                }
        }

        setUserId(userId: string): void {
                if (!this.enabled || !this.isInitialized) return;

                try {
                        (window as any).gtag('config', this.measurementId, {
                                user_id: userId
                        });

                        if (this.debug) {
                                console.log('User ID set:', userId);
                        }
                } catch (error) {
                        console.error('Failed to set user ID:', error);
                }
        }
}

// Instância global do serviço de analytics
let analyticsService: AnalyticsService | null = null;

export function initializeAnalytics(config: AnalyticsConfig): AnalyticsService {
        if (!analyticsService) {
                analyticsService = new AnalyticsService(config);
        }
        return analyticsService;
}

export function getAnalyticsService(): AnalyticsService | null {
        return analyticsService;
}

// Hooks para facilitar o uso
export function useAnalytics() {
        return {
                trackEvent: (event: AnalyticsEvent) => analyticsService?.trackEvent(event),
                trackPageView: (pagePath: string, pageTitle?: string) => analyticsService?.trackPageView(pagePath, pageTitle),
                trackPurchase: (transactionId: string, value: number, currency?: string, items?: any[]) =>
                        analyticsService?.trackPurchase(transactionId, value, currency, items),
                setUserProperties: (properties: Record<string, any>) => analyticsService?.setUserProperties(properties),
                setUserId: (userId: string) => analyticsService?.setUserId(userId)
        };
}