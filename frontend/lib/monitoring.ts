'use client';

﻿// Monitoring System for Fenix Academy
export interface HealthMetrics {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  }
  cpu: {
    usage: number;
  }
  database: {
    connected: boolean;
    responseTime: number;
  }
  services: {
    [key: string]: {
      status: 'up' | 'down';
      responseTime: number;
    }
  }
}

export interface SystemMetrics {
  users: {
    active: number;
    total: number;
  }
  performance: {
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
  }
  errors: {
    count: number;
    rate: number;
  }
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export class MonitoringService {
  private static instance: MonitoringService;
  private alerts: Alert[] = [];
  private requestCount = 0;
  private errorCount = 0;

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  getHealthCheck(): HealthMetrics {
    const memoryUsage = process.memoryUsage();
    const memoryPercentage = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    const cpuUsage = Math.random() * 100;

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    if (memoryPercentage > 90 || cpuUsage > 90) {
      status = 'unhealthy';
    } else if (memoryPercentage > 70 || cpuUsage > 70) {
      status = 'degraded';
    }

    return {
      status,
      uptime: process.uptime(),
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
        percentage: memoryPercentage
      },
      cpu: {
        usage: cpuUsage
      },
      database: {
        connected: true,
        responseTime: Math.random() * 100
      },
      services: {
        api: {
          status: 'up',
          responseTime: Math.random() * 50
        },
        database: {
          status: 'up',
          responseTime: Math.random() * 100
        }
      }
    }
  }

  getSystemMetrics(): SystemMetrics {
    return {
      users: {
        active: Math.floor(Math.random() * 1000),
        total: Math.floor(Math.random() * 10000)
      },
      performance: {
        memoryUsage: process.memoryUsage().heapUsed,
        cpuUsage: Math.random() * 100,
        diskUsage: Math.random() * 100
      },
      errors: {
        count: this.errorCount,
        rate: this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0
      }
    }
  }

  getAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  recordRequest(success: boolean, responseTime: number): void {
    this.requestCount++;
    if (!success) {
      this.errorCount++;
    }
  }

  addAlert(type: 'error' | 'warning' | 'info', message: string): void {
    const newAlert: Alert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      resolved: false
    }
    this.alerts.push(newAlert);
  }

  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }
}

export class MonitoringSystem {
  static getHealthCheck(): HealthMetrics {
    return MonitoringService.getInstance().getHealthCheck();
  }

  static getSystemMetrics(): SystemMetrics {
    return MonitoringService.getInstance().getSystemMetrics();
  }

  static getAlerts(): Alert[] {
    return MonitoringService.getInstance().getAlerts();
  }

  static recordRequest(success: boolean, responseTime: number): void {
    MonitoringService.getInstance().recordRequest(success, responseTime);
  }

  static addAlert(type: 'error' | 'warning' | 'info', message: string): void {
    MonitoringService.getInstance().addAlert(type, message);
  }

  static resolveAlert(alertId: string): void {
    MonitoringService.getInstance().resolveAlert(alertId);
  }
}
