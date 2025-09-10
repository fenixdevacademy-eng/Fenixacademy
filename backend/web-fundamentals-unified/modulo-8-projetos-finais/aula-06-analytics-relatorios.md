# Aula 6: Analytics e Relatórios

## Objetivos da Aula
- Implementar sistema completo de analytics e métricas
- Criar dashboards interativos com gráficos
- Desenvolver relatórios automatizados
- Integrar com ferramentas de BI

## Estrutura do Sistema

### 1. Modelo de Analytics
```typescript
// src/types/Analytics.ts
interface AnalyticsEvent {
  id: string;
  userId?: string;
  sessionId: string;
  event: string;
  category: 'user' | 'product' | 'order' | 'payment' | 'marketing';
  properties: Record<string, any>;
  timestamp: Date;
  page: string;
  referrer?: string;
  userAgent: string;
  ip: string;
}

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  dimensions: Record<string, string>;
  timestamp: Date;
  period: 'hour' | 'day' | 'week' | 'month' | 'year';
}

interface AnalyticsReport {
  id: string;
  name: string;
  type: 'dashboard' | 'summary' | 'detailed';
  metrics: string[];
  filters: Record<string, any>;
  period: {
    start: Date;
    end: Date;
  };
  generatedAt: Date;
  data: any;
}
```

### 2. Serviço de Analytics
```typescript
// src/services/analyticsService.ts
export class AnalyticsService {
  private eventQueue: AnalyticsEvent[] = [];
  private batchSize = 100;
  private flushInterval = 5000; // 5 segundos

  constructor() {
    this.startBatchProcessor();
  }

  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      id: generateId(),
      timestamp: new Date()
    };

    this.eventQueue.push(analyticsEvent);

    // Processar imediatamente se a fila estiver cheia
    if (this.eventQueue.length >= this.batchSize) {
      await this.flushEvents();
    }
  }

  private startBatchProcessor(): void {
    setInterval(async () => {
      if (this.eventQueue.length > 0) {
        await this.flushEvents();
      }
    }, this.flushInterval);
  }

  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const eventsToProcess = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await AnalyticsEvent.insertMany(eventsToProcess);
      await this.processEvents(eventsToProcess);
    } catch (error) {
      console.error('Erro ao processar eventos:', error);
      // Recolocar eventos na fila em caso de erro
      this.eventQueue.unshift(...eventsToProcess);
    }
  }

  private async processEvents(events: AnalyticsEvent[]): Promise<void> {
    // Agregar métricas em tempo real
    const metrics = this.aggregateMetrics(events);
    await AnalyticsMetric.insertMany(metrics);
  }

  private aggregateMetrics(events: AnalyticsEvent[]): AnalyticsMetric[] {
    const metrics: AnalyticsMetric[] = [];
    const now = new Date();

    // Contar eventos por categoria
    const categoryCounts = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});

    Object.entries(categoryCounts).forEach(([category, count]) => {
      metrics.push({
        id: generateId(),
        name: 'events_count',
        value: count as number,
        dimensions: { category },
        timestamp: now,
        period: 'hour'
      });
    });

    return metrics;
  }

  async getMetrics(metricName: string, filters: any, period: string): Promise<any[]> {
    const query: any = { name: metricName };
    
    if (filters.start && filters.end) {
      query.timestamp = {
        $gte: filters.start,
        $lte: filters.end
      };
    }

    if (filters.dimensions) {
      Object.entries(filters.dimensions).forEach(([key, value]) => {
        query[`dimensions.${key}`] = value;
      });
    }

    return await AnalyticsMetric.find(query).sort({ timestamp: 1 });
  }

  async generateReport(reportConfig: any): Promise<AnalyticsReport> {
    const { name, type, metrics, filters, period } = reportConfig;
    
    const data = await Promise.all(
      metrics.map(async (metric: string) => {
        const metricData = await this.getMetrics(metric, filters, period.period);
        return {
          metric,
          data: metricData
        };
      })
    );

    const report: AnalyticsReport = {
      id: generateId(),
      name,
      type,
      metrics,
      filters,
      period,
      generatedAt: new Date(),
      data
    };

    await AnalyticsReport.create(report);
    return report;
  }
}
```

## Dashboard de Analytics

