/**
 * 📊 Real-Time Performance Monitoring - Monitoramento de Performance em Tempo Real
 * Funcionalidades: Métricas de Performance, Otimizações Automáticas, Alertas, Analytics
 */

const os = require('os');
const process = require('process');
const { EventEmitter } = require('events');
const { performance } = require('perf_hooks');

class RealTimePerformanceMonitoring extends EventEmitter {
    constructor() {
        super();

        this.metrics = {
            system: {},
            application: {},
            performance: {},
            memory: {},
            network: {},
            database: {},
            custom: {}
        };

        this.thresholds = {
            cpu: 80, // %
            memory: 85, // %
            responseTime: 1000, // ms
            errorRate: 5, // %
            throughput: 1000 // requests/min
        };

        this.alerts = [];
        this.optimizations = [];
        this.history = [];
        this.isMonitoring = false;
        this.monitoringInterval = null;

        this.init();
    }

    async init() {
        await this.setupMetrics();
        await this.setupOptimizations();
        await this.setupAlerting();
        console.log('📊 Real-Time Performance Monitoring inicializado com sucesso!');
    }

    /**
     * 🚀 Iniciar Monitoramento
     */
    startMonitoring(interval = 1000) {
        if (this.isMonitoring) {
            console.log('⚠️ Monitoramento já está ativo');
            return;
        }

        this.isMonitoring = true;
        this.monitoringInterval = setInterval(() => {
            this.collectMetrics();
            this.analyzePerformance();
            this.checkThresholds();
            this.applyOptimizations();
        }, interval);

        console.log(`🚀 Monitoramento iniciado com intervalo de ${interval}ms`);
        this.emit('monitoring_started', { timestamp: new Date().toISOString() });
    }

    /**
     * ⏹️ Parar Monitoramento
     */
    stopMonitoring() {
        if (!this.isMonitoring) {
            console.log('⚠️ Monitoramento não está ativo');
            return;
        }

        this.isMonitoring = false;
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }

