'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  Star,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Target,
  Award,
  Activity,
  Zap
} from 'lucide-react';

interface AnalyticsContextType {
  metrics: AnalyticsMetrics;
  events: AnalyticsEvent[];
  isLoading: boolean;
  error: string | null;
  trackEvent: (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => void;
  updateMetrics: (newMetrics: Partial<AnalyticsMetrics>) => void;
  clearError: () => void;
  refreshData: () => Promise<void>;
}

interface AnalyticsMetrics {
  totalViews: number;
  uniqueVisitors: number;
  engagementRate: number;
  conversionRate: number;
  avgSessionDuration: number;
  bounceRate: number;
  revenue: number;
  pageViews: number;
  sessions: number;
  newUsers: number;
  returningUsers: number;
}

interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'click' | 'scroll' | 'download' | 'purchase' | 'signup' | 'login';
  name: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

interface AnalyticsProviderProps {
  children: ReactNode;
  apiKey?: string;
  debug?: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({
  children,
  apiKey = process.env.NEXT_PUBLIC_ANALYTICS_API_KEY,
  debug = false
}: AnalyticsProviderProps) {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    totalViews: 0,
    uniqueVisitors: 0,
    engagementRate: 0,
    conversionRate: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    revenue: 0,
    pageViews: 0,
    sessions: 0,
    newUsers: 0,
    returningUsers: 0
  });

  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockMetrics: AnalyticsMetrics = {
        totalViews: 125430,
        uniqueVisitors: 89420,
        engagementRate: 68.4,
        conversionRate: 3.2,
        avgSessionDuration: 245,
        bounceRate: 32.1,
        revenue: 15420.50,
        pageViews: 187650,
        sessions: 45670,
        newUsers: 23450,
        returningUsers: 65970
      };

      setMetrics(mockMetrics);

      if (debug) {
        console.log('Analytics data loaded:', mockMetrics);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
      if (debug) {
        console.error('Analytics error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const trackEvent = (eventData: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => {
    const event: AnalyticsEvent = {
      ...eventData,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    setEvents(prev => [...prev, event]);

    // Update metrics based on event type
    if (event.type === 'page_view') {
      setMetrics(prev => ({
        ...prev,
        totalViews: prev.totalViews + 1,
        pageViews: prev.pageViews + 1
      }));
    } else if (event.type === 'purchase') {
      setMetrics(prev => ({
        ...prev,
        conversionRate: ((prev.conversionRate * prev.totalViews) + 1) / prev.totalViews,
        revenue: prev.revenue + (event.value || 0)
      }));
    }

    if (debug) {
      console.log('Event tracked:', event);
    }
  };

  const updateMetrics = (newMetrics: Partial<AnalyticsMetrics>) => {
    setMetrics(prev => ({ ...prev, ...newMetrics }));
  };

  const clearError = () => {
    setError(null);
  };

  const refreshData = async () => {
    await loadInitialData();
  };

  const value: AnalyticsContextType = {
    metrics,
    events,
    isLoading,
    error,
    trackEvent,
    updateMetrics,
    clearError,
    refreshData
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// Hook for tracking page views
export function usePageView(pageName: string) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent({
      type: 'page_view',
      name: `Page View: ${pageName}`,
      properties: {
        page: pageName,
        url: window.location.href,
        referrer: document.referrer
      }
    });
  }, [pageName, trackEvent]);
}

// Hook for tracking clicks
export function useClickTracking(elementName: string) {
  const { trackEvent } = useAnalytics();

  const trackClick = (properties?: Record<string, any>) => {
    trackEvent({
      type: 'click',
      name: `Click: ${elementName}`,
      properties: {
        element: elementName,
        ...properties
      }
    });
  };

  return { trackClick };
}

// Hook for tracking scroll depth
export function useScrollTracking() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    let maxScroll = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          trackEvent({
            type: 'scroll',
            name: `Scroll Depth: ${maxScroll}%`,
            value: maxScroll,
            properties: {
              scrollDepth: maxScroll
            }
          });
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [trackEvent]);
}

// Component for displaying analytics metrics
export function AnalyticsMetricsDisplay({ className = '' }: { className?: string }) {
  const { metrics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="text-center text-red-600 dark:text-red-400">
          <Activity className="w-8 h-8 mx-auto mb-2" />
          <p>Erro ao carregar métricas: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Visualizações</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.totalViews.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Visitantes</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.uniqueVisitors.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Engajamento</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.engagementRate.toFixed(1)}%
          </div>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversão</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metrics.conversionRate.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for analytics dashboard
export function AnalyticsDashboard({ className = '' }: { className?: string }) {
  const { metrics, events, isLoading, error, refreshData } = useAnalytics();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Dashboard de Analytics
            </h3>
          </div>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <AnalyticsMetricsDisplay />

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Eventos Recentes
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {events.slice(-10).reverse().map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {event.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}