### 1. Componente Principal
```typescript
// src/components/analytics/AnalyticsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    conversionRate: 0
  });
  const [charts, setCharts] = useState({
    salesOverTime: null,
    topProducts: null,
    userAcquisition: null,
    revenueByCategory: null
  });

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      const [metricsRes, salesRes, productsRes, usersRes, revenueRes] = await Promise.all([
        fetch('/api/analytics/metrics'),
        fetch('/api/analytics/sales-over-time'),
        fetch('/api/analytics/top-products'),
        fetch('/api/analytics/user-acquisition'),
        fetch('/api/analytics/revenue-by-category')
      ]);

      setMetrics(await metricsRes.json());
      setCharts({
        salesOverTime: await salesRes.json(),
        topProducts: await productsRes.json(),
        userAcquisition: await usersRes.json(),
        revenueByCategory: await revenueRes.json()
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <div className="date-range-picker">
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({
              ...dateRange,
              start: new Date(e.target.value)
            })}
          />
          <span>até</span>
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({
              ...dateRange,
              end: new Date(e.target.value)
            })}
          />
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{metrics.totalUsers.toLocaleString()}</h3>
            <p>Usuários Totais</p>
            <span className="metric-change positive">+12%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>{metrics.totalOrders.toLocaleString()}</h3>
            <p>Pedidos Totais</p>
            <span className="metric-change positive">+8%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>R$ {metrics.totalRevenue.toLocaleString()}</h3>
            <p>Receita Total</p>
            <span className="metric-change positive">+15%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>{metrics.conversionRate.toFixed(2)}%</h3>
            <p>Taxa de Conversão</p>
            <span className="metric-change negative">-2%</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Vendas ao Longo do Tempo</h3>
          {charts.salesOverTime && (
            <Line
              data={charts.salesOverTime}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }}
            />
          )}
        </div>

        <div className="chart-container">
          <h3>Produtos Mais Vendidos</h3>
          {charts.topProducts && (
            <Bar
              data={charts.topProducts}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }}
            />
          )}
        </div>

        <div className="chart-container">
          <h3>Aquisição de Usuários</h3>
          {charts.userAcquisition && (
            <Doughnut
              data={charts.userAcquisition}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          )}
        </div>

        <div className="chart-container">
          <h3>Receita por Categoria</h3>
          {charts.revenueByCategory && (
            <Pie
              data={charts.revenueByCategory}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
```

### 2. Componente de Métricas
```typescript
// src/components/analytics/MetricsCard.tsx
import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  description?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      default: return '→';
    }
  };

  return (
    <div className="metrics-card">
      <div className="metrics-header">
        <div className="metrics-icon">
          {icon && <span className="icon">{icon}</span>}
        </div>
        <div className="metrics-title">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      
      <div className="metrics-value">
        <span className="value">{value}</span>
        {change !== undefined && (
          <span 
            className="change"
            style={{ color: getChangeColor() }}
          >
            {getChangeIcon()} {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
```

## Relatórios Automatizados

