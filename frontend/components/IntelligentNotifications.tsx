'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Star, Zap, Brain, Target, Code, BookOpen, TrendingUp, Clock, Users, Award } from 'lucide-react';
import { useSuperIntelligentAI } from '@/hooks/useSuperIntelligentAI';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'recommendation' | 'achievement' | 'reminder';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'learning' | 'code' | 'project' | 'career' | 'system';
}

interface IntelligentNotificationsProps {
  className?: string;
  onNotificationClick?: (notification: Notification) => void;
}

export function IntelligentNotifications({ className = '', onNotificationClick }: IntelligentNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { getRecommendations, generateLearningPath, analyzeCode, isInitialized } = useSuperIntelligentAI();

  // Generate intelligent notifications based on user activity
  useEffect(() => {
    if (!isInitialized) return;

    const generateNotifications = async () => {
      try {
        // Generate learning recommendations
        const recommendations = await getRecommendations({
          completedCourses: [],
          currentSkills: ['JavaScript', 'React'],
          timeSpent: 0,
          lastActivity: new Date()
        });

        // Convert recommendations to notifications
        const newNotifications: Notification[] = recommendations.slice(0, 3).map((rec, index) => ({
          id: `rec-${index}`,
          type: 'recommendation' as const,
          title: `Nova Recomendação: ${rec.title}`,
          message: rec.description,
          action: {
            label: 'Ver Detalhes',
            onClick: () => console.log('View recommendation:', rec)
          },
          timestamp: new Date(),
          read: false,
          priority: rec.priority,
          category: 'learning' as const
        }));

        // Add system notifications
        const systemNotifications: Notification[] = [
          {
            id: 'welcome',
            type: 'info',
            title: 'Bem-vindo à IA Superinteligente!',
            message: 'Sua IA personalizada está pronta para te ajudar no aprendizado.',
            timestamp: new Date(),
            read: false,
            priority: 'high',
            category: 'system'
          },
          {
            id: 'tip-1',
            type: 'info',
            title: 'Dica: Use o Chat IA',
            message: 'Converse com a IA para tirar dúvidas e receber explicações personalizadas.',
            action: {
              label: 'Abrir Chat',
              onClick: () => console.log('Open chat')
            },
            timestamp: new Date(),
            read: false,
            priority: 'medium',
            category: 'learning'
          },
          {
            id: 'achievement-1',
            type: 'achievement',
            title: '🎉 Primeira Interação!',
            message: 'Você interagiu com a IA pela primeira vez. Continue assim!',
            timestamp: new Date(),
            read: false,
            priority: 'high',
            category: 'system'
          }
        ];

        setNotifications([...newNotifications, ...systemNotifications]);
      } catch (error) {
        console.error('Failed to generate notifications:', error);
      }
    };

    generateNotifications();
  }, [isInitialized, getRecommendations]);

  // Update unread count
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'recommendation': return <Star className="w-5 h-5 text-purple-500" />;
      case 'achievement': return <Award className="w-5 h-5 text-yellow-500" />;
      case 'reminder': return <Clock className="w-5 h-5 text-orange-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return <BookOpen className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'project': return <Target className="w-4 h-4" />;
      case 'career': return <TrendingUp className="w-4 h-4" />;
      case 'system': return <Brain className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notificações Inteligentes
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Marcar todas como lidas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    } hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors`}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                      onNotificationClick?.(notification);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {getCategoryIcon(notification.category)}
                            <span>{formatTimestamp(notification.timestamp)}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {notification.priority}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {notification.action && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notification.action?.onClick();
                                }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                              >
                                {notification.action.label}
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-xs text-gray-400 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{notifications.length} notificações</span>
              <span>{unreadCount} não lidas</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntelligentNotifications;


