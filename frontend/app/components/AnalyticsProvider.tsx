"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

interface AnalyticsContextType {
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackPageView: (page: string, properties?: Record<string, any>) => void;
  trackConversion: (goal: string, value?: number, properties?: Record<string, any>) => void;
  trackError: (error: Error, properties?: Record<string, any>) => void;
  trackPerformance: (metric: string, value: number, properties?: Record<string, any>) => void;
  identifyUser: (userId: string, traits?: Record<string, any>) => void;
  setUserProperties: (properties: Record<string, any>) => void;
  getSessionId: () => string;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
  apiKey?: string;
  userId?: string;
  userTraits?: Record<string, any>;
}

export function AnalyticsProvider({
  children,
  apiKey = process.env.NEXT_PUBLIC_ANALYTICS_KEY,
  userId,
  userTraits = {}
}: AnalyticsProviderProps) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string>('');
  const [userProperties, setUserProperties] = useState<Record<string, any>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('analytics_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('analytics_session_id', newSessionId);
    }
  }, []);

  // Initialize analytics
  useEffect(() => {
    if (apiKey && !isInitialized) {
      initializeAnalytics();
      setIsInitialized(true);
    }
  }, [apiKey, isInitialized]);

  // Track page views
  useEffect(() => {
    if (isInitialized && router.asPath) {
      trackPageView(router.asPath);
    }
  }, [router.asPath, isInitialized]);

  const generateSessionId = (): string => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const initializeAnalytics = () => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'user_type',
          'custom_parameter_2': 'subscription_status',
          'custom_parameter_3': 'country'
        }
      });
    }

    // Initialize other analytics services
    initializeMixpanel();
    initializeAmplitude();
    initializeHotjar();
  };

  const initializeMixpanel = () => {
    if (typeof window !== 'undefined' && window.mixpanel && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      window.mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
      if (userId) {
        window.mixpanel.identify(userId);
        window.mixpanel.people.set(userTraits);
      }
    }
  };

  const initializeAmplitude = () => {
    if (typeof window !== 'undefined' && window.amplitude && process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      window.amplitude.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
      if (userId) {
        window.amplitude.getInstance().setUserId(userId);
        window.amplitude.getInstance().setUserProperties(userTraits);
      }
    }
  };

  const initializeHotjar = () => {
    if (typeof window !== 'undefined' && window.hj) {
      window.hj('identify', userId, userTraits);
    }
  };

  const trackEvent = (event: string, properties: Record<string, any> = {}) => {
    const eventData: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...userProperties
      },
      timestamp: new Date(),
      sessionId,
      ...(userId && { userId })
    };

    // Send to multiple analytics services
    sendToGoogleAnalytics(event, properties);
    sendToMixpanel(event, properties);
    sendToAmplitude(event, properties);
    sendToCustomAPI(eventData);
  };

  const trackPageView = (page: string, properties: Record<string, any> = {}) => {
    const eventData: AnalyticsEvent = {
      event: 'page_view',
      properties: {
        page,
        title: document.title,
        url: window.location.href,
        referrer: document.referrer,
        ...properties
      },
      timestamp: new Date(),
      sessionId,
      ...(userId && { userId })
    };

    sendToAnalytics(eventData);
  };

  const trackConversion = (goal: string, value?: number, properties: Record<string, any> = {}) => {
    const eventData: AnalyticsEvent = {
      event: 'conversion',
      properties: {
        goal,
        value,
        currency: 'BRL',
        ...properties
      },
      timestamp: new Date(),
      sessionId,
      ...(userId && { userId })
    };

    sendToAnalytics(eventData);
  };

  const trackError = (error: Error, properties: Record<string, any> = {}) => {
    const eventData: AnalyticsEvent = {
      event: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        error_name: error.name,
        ...properties
      },
      timestamp: new Date(),
      sessionId,
      ...(userId && { userId })
    };

    sendToAnalytics(eventData);
  };

  const trackPerformance = (metric: string, value: number, properties: Record<string, any> = {}) => {
    const eventData: AnalyticsEvent = {
      event: 'performance',
      properties: {
        metric,
        value,
        unit: 'ms',
        ...properties
      },
      timestamp: new Date(),
      sessionId,
      ...(userId && { userId })
    };

    sendToAnalytics(eventData);
  };

  const identifyUser = (userId: string, traits: Record<string, any> = {}) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        user_id: userId
      });
    }

    // Mixpanel
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.identify(userId);
      window.mixpanel.people.set(traits);
    }

    // Amplitude
    if (typeof window !== 'undefined' && window.amplitude) {
      window.amplitude.getInstance().setUserId(userId);
      window.amplitude.getInstance().setUserProperties(traits);
    }

    // Hotjar
    if (typeof window !== 'undefined' && window.hj) {
      window.hj('identify', userId, traits);
    }
  };

  const setUserPropertiesHandler = (properties: Record<string, any>) => {
    setUserProperties(properties);

    // Send to analytics services
    if (typeof window !== 'undefined') {
      if (window.mixpanel) {
        window.mixpanel.people.set(properties);
      }
      if (window.amplitude) {
        window.amplitude.getInstance().setUserProperties(properties);
      }
    }
  };

  const getSessionId = (): string => {
    return sessionId;
  };

  const sendToAnalytics = (eventData: AnalyticsEvent) => {
    // Send to all analytics services
    sendToGoogleAnalytics(eventData.event, eventData.properties || {});
    sendToMixpanel(eventData.event, eventData.properties || {});
    sendToAmplitude(eventData.event, eventData.properties || {});
    sendToCustomAPI(eventData);
  };

  const sendToGoogleAnalytics = (event: string, properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties);
    }
  };

  const sendToMixpanel = (event: string, properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track(event, properties);
    }
  };

  const sendToAmplitude = (event: string, properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.amplitude) {
      window.amplitude.getInstance().logEvent(event, properties);
    }
  };

  const sendToCustomAPI = async (eventData: AnalyticsEvent) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  };

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    trackConversion,
    trackError,
    trackPerformance,
    identifyUser,
    setUserProperties: setUserPropertiesHandler,
    getSessionId,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// Global type declarations for analytics libraries
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    mixpanel: {
      init: (token: string) => void;
      track: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string) => void;
      people: {
        set: (properties: Record<string, any>) => void;
      };
    };
    amplitude: {
      getInstance: () => {
        init: (apiKey: string) => void;
        setUserId: (userId: string) => void;
        setUserProperties: (properties: Record<string, any>) => void;
        logEvent: (event: string, properties?: Record<string, any>) => void;
      };
    };
    hj: (...args: any[]) => void;
    Sentry: {
      captureException: (error: Error, options?: any) => void;
    };
  }
} 