### 1. Gerador de Relatórios
```typescript
// src/services/reportService.ts
export class ReportService {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  async generateDailyReport(): Promise<AnalyticsReport> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reportConfig = {
      name: 'Relatório Diário',
      type: 'summary',
      metrics: [
        'total_users',
        'total_orders',
        'total_revenue',
        'conversion_rate',
        'average_order_value'
      ],
      filters: {
        start: yesterday,
        end: today
      },
      period: {
        start: yesterday,
        end: today,
        period: 'day'
      }
    };

    return await this.analyticsService.generateReport(reportConfig);
  }

  async generateWeeklyReport(): Promise<AnalyticsReport> {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const reportConfig = {
      name: 'Relatório Semanal',
      type: 'detailed',
      metrics: [
        'total_users',
        'total_orders',
        'total_revenue',
        'conversion_rate',
        'average_order_value',
        'top_products',
        'user_acquisition_sources'
      ],
      filters: {
        start: weekAgo,
        end: new Date()
      },
      period: {
        start: weekAgo,
        end: new Date(),
        period: 'week'
      }
    };

    return await this.analyticsService.generateReport(reportConfig);
  }

  async generateMonthlyReport(): Promise<AnalyticsReport> {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const reportConfig = {
      name: 'Relatório Mensal',
      type: 'detailed',
      metrics: [
        'total_users',
        'total_orders',
        'total_revenue',
        'conversion_rate',
        'average_order_value',
        'top_products',
        'user_acquisition_sources',
        'revenue_by_category',
        'customer_lifetime_value'
      ],
      filters: {
        start: monthAgo,
        end: new Date()
      },
      period: {
        start: monthAgo,
        end: new Date(),
        period: 'month'
      }
    };

    return await this.analyticsService.generateReport(reportConfig);
  }

  async scheduleReports(): Promise<void> {
    // Agendar relatório diário às 8h
    cron.schedule('0 8 * * *', async () => {
      const report = await this.generateDailyReport();
      await this.sendReportEmail(report, 'daily');
    });

    // Agendar relatório semanal às segundas às 9h
    cron.schedule('0 9 * * 1', async () => {
      const report = await this.generateWeeklyReport();
      await this.sendReportEmail(report, 'weekly');
    });

    // Agendar relatório mensal no dia 1 às 10h
    cron.schedule('0 10 1 * *', async () => {
      const report = await this.generateMonthlyReport();
      await this.sendReportEmail(report, 'monthly');
    });
  }

  private async sendReportEmail(report: AnalyticsReport, type: string): Promise<void> {
    const emailService = new EmailService();
    
    const subject = `Relatório ${type === 'daily' ? 'Diário' : type === 'weekly' ? 'Semanal' : 'Mensal'} - ${new Date().toLocaleDateString('pt-BR')}`;
    
    const html = this.generateReportHTML(report);
    
    // Enviar para administradores
    const admins = await User.find({ role: 'admin' });
    const adminEmails = admins.map(admin => admin.email);
    
    await emailService.sendBulkEmail(adminEmails, {
      title: subject,
      message: html,
      type: 'system'
    });
  }

  private generateReportHTML(report: AnalyticsReport): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h1>${report.name}</h1>
        <p>Período: ${report.period.start.toLocaleDateString('pt-BR')} - ${report.period.end.toLocaleDateString('pt-BR')}</p>
        
        <div style="margin: 20px 0;">
          ${report.data.map(metric => `
            <div style="background-color: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px;">
              <h3>${metric.metric}</h3>
              <p>Valor: ${metric.data[0]?.value || 'N/A'}</p>
            </div>
          `).join('')}
        </div>
        
        <p style="font-size: 12px; color: #666;">
          Relatório gerado automaticamente em ${report.generatedAt.toLocaleString('pt-BR')}
        </p>
      </div>
    `;
  }
}
```

## API de Analytics

### 1. Rotas de Analytics
```javascript
// routes/analytics.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');

// Middleware para verificar se é admin
router.use(authenticateToken);
router.use(requireRole(['admin', 'moderator']));

