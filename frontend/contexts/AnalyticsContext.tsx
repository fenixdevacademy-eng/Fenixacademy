'use client';

import React, { createContext, useContext, useCallback, ReactNode } from 'react';

export interface AnalyticsEvent {
    event: string;
    properties?: Record<string, any>;
    timestamp?: Date;
}

interface AnalyticsContextType {
    track: (event: string, properties?: Record<string, any>) => void;
    trackPageView: (page: string, properties?: Record<string, any>) => void;
    trackUserAction: (action: string, properties?: Record<string, any>) => void;
    trackCourseProgress: (courseId: string, progress: number, properties?: Record<string, any>) => void;
    trackPurchase: (courseId: string, amount: number, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
    const track = useCallback(async (event: string, properties?: Record<string, any>) => {
        try {
            const eventData: AnalyticsEvent = {
                event,
                properties: {
                    ...properties,
                    timestamp: new Date(),
                    url: typeof window !== 'undefined' ? window.location.href : '',
                    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
                },
            };

            // Send to analytics API
            if (typeof window !== 'undefined') {
                await fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventData),
                });
            }

            console.log('📊 Analytics event tracked:', event, properties);
        } catch (error) {
            console.error('❌ Error tracking analytics event:', error);
        }
    }, []);

    const trackPageView = useCallback((page: string, properties?: Record<string, any>) => {
        track('page_view', {
            page,
            ...properties,
        });
    }, [track]);

    const trackUserAction = useCallback((action: string, properties?: Record<string, any>) => {
        track('user_action', {
            action,
            ...properties,
        });
    }, [track]);

    const trackCourseProgress = useCallback((courseId: string, progress: number, properties?: Record<string, any>) => {
        track('course_progress', {
            courseId,
            progress,
            ...properties,
        });
    }, [track]);

    const trackPurchase = useCallback((courseId: string, amount: number, properties?: Record<string, any>) => {
        track('purchase', {
            courseId,
            amount,
            currency: 'BRL',
            ...properties,
        });
    }, [track]);

    return (
        <AnalyticsContext.Provider
            value={{
                track,
                trackPageView,
                trackUserAction,
                trackCourseProgress,
                trackPurchase,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        // Return default values during SSR
        return {
            track: () => { },
            trackPageView: () => { },
            trackUserAction: () => { },
            trackCourseProgress: () => { },
            trackPurchase: () => { },
        };
    }
    return context;
}