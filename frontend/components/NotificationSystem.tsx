'use client';

import React from 'react';
import { useNotifications, Notification } from '@/lib/fenix-button-actions';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface NotificationSystemProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    maxNotifications?: number;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
    position = 'top-right',
    maxNotifications = 5
}) => {
    const { notifications, removeNotification } = useNotifications();

    const getPositionClasses = () => {
        switch (position) {
            case 'top-left':
                return 'fixed top-4 left-4 z-50 space-y-2';
            case 'bottom-right':
                return 'fixed bottom-4 right-4 z-50 space-y-2';
            case 'bottom-left':
                return 'fixed bottom-4 left-4 z-50 space-y-2';
            default:
                return 'fixed top-4 right-4 z-50 space-y-2';
        }
    }

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-400" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
            case 'info':
            default:
                return <Info className="w-5 h-5 text-blue-400" />;
        }
    }

    const getNotificationStyles = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'bg-green-900/90 border-green-500 text-white';
            case 'error':
                return 'bg-red-900/90 border-red-500 text-white';
            case 'warning':
                return 'bg-yellow-900/90 border-yellow-500 text-white';
            case 'info':
            default:
                return 'bg-blue-900/90 border-blue-500 text-white';
        }
    }

    const displayedNotifications = notifications.slice(0, maxNotifications);

    if (displayedNotifications.length === 0) {
        return null;
    }

    return (
        <div className={getPositionClasses()}>
            {displayedNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 rounded-lg shadow-lg max-w-sm border-l-4 backdrop-blur-sm ${getNotificationStyles(notification.type)}`}
                >
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                            <p className="text-xs opacity-70 mt-2">
                                {notification.timestamp.toLocaleTimeString()}
                            </p>
                        </div>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NotificationSystem;