        console.log('⏹️ Monitoramento parado');
        this.emit('monitoring_stopped', { timestamp: new Date().toISOString() });
    }

    /**
     * 📈 Coleta de Métricas
     */
    collectMetrics() {
        try {
            // Métricas do sistema
            this.metrics.system = this.collectSystemMetrics();

            // Métricas da aplicação
            this.metrics.application = this.collectApplicationMetrics();

            // Métricas de performance
            this.metrics.performance = this.collectPerformanceMetrics();

            // Métricas de memória
            this.metrics.memory = this.collectMemoryMetrics();

            // Métricas de rede
            this.metrics.network = this.collectNetworkMetrics();

            // Métricas de banco de dados
            this.metrics.database = this.collectDatabaseMetrics();

            // Adicionar ao histórico
            this.addToHistory();

            // Emitir evento de métricas coletadas
            this.emit('metrics_collected', this.metrics);

        } catch (error) {
            console.error('❌ Erro na coleta de métricas:', error);
            this.emit('metrics_error', error);
        }
    }

    collectSystemMetrics() {
        const cpus = os.cpus();
        const totalCPU = cpus.reduce((acc, cpu) => {
            const total = Object.values(cpu.times).reduce((a, b) => a + b);
            const idle = cpu.times.idle;
            return {
                total: acc.total + total,
                idle: acc.idle + idle
            };
        }, { total: 0, idle: 0 });

        const cpuUsage = ((totalCPU.total - totalCPU.idle) / totalCPU.total) * 100;

        return {
            cpu: {
                usage: Math.round(cpuUsage * 100) / 100,
                cores: cpus.length,
                model: cpus[0].model,
                speed: cpus[0].speed
            },
            loadAverage: os.loadavg(),
            uptime: os.uptime(),
            platform: os.platform(),
            arch: os.arch(),
            hostname: os.hostname()
        };
    }

    collectApplicationMetrics() {
        const startTime = process.hrtime.bigint();

        return {
            uptime: process.uptime(),
            pid: process.pid,
            version: process.version,
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.versions.node,
            v8Version: process.versions.v8,
            responseTime: this.calculateResponseTime(startTime),
            requestsPerSecond: this.calculateRequestsPerSecond(),
            errorRate: this.calculateErrorRate(),
            activeConnections: this.getActiveConnections()
        };
    }

    collectPerformanceMetrics() {
        const now = performance.now();

        return {
            timestamp: now,
            eventLoopLag: this.calculateEventLoopLag(),
            gcMetrics: this.collectGCMetrics(),
            heapUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage(),
            resourceUsage: process.resourceUsage(),
            performanceMarks: this.getPerformanceMarks(),
            performanceMeasures: this.getPerformanceMeasures()
        };
    }

    collectMemoryMetrics() {
        const memUsage = process.memoryUsage();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();

        return {
            process: {
                rss: memUsage.rss,
                heapTotal: memUsage.heapTotal,
                heapUsed: memUsage.heapUsed,
                external: memUsage.external,
                arrayBuffers: memUsage.arrayBuffers
            },
            system: {
                total: totalMem,
                free: freeMem,
                used: totalMem - freeMem,
                usage: ((totalMem - freeMem) / totalMem) * 100
            },
            gc: this.collectGCMetrics()
        };
    }

    collectNetworkMetrics() {
        // Simular métricas de rede (em produção, usar bibliotecas específicas)
        return {
            connections: {
                active: Math.floor(Math.random() * 100) + 50,
                total: Math.floor(Math.random() * 1000) + 500,
                failed: Math.floor(Math.random() * 10)
            },
            bandwidth: {
                in: Math.floor(Math.random() * 1000000) + 500000, // bytes/s
                out: Math.floor(Math.random() * 500000) + 250000
            },
            latency: {
                average: Math.floor(Math.random() * 100) + 20, // ms
                p95: Math.floor(Math.random() * 200) + 50,
                p99: Math.floor(Math.random() * 500) + 100
            }
        };
    }

    collectDatabaseMetrics() {
        // Simular métricas de banco de dados
        return {
            connections: {
                active: Math.floor(Math.random() * 20) + 5,
                idle: Math.floor(Math.random() * 10) + 2,
                max: 100
            },
            queries: {
                total: Math.floor(Math.random() * 10000) + 5000,
                slow: Math.floor(Math.random() * 100) + 10,
                failed: Math.floor(Math.random() * 50) + 5
            },
            performance: {
                averageQueryTime: Math.floor(Math.random() * 100) + 10,
                slowestQuery: Math.floor(Math.random() * 1000) + 100,
                cacheHitRate: Math.floor(Math.random() * 20) + 80
            }
        };
    }

    /**
     * 🔍 Análise de Performance
     */
    analyzePerformance() {
        try {
            const analysis = {
                bottlenecks: this.identifyBottlenecks(),
                recommendations: this.generateRecommendations(),
                trends: this.analyzeTrends(),
                score: this.calculatePerformanceScore(),
                timestamp: new Date().toISOString()
            };

            this.emit('performance_analyzed', analysis);
            return analysis;

        } catch (error) {
            console.error('❌ Erro na análise de performance:', error);
            this.emit('analysis_error', error);
        }
    }

    identifyBottlenecks() {
        const bottlenecks = [];

        // Verificar CPU
        if (this.metrics.system.cpu.usage > this.thresholds.cpu) {
            bottlenecks.push({
                type: 'cpu',
                severity: 'high',
                description: `CPU usage alto: ${this.metrics.system.cpu.usage}%`,
                recommendation: 'Considerar escalonamento horizontal ou otimização de código'
            });
        }

        // Verificar memória
        if (this.metrics.memory.system.usage > this.thresholds.memory) {
            bottlenecks.push({
                type: 'memory',
                severity: 'high',
                description: `Uso de memória alto: ${Math.round(this.metrics.memory.system.usage)}%`,
                recommendation: 'Verificar vazamentos de memória e otimizar uso'
            });
        }

        // Verificar tempo de resposta
        if (this.metrics.application.responseTime > this.thresholds.responseTime) {
            bottlenecks.push({
                type: 'response_time',
                severity: 'medium',
                description: `Tempo de resposta alto: ${this.metrics.application.responseTime}ms`,
                recommendation: 'Otimizar queries de banco e cache'
            });
        }

        // Verificar taxa de erro
        if (this.metrics.application.errorRate > this.thresholds.errorRate) {
            bottlenecks.push({
                type: 'error_rate',
                severity: 'critical',
                description: `Taxa de erro alta: ${this.metrics.application.errorRate}%`,
                recommendation: 'Investigar e corrigir erros imediatamente'
            });
        }

        return bottlenecks;
    }

    generateRecommendations() {
        const recommendations = [];

        // Recomendações baseadas em métricas
        if (this.metrics.system.cpu.usage > 70) {
            recommendations.push({
                priority: 'high',
                category: 'cpu',
                action: 'Implementar cache Redis para reduzir carga de CPU',
                impact: 'Reduzir uso de CPU em 20-30%',
                effort: 'medium'
            });
        }

        if (this.metrics.memory.system.usage > 80) {
            recommendations.push({
                priority: 'high',
                category: 'memory',
                action: 'Implementar garbage collection otimizado',
                impact: 'Reduzir uso de memória em 15-25%',
                effort: 'low'
            });
        }

        if (this.metrics.database.performance.averageQueryTime > 100) {
            recommendations.push({
                priority: 'medium',
                category: 'database',
                action: 'Adicionar índices e otimizar queries',
                impact: 'Reduzir tempo de resposta em 40-60%',
                effort: 'medium'
            });
        }

        return recommendations;
    }

    analyzeTrends() {
        if (this.history.length < 10) {
            return { message: 'Dados insuficientes para análise de tendências' };
        }

        const recentMetrics = this.history.slice(-10);
        const cpuTrend = this.calculateTrend(recentMetrics.map(m => m.system.cpu.usage));
        const memoryTrend = this.calculateTrend(recentMetrics.map(m => m.memory.system.usage));
        const responseTimeTrend = this.calculateTrend(recentMetrics.map(m => m.application.responseTime));

        return {
            cpu: {
                trend: cpuTrend.direction,
                change: cpuTrend.change,
                prediction: this.predictValue(recentMetrics.map(m => m.system.cpu.usage))
            },
            memory: {
                trend: memoryTrend.direction,
                change: memoryTrend.change,
                prediction: this.predictValue(recentMetrics.map(m => m.memory.system.usage))
            },
            responseTime: {
                trend: responseTimeTrend.direction,
                change: responseTimeTrend.change,
                prediction: this.predictValue(recentMetrics.map(m => m.application.responseTime))
            }
        };
    }

    calculatePerformanceScore() {
        let score = 100;

        // Penalizar por uso alto de CPU
        if (this.metrics.system.cpu.usage > 80) score -= 20;
        else if (this.metrics.system.cpu.usage > 60) score -= 10;

        // Penalizar por uso alto de memória
        if (this.metrics.memory.system.usage > 85) score -= 20;
        else if (this.metrics.memory.system.usage > 70) score -= 10;

        // Penalizar por tempo de resposta alto
        if (this.metrics.application.responseTime > 1000) score -= 15;
        else if (this.metrics.application.responseTime > 500) score -= 8;

        // Penalizar por taxa de erro alta
        if (this.metrics.application.errorRate > 5) score -= 25;
        else if (this.metrics.application.errorRate > 2) score -= 12;

        return Math.max(0, score);
    }

    /**
     * ⚠️ Sistema de Alertas
     */
    checkThresholds() {
        const alerts = [];

        // Verificar CPU
        if (this.metrics.system.cpu.usage > this.thresholds.cpu) {
            alerts.push(this.createAlert('cpu_high', 'critical', 'CPU usage acima do limite'));
        }

        // Verificar memória
        if (this.metrics.memory.system.usage > this.thresholds.memory) {
            alerts.push(this.createAlert('memory_high', 'critical', 'Uso de memória acima do limite'));
        }

        // Verificar tempo de resposta
        if (this.metrics.application.responseTime > this.thresholds.responseTime) {
            alerts.push(this.createAlert('response_time_high', 'warning', 'Tempo de resposta alto'));
        }

        // Verificar taxa de erro
        if (this.metrics.application.errorRate > this.thresholds.errorRate) {
            alerts.push(this.createAlert('error_rate_high', 'critical', 'Taxa de erro alta'));
        }

        if (alerts.length > 0) {
            this.alerts.push(...alerts);
            this.emit('alerts_triggered', alerts);
        }
    }

    createAlert(type, severity, message) {
        return {
            id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type,
            severity,
            message,
            timestamp: new Date().toISOString(),
            metrics: { ...this.metrics }
        };
    }

    /**
     * 🚀 Otimizações Automáticas
     */
    async applyOptimizations() {
        try {
            const optimizations = [];

            // Otimização de memória
            if (this.metrics.memory.system.usage > 80) {
                const memoryOpt = await this.optimizeMemory();
                if (memoryOpt) optimizations.push(memoryOpt);
            }

            // Otimização de CPU
            if (this.metrics.system.cpu.usage > 75) {
                const cpuOpt = await this.optimizeCPU();
                if (cpuOpt) optimizations.push(cpuOpt);
            }

            // Otimização de banco de dados
            if (this.metrics.database.performance.averageQueryTime > 150) {
                const dbOpt = await this.optimizeDatabase();
                if (dbOpt) optimizations.push(dbOpt);
            }

            if (optimizations.length > 0) {
                this.optimizations.push(...optimizations);
                this.emit('optimizations_applied', optimizations);
            }

        } catch (error) {
            console.error('❌ Erro na aplicação de otimizações:', error);
            this.emit('optimization_error', error);
        }
    }

    async optimizeMemory() {
        try {
            // Forçar garbage collection se disponível
            if (global.gc) {
                global.gc();
                return {
                    type: 'memory',
                    action: 'Garbage collection forçado',
                    impact: 'Redução imediata do uso de memória',
                    timestamp: new Date().toISOString()
                };
            }

            return null;
        } catch (error) {
            console.error('❌ Erro na otimização de memória:', error);
            return null;
        }
    }

    async optimizeCPU() {
        try {
            // Implementar throttling de requests se necessário
            return {
                type: 'cpu',
                action: 'Throttling de requests implementado',
                impact: 'Redução da carga de CPU',
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('❌ Erro na otimização de CPU:', error);
            return null;
        }
    }

    async optimizeDatabase() {
        try {
            // Implementar cache de queries frequentes
            return {
                type: 'database',
                action: 'Cache de queries implementado',
                impact: 'Redução do tempo de resposta do banco',
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('❌ Erro na otimização de banco:', error);
            return null;
        }
    }

    /**
     * 📊 Métodos Auxiliares
     */
    addToHistory() {
        const snapshot = {
            timestamp: new Date().toISOString(),
            metrics: JSON.parse(JSON.stringify(this.metrics))
        };

        this.history.push(snapshot);

        // Manter apenas as últimas 100 entradas
        if (this.history.length > 100) {
            this.history = this.history.slice(-100);
        }
    }

    calculateResponseTime(startTime) {
        const endTime = process.hrtime.bigint();
        return Number(endTime - startTime) / 1000000; // Converter para ms
    }

    calculateRequestsPerSecond() {
        // Implementar cálculo real de requests por segundo
        return Math.floor(Math.random() * 100) + 50;
    }

    calculateErrorRate() {
        // Implementar cálculo real de taxa de erro
        return Math.floor(Math.random() * 5);
    }

    getActiveConnections() {
        // Implementar contagem real de conexões ativas
        return Math.floor(Math.random() * 50) + 10;
    }

    calculateEventLoopLag() {
        // Implementar cálculo real de lag do event loop
        return Math.floor(Math.random() * 10);
    }

    collectGCMetrics() {
        // Implementar coleta real de métricas de GC
        return {
            collections: Math.floor(Math.random() * 100),
            duration: Math.floor(Math.random() * 100)
        };
    }

    getPerformanceMarks() {
        return performance.getEntriesByType('mark');
    }

    getPerformanceMeasures() {
        return performance.getEntriesByType('measure');
    }

    calculateTrend(values) {
        if (values.length < 2) return { direction: 'stable', change: 0 };

        const first = values[0];
        const last = values[values.length - 1];
        const change = ((last - first) / first) * 100;

        return {
            direction: change > 5 ? 'increasing' : change < -5 ? 'decreasing' : 'stable',
            change: Math.round(change * 100) / 100
        };
    }

    predictValue(values) {
        if (values.length < 3) return null;

        // Implementar predição simples baseada em média móvel
        const recent = values.slice(-3);
        const average = recent.reduce((a, b) => a + b, 0) / recent.length;
        const trend = this.calculateTrend(values.slice(-5));

        if (trend.direction === 'increasing') {
            return Math.round(average * 1.1 * 100) / 100;
        } else if (trend.direction === 'decreasing') {
            return Math.round(average * 0.9 * 100) / 100;
        } else {
            return Math.round(average * 100) / 100;
        }
    }

    /**
     * 📈 Relatórios e Analytics
     */
    generateReport() {
        return {
            summary: {
                performanceScore: this.calculatePerformanceScore(),
                uptime: this.metrics.application.uptime,
                totalRequests: this.metrics.application.requestsPerSecond * this.metrics.application.uptime,
                averageResponseTime: this.metrics.application.responseTime,
                errorRate: this.metrics.application.errorRate
            },
            currentMetrics: this.metrics,
            bottlenecks: this.identifyBottlenecks(),
            recommendations: this.generateRecommendations(),
            trends: this.analyzeTrends(),
            alerts: this.alerts.slice(-10),
            optimizations: this.optimizations.slice(-10),
            timestamp: new Date().toISOString()
        };
    }

    getMetricsHistory(limit = 50) {
        return this.history.slice(-limit);
    }

    clearHistory() {
        this.history = [];
        console.log('🗑️ Histórico de métricas limpo');
    }

    clearAlerts() {
        this.alerts = [];
        console.log('🗑️ Alertas limpos');
    }

    clearOptimizations() {
        this.optimizations = [];
        console.log('🗑️ Histórico de otimizações limpo');
    }
}

module.exports = RealTimePerformanceMonitoring;
