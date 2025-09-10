// Serviço de analytics para Google Analytics e outros
export interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
}

export interface PageViewEvent {
    page_title: string;
    page_location: string;
    page_path: string;
    custom_parameters?: Record<string, any>;
}

export class AnalyticsService {
    private static measurementId: string = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

    static init(): void {
        if (typeof window !== 'undefined' && this.measurementId) {
            // Load Google Analytics
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
                page_location: window.location.href,
            });
        }
    }

    static trackEvent(event: AnalyticsEvent): void {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', event.action, {
                event_category: event.category,
                event_label: event.label,
                value: event.value,
                ...event.custom_parameters,
            });
        }
    }

    static trackPageView(event: PageViewEvent): void {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('config', this.measurementId, {
                page_title: event.page_title,
                page_location: event.page_location,
                page_path: event.page_path,
                ...event.custom_parameters,
            });
        }
    }

    static trackPurchase(transactionId: string, value: number, currency: string = 'BRL', items?: any[]): void {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'purchase', {
                transaction_id: transactionId,
                value: value,
                currency: currency,
                items: items,
            });
        }
    }

    static trackCourseEnrollment(courseId: string, courseName: string, value: number): void {
        this.trackEvent({
            action: 'course_enrollment',
            category: 'Education',
            label: courseName,
            value: value,
            custom_parameters: {
                course_id: courseId,
                course_name: courseName,
            },
        });
    }

    static trackLessonCompletion(lessonId: string, courseId: string, lessonName: string): void {
        this.trackEvent({
            action: 'lesson_completion',
            category: 'Education',
            label: lessonName,
            custom_parameters: {
                lesson_id: lessonId,
                course_id: courseId,
                lesson_name: lessonName,
            },
        });
    }

    static trackUserRegistration(userId: string, method: string = 'email'): void {
        this.trackEvent({
            action: 'user_registration',
            category: 'User',
            label: method,
            custom_parameters: {
                user_id: userId,
                registration_method: method,
            },
        });
    }

    static trackUserLogin(userId: string, method: string = 'email'): void {
        this.trackEvent({
            action: 'user_login',
            category: 'User',
            label: method,
            custom_parameters: {
                user_id: userId,
                login_method: method,
            },
        });
    }

    static trackSearch(searchTerm: string, resultsCount: number): void {
        this.trackEvent({
            action: 'search',
            category: 'Engagement',
            label: searchTerm,
            value: resultsCount,
            custom_parameters: {
                search_term: searchTerm,
                results_count: resultsCount,
            },
        });
    }
}
