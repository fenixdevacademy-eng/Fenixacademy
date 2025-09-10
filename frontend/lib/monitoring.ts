// Serviço de monitoramento e métricas
export interface SystemMetrics {
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
    load: number[];
  };
  database: {
    connections: number;
    queries: number;
    responseTime: number;
  };
  api: {
    requests: number;
    errors: number;
    responseTime: number;
  };
  cache: {
    hits: number;
    misses: number;
    hitRate: number;
  };
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: boolean;
    api: boolean;
    cache: boolean;
    external: boolean;
  };
  metrics: SystemMetrics;
  uptime: string;
  version: string;
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
  service: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export class MonitoringService {
  private static startTime = Date.now();
  private static metrics: SystemMetrics[] = [];
  private static alerts: Alert[] = [];

  static getSystemMetrics(): SystemMetrics {
    const now = Date.now();
    const uptime = now - this.startTime;

    return {
      timestamp: new Date().toISOString(),
      uptime: uptime,
      memory: {
        used: this.getMemoryUsage(),
        total: this.getTotalMemory(),
        percentage: this.getMemoryPercentage()
      },
      cpu: {
        usage: this.getCpuUsage(),
        load: this.getCpuLoad()
      },
      database: {
        connections: this.getDatabaseConnections(),
        queries: this.getDatabaseQueries(),
        responseTime: this.getDatabaseResponseTime()
      },
      api: {
        requests: this.getApiRequests(),
        errors: this.getApiErrors(),
        responseTime: this.getApiResponseTime()
      },
      cache: {
        hits: this.getCacheHits(),
        misses: this.getCacheMisses(),
        hitRate: this.getCacheHitRate()
      }
    };
  }

  static getHealthCheck(): HealthCheck {
    const metrics = this.getSystemMetrics();
    const services = this.checkServices();
    const status = this.determineHealthStatus(services);

    return {
      status,
      timestamp: new Date().toISOString(),
      services,
      metrics,
      uptime: this.formatUptime(metrics.uptime),
      version: process.env.npm_package_version || '1.0.0'
    };
  }

  static addAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'resolved'>): Alert {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      resolved: false
    };

    this.alerts.push(newAlert);
    return newAlert;
  }

  static getAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  static resolveAlert(id: string): boolean {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.resolved = true;
      return true;
    }
    return false;
  }

  static getMetricsHistory(hours: number = 24): SystemMetrics[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return this.metrics.filter(m => new Date(m.timestamp).getTime() > cutoff);
  }

  static recordMetric(metric: SystemMetrics): void {
    this.metrics.push(metric);
    
    // Manter apenas as últimas 1000 métricas
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  private static getMemoryUsage(): number {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed;
    }
    return Math.floor(Math.random() * 100000000); // Simulação
  }

  private static getTotalMemory(): number {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapTotal;
    }
    return 200000000; // Simulação
  }

  private static getMemoryPercentage(): number {
    const used = this.getMemoryUsage();
    const total = this.getTotalMemory();
    return Math.round((used / total) * 100);
  }

  private static getCpuUsage(): number {
    return Math.round(Math.random() * 100 * 100) / 100; // Simulação
  }

  private static getCpuLoad(): number[] {
    return [Math.random(), Math.random(), Math.random()]; // Simulação
  }

  private static getDatabaseConnections(): number {
    return Math.floor(Math.random() * 20) + 5; // Simulação
  }

  private static getDatabaseQueries(): number {
    return Math.floor(Math.random() * 1000) + 100; // Simulação
  }

  private static getDatabaseResponseTime(): number {
    return Math.round(Math.random() * 100 + 10); // Simulação
  }

  private static getApiRequests(): number {
    return Math.floor(Math.random() * 5000) + 1000; // Simulação
  }

  private static getApiErrors(): number {
    return Math.floor(Math.random() * 50); // Simulação
  }

  private static getApiResponseTime(): number {
    return Math.round(Math.random() * 200 + 50); // Simulação
  }

  private static getCacheHits(): number {
    return Math.floor(Math.random() * 800) + 200; // Simulação
  }

  private static getCacheMisses(): number {
    return Math.floor(Math.random() * 200) + 50; // Simulação
  }

  private static getCacheHitRate(): number {
    const hits = this.getCacheHits();
    const misses = this.getCacheMisses();
    return Math.round((hits / (hits + misses)) * 100);
  }

  private static checkServices(): HealthCheck['services'] {
    return {
      database: this.checkDatabase(),
      api: this.checkApi(),
      cache: this.checkCache(),
      external: this.checkExternalServices()
    };
  }

  private static checkDatabase(): boolean {
    // Simulação de verificação do banco
    return Math.random() > 0.1; // 90% de chance de estar saudável
  }

  private static checkApi(): boolean {
    // Simulação de verificação da API
    return Math.random() > 0.05; // 95% de chance de estar saudável
  }

  private static checkCache(): boolean {
    // Simulação de verificação do cache
    return Math.random() > 0.02; // 98% de chance de estar saudável
  }

  private static checkExternalServices(): boolean {
    // Simulação de verificação de serviços externos
    return Math.random() > 0.15; // 85% de chance de estar saudável
  }

  private static determineHealthStatus(services: HealthCheck['services']): HealthCheck['status'] {
    const healthyServices = Object.values(services).filter(Boolean).length;
    const totalServices = Object.keys(services).length;

    if (healthyServices === totalServices) return 'healthy';
    if (healthyServices >= totalServices * 0.8) return 'degraded';
    return 'unhealthy';
  }

  private static formatUptime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}