// Métricas gerais
router.get('/metrics', async (req, res) => {
  try {
    const { start, end } = req.query;
    
    const filters = {};
    if (start && end) {
      filters.start = new Date(start);
      filters.end = new Date(end);
    }

    const [totalUsers, totalOrders, totalRevenue, conversionRate] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(filters),
      Order.aggregate([
        { $match: filters },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      calculateConversionRate(filters)
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      conversionRate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vendas ao longo do tempo
router.get('/sales-over-time', async (req, res) => {
  try {
    const { start, end, period = 'day' } = req.query;
    
    const matchStage = {};
    if (start && end) {
      matchStage.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    const groupStage = {
      _id: {
        $dateToString: {
          format: period === 'day' ? '%Y-%m-%d' : '%Y-%m',
          date: '$createdAt'
        }
      },
      total: { $sum: '$total' },
      count: { $sum: 1 }
    };

    const salesData = await Order.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: { _id: 1 } }
    ]);

    const chartData = {
      labels: salesData.map(item => item._id),
      datasets: [
        {
          label: 'Vendas',
          data: salesData.map(item => item.total),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }
      ]
    };

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Produtos mais vendidos
router.get('/top-products', async (req, res) => {
  try {
    const { start, end, limit = 10 } = req.query;
    
    const matchStage = {};
    if (start && end) {
      matchStage.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    const topProducts = await Order.aggregate([
      { $match: matchStage },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.id',
          name: { $first: '$items.name' },
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: parseInt(limit) }
    ]);

    const chartData = {
      labels: topProducts.map(item => item.name),
      datasets: [
        {
          label: 'Quantidade Vendida',
          data: topProducts.map(item => item.totalSold),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ]
        }
      ]
    };

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aquisição de usuários
router.get('/user-acquisition', async (req, res) => {
  try {
    const { start, end } = req.query;
    
    const matchStage = {};
    if (start && end) {
      matchStage.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    const acquisitionData = await User.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$acquisitionSource',
          count: { $sum: 1 }
        }
      }
    ]);

    const chartData = {
      labels: acquisitionData.map(item => item._id || 'Direto'),
      datasets: [
        {
          data: acquisitionData.map(item => item.count),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }
      ]
    };

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Receita por categoria
router.get('/revenue-by-category', async (req, res) => {
  try {
    const { start, end } = req.query;
    
    const matchStage = {};
    if (start && end) {
      matchStage.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    const revenueData = await Order.aggregate([
      { $match: matchStage },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      }
    ]);

    const chartData = {
      labels: revenueData.map(item => item._id),
      datasets: [
        {
          data: revenueData.map(item => item.totalRevenue),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }
      ]
    };

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exportar relatório
router.post('/export', async (req, res) => {
  try {
    const { type, format, start, end } = req.body;
    
    const reportService = new ReportService();
    let report;
    
    switch (type) {
      case 'daily':
        report = await reportService.generateDailyReport();
        break;
      case 'weekly':
        report = await reportService.generateWeeklyReport();
        break;
      case 'monthly':
        report = await reportService.generateMonthlyReport();
        break;
      default:
        throw new Error('Tipo de relatório não suportado');
    }
    
    if (format === 'csv') {
      const csv = generateCSV(report);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="relatorio-${type}.csv"`);
      res.send(csv);
    } else if (format === 'pdf') {
      const pdf = await generatePDF(report);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="relatorio-${type}.pdf"`);
      res.send(pdf);
    } else {
      res.json(report);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Integração com Ferramentas de BI

### 1. Integração com Google Analytics
```typescript
// src/services/googleAnalyticsService.ts
export class GoogleAnalyticsService {
  private measurementId: string;
  private apiSecret: string;

  constructor() {
    this.measurementId = process.env.GA_MEASUREMENT_ID;
    this.apiSecret = process.env.GA_API_SECRET;
  }

  async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const payload = {
        client_id: event.sessionId,
        events: [
          {
            name: event.event,
            params: {
              event_category: event.category,
              event_label: event.page,
              value: event.properties.value || 0,
              ...event.properties
            }
          }
        ]
      };

      await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Erro ao enviar evento para Google Analytics:', error);
    }
  }

  async getReportData(startDate: string, endDate: string): Promise<any> {
    try {
      const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${this.measurementId}:runReport`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dateRanges: [
            {
              startDate,
              endDate
            }
          ],
          metrics: [
            { name: 'sessions' },
            { name: 'users' },
            { name: 'pageviews' }
          ],
          dimensions: [
            { name: 'date' }
          ]
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar dados do Google Analytics:', error);
      throw error;
    }
  }

  private async getAccessToken(): Promise<string> {
    // Implementar autenticação OAuth2
    // Retornar access token
    return 'access_token';
  }
}
```

## Testes

### 1. Testes de Analytics
```typescript
// tests/analytics.test.ts
import request from 'supertest';
import app from '../app';

describe('Analytics', () => {
  test('should track event', async () => {
    const event = {
      sessionId: 'test-session',
      event: 'page_view',
      category: 'user',
      properties: { page: '/home' },
      page: '/home',
      userAgent: 'test-agent',
      ip: '127.0.0.1'
    };

    const response = await request(app)
      .post('/api/analytics/track')
      .send(event)
      .expect(200);

    expect(response.body.success).toBe(true);
  });

  test('should get metrics', async () => {
    const response = await request(app)
      .get('/api/analytics/metrics')
      .expect(200);

    expect(response.body.totalUsers).toBeDefined();
    expect(response.body.totalOrders).toBeDefined();
    expect(response.body.totalRevenue).toBeDefined();
  });

  test('should generate report', async () => {
    const reportConfig = {
      name: 'Test Report',
      type: 'summary',
      metrics: ['total_users', 'total_orders'],
      filters: {},
      period: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
        period: 'week'
      }
    };

    const response = await request(app)
      .post('/api/analytics/reports')
      .send(reportConfig)
      .expect(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('Test Report');
  });
});
```

## Exercícios Práticos

### 1. Segmentação Avançada
- Análise de coorte
- Segmentação comportamental
- Predição de churn

### 2. A/B Testing
- Testes de conversão
- Análise estatística
- Relatórios de resultados

### 3. Machine Learning
- Recomendações personalizadas
- Predição de vendas
- Detecção de anomalias

## Próximos Passos

1. **Projeto Final**: Implementar todas as funcionalidades
2. **Deploy**: Colocar em produção
3. **Monitoramento**: Configurar alertas e métricas

## Recursos Adicionais

- [Chart.js](https://www.chartjs.org/)
- [Google Analytics](https://analytics.google.com/)
- [Mixpanel](https://mixpanel.com/)
- [Amplitude](https://amplitude.com/)

---

**Tempo estimado**: 5-6 horas
**Dificuldade**: Avançado
**Pré-requisitos**: Aulas 1-5 do Módulo 8







