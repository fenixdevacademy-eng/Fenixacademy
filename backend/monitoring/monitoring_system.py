#!/usr/bin/env python3
"""
Sistema de Monitoramento - Fenix Academy
Monitoramento completo para produção com métricas, alertas e dashboards
"""

import asyncio
import json
import logging
import time
import psutil
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Callable
from dataclasses import dataclass, asdict
from enum import Enum
from collections import defaultdict, deque
import threading
import queue

from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.responses import JSONResponse
import prometheus_client
from prometheus_client import Counter, Histogram, Gauge, Summary, generate_latest
import redis
import structlog

# Configuração de logging estruturado
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

class MetricType(Enum):
    COUNTER = "counter"
    GAUGE = "gauge"
    HISTOGRAM = "histogram"
    SUMMARY = "summary"

class AlertLevel(Enum):
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"

@dataclass
class MetricData:
    name: str
    value: float
    labels: Dict[str, str]
    timestamp: datetime
    type: MetricType

@dataclass
class Alert:
    id: str
    level: AlertLevel
    message: str
    source: str
    timestamp: datetime
    acknowledged: bool = False
    resolved: bool = False
    metadata: Optional[Dict[str, Any]] = None

@dataclass
class SystemMetrics:
    cpu_percent: float
    memory_percent: float
    disk_percent: float
    network_io: Dict[str, float]
    active_connections: int
    timestamp: datetime

class PrometheusMetrics:
    """Métricas Prometheus para monitoramento"""
    
    def __init__(self):
        # Métricas de requisições HTTP
        self.http_requests_total = Counter(
            'http_requests_total',
            'Total de requisições HTTP',
            ['method', 'endpoint', 'status_code']
        )
        
        self.http_request_duration_seconds = Histogram(
            'http_request_duration_seconds',
            'Duração das requisições HTTP',
            ['method', 'endpoint'],
            buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0]
        )
        
        # Métricas de sistema
        self.system_cpu_percent = Gauge(
            'system_cpu_percent',
            'Percentual de uso da CPU'
        )
        
        self.system_memory_percent = Gauge(
            'system_memory_percent',
            'Percentual de uso da memória'
        )
        
        self.system_disk_percent = Gauge(
            'system_disk_percent',
            'Percentual de uso do disco'
        )
        
        # Métricas de negócio
        self.active_users = Gauge(
            'active_users',
            'Usuários ativos no sistema'
        )
        
        self.course_completions = Counter(
            'course_completions_total',
            'Total de cursos completados',
            ['course_id', 'user_type']
        )
        
        # Métricas de segurança
        self.security_events = Counter(
            'security_events_total',
            'Total de eventos de segurança',
            ['event_type', 'severity']
        )
        
        self.failed_login_attempts = Counter(
            'failed_login_attempts_total',
            'Total de tentativas de login falhadas',
            ['ip_address', 'user_agent']
        )

class RedisMetricsStore:
    """Armazenamento de métricas em Redis"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis_url = redis_url
        self.redis_client = None
        self._connect()
    
    def _connect(self):
        """Conecta ao Redis"""
        try:
            self.redis_client = redis.from_url(self.redis_url)
            self.redis_client.ping()
            logger.info("Conectado ao Redis para métricas")
        except Exception as e:
            logger.error(f"Erro ao conectar ao Redis: {e}")
            self.redis_client = None
    
    async def store_metric(self, metric: MetricData):
        """Armazena métrica no Redis"""
        if not self.redis_client:
            return
        
        try:
            key = f"metrics:{metric.name}:{metric.timestamp.strftime('%Y%m%d:%H%M%S')}"
            data = asdict(metric)
            data['timestamp'] = data['timestamp'].isoformat()
            data['type'] = data['type'].value
            
            self.redis_client.setex(key, 86400, json.dumps(data))  # TTL 24h
        except Exception as e:
            logger.error(f"Erro ao armazenar métrica: {e}")
    
    async def get_metrics(self, metric_name: str, hours: int = 24) -> List[MetricData]:
        """Recupera métricas do Redis"""
        if not self.redis_client:
            return []
        
        try:
            pattern = f"metrics:{metric_name}:*"
            keys = self.redis_client.keys(pattern)
            
            metrics = []
            for key in keys:
                data = json.loads(self.redis_client.get(key))
                data['timestamp'] = datetime.fromisoformat(data['timestamp'])
                data['type'] = MetricType(data['type'])
                metrics.append(MetricData(**data))
            
            # Filtrar por tempo
            cutoff_time = datetime.now() - timedelta(hours=hours)
            metrics = [m for m in metrics if m.timestamp > cutoff_time]
            
            return sorted(metrics, key=lambda x: x.timestamp)
        except Exception as e:
            logger.error(f"Erro ao recuperar métricas: {e}")
            return []

class AlertManager:
    """Gerenciador de alertas"""
    
    def __init__(self):
        self.alerts: Dict[str, Alert] = {}
        self.alert_handlers: Dict[AlertLevel, List[Callable]] = defaultdict(list)
        self.alert_queue = queue.Queue()
        self._start_alert_processor()
    
    def _start_alert_processor(self):
        """Inicia processador de alertas em background"""
        def process_alerts():
            while True:
                try:
                    alert = self.alert_queue.get(timeout=1)
                    self._process_alert(alert)
                    self.alert_queue.task_done()
                except queue.Empty:
                    continue
                except Exception as e:
                    logger.error(f"Erro no processador de alertas: {e}")
        
        thread = threading.Thread(target=process_alerts, daemon=True)
        thread.start()
    
    def add_alert_handler(self, level: AlertLevel, handler: Callable):
        """Adiciona handler para nível de alerta"""
        self.alert_handlers[level].append(handler)
    
    async def create_alert(self, level: AlertLevel, message: str, source: str, metadata: Optional[Dict] = None):
        """Cria novo alerta"""
        alert = Alert(
            id=f"alert_{int(time.time())}_{hash(message) % 10000}",
            level=level,
            message=message,
            source=source,
            timestamp=datetime.now(),
            metadata=metadata or {}
        )
        
        self.alerts[alert.id] = alert
        self.alert_queue.put(alert)
        
        logger.warning(f"Alerta criado: {alert.level.value} - {alert.message}", 
                      alert_id=alert.id, source=source)
        
        return alert
    
    def _process_alert(self, alert: Alert):
        """Processa alerta"""
        handlers = self.alert_handlers[alert.level]
        
        for handler in handlers:
            try:
                handler(alert)
            except Exception as e:
                logger.error(f"Erro no handler de alerta: {e}")
    
    def get_alerts(self, level: Optional[AlertLevel] = None, resolved: Optional[bool] = None) -> List[Alert]:
        """Recupera alertas filtrados"""
        alerts = list(self.alerts.values())
        
        if level:
            alerts = [a for a in alerts if a.level == level]
        
        if resolved is not None:
            alerts = [a for a in alerts if a.resolved == resolved]
        
        return sorted(alerts, key=lambda x: x.timestamp, reverse=True)
    
    async def acknowledge_alert(self, alert_id: str):
        """Marca alerta como reconhecido"""
        if alert_id in self.alerts:
            self.alerts[alert_id].acknowledged = True
            logger.info(f"Alerta reconhecido: {alert_id}")
    
    async def resolve_alert(self, alert_id: str):
        """Marca alerta como resolvido"""
        if alert_id in self.alerts:
            self.alerts[alert_id].resolved = True
            logger.info(f"Alerta resolvido: {alert_id}")

class SystemMonitor:
    """Monitor do sistema"""
    
    def __init__(self, alert_manager: AlertManager):
        self.alert_manager = alert_manager
        self.metrics_history = deque(maxlen=1000)
        self.monitoring_active = False
        self.monitoring_interval = 30  # segundos
    
    async def start_monitoring(self):
        """Inicia monitoramento do sistema"""
        self.monitoring_active = True
        logger.info("Monitoramento do sistema iniciado")
        
        while self.monitoring_active:
            try:
                metrics = await self._collect_system_metrics()
                self.metrics_history.append(metrics)
                
                # Verificar thresholds e criar alertas
                await self._check_thresholds(metrics)
                
                await asyncio.sleep(self.monitoring_interval)
            except Exception as e:
                logger.error(f"Erro no monitoramento: {e}")
                await asyncio.sleep(5)
    
    async def stop_monitoring(self):
        """Para monitoramento do sistema"""
        self.monitoring_active = False
        logger.info("Monitoramento do sistema parado")
    
    async def _collect_system_metrics(self) -> SystemMetrics:
        """Coleta métricas do sistema"""
        try:
            # CPU
            cpu_percent = psutil.cpu_percent(interval=1)
            
            # Memória
            memory = psutil.virtual_memory()
            memory_percent = memory.percent
            
            # Disco
            disk = psutil.disk_usage('/')
            disk_percent = disk.percent
            
            # Rede
            network = psutil.net_io_counters()
            network_io = {
                'bytes_sent': network.bytes_sent,
                'bytes_recv': network.bytes_recv,
                'packets_sent': network.packets_sent,
                'packets_recv': network.packets_recv
            }
            
            # Conexões ativas (simulado)
            active_connections = len(psutil.net_connections())
            
            return SystemMetrics(
                cpu_percent=cpu_percent,
                memory_percent=memory_percent,
                disk_percent=disk_percent,
                network_io=network_io,
                active_connections=active_connections,
                timestamp=datetime.now()
            )
        except Exception as e:
            logger.error(f"Erro ao coletar métricas do sistema: {e}")
            return SystemMetrics(
                cpu_percent=0.0,
                memory_percent=0.0,
                disk_percent=0.0,
                network_io={},
                active_connections=0,
                timestamp=datetime.now()
            )
    
    async def _check_thresholds(self, metrics: SystemMetrics):
        """Verifica thresholds e cria alertas se necessário"""
        # CPU
        if metrics.cpu_percent > 80:
            await self.alert_manager.create_alert(
                AlertLevel.WARNING,
                f"CPU alta: {metrics.cpu_percent:.1f}%",
                "system_monitor",
                {"cpu_percent": metrics.cpu_percent}
            )
        elif metrics.cpu_percent > 95:
            await self.alert_manager.create_alert(
                AlertLevel.CRITICAL,
                f"CPU crítica: {metrics.cpu_percent:.1f}%",
                "system_monitor",
                {"cpu_percent": metrics.cpu_percent}
            )
        
        # Memória
        if metrics.memory_percent > 85:
            await self.alert_manager.create_alert(
                AlertLevel.WARNING,
                f"Memória alta: {metrics.memory_percent:.1f}%",
                "system_monitor",
                {"memory_percent": metrics.memory_percent}
            )
        
        # Disco
        if metrics.disk_percent > 90:
            await self.alert_manager.create_alert(
                AlertLevel.WARNING,
                f"Disco quase cheio: {metrics.disk_percent:.1f}%",
                "system_monitor",
                {"disk_percent": metrics.disk_percent}
            )
    
    def get_metrics_summary(self) -> Dict[str, Any]:
        """Retorna resumo das métricas"""
        if not self.metrics_history:
            return {}
        
        latest = self.metrics_history[-1]
        
        # Calcular médias das últimas 10 medições
        recent_metrics = list(self.metrics_history)[-10:]
        
        avg_cpu = sum(m.cpu_percent for m in recent_metrics) / len(recent_metrics)
        avg_memory = sum(m.memory_percent for m in recent_metrics) / len(recent_metrics)
        avg_disk = sum(m.disk_percent for m in recent_metrics) / len(recent_metrics)
        
        return {
            "current": {
                "cpu_percent": latest.cpu_percent,
                "memory_percent": latest.memory_percent,
                "disk_percent": latest.disk_percent,
                "active_connections": latest.active_connections
            },
            "averages": {
                "cpu_percent": round(avg_cpu, 2),
                "memory_percent": round(avg_memory, 2),
                "disk_percent": round(avg_disk, 2)
            },
            "timestamp": latest.timestamp.isoformat()
        }

class MonitoringMiddleware:
    """Middleware de monitoramento para FastAPI"""
    
    def __init__(self, app: FastAPI, prometheus_metrics: PrometheusMetrics):
        self.app = app
        self.metrics = prometheus_metrics
    
    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            start_time = time.time()
            
            # Extrair informações da requisição
            method = scope.get("method", "UNKNOWN")
            path = scope.get("path", "/")
            
            # Processar requisição
            await self.app(scope, receive, send)
            
            # Calcular duração
            duration = time.time() - start_time
            
            # Atualizar métricas Prometheus
            self.metrics.http_requests_total.labels(
                method=method,
                endpoint=path,
                status_code="200"  # Simplificado
            ).inc()
            
            self.metrics.http_request_duration_seconds.labels(
                method=method,
                endpoint=path
            ).observe(duration)

class MonitoringSystem:
    """Sistema principal de monitoramento"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.prometheus_metrics = PrometheusMetrics()
        self.redis_store = RedisMetricsStore(redis_url)
        self.alert_manager = AlertManager()
        self.system_monitor = SystemMonitor(self.alert_manager)
        self.monitoring_task = None
        
        # Configurar handlers de alerta padrão
        self._setup_default_alert_handlers()
    
    def _setup_default_alert_handlers(self):
        """Configura handlers de alerta padrão"""
        
        def log_alert(alert: Alert):
            """Handler padrão: log do alerta"""
            logger.warning(f"ALERTA: {alert.level.value} - {alert.message}",
                          alert_id=alert.id, source=alert.source)
        
        def email_alert(alert: Alert):
            """Handler para envio de email (simulado)"""
            if alert.level in [AlertLevel.ERROR, AlertLevel.CRITICAL]:
                logger.info(f"Enviando email para alerta crítico: {alert.message}")
        
        # Registrar handlers para todos os níveis
        for level in AlertLevel:
            self.alert_manager.add_alert_handler(level, log_alert)
            if level in [AlertLevel.ERROR, AlertLevel.CRITICAL]:
                self.alert_manager.add_alert_handler(level, email_alert)
    
    async def start(self):
        """Inicia sistema de monitoramento"""
        logger.info("🚀 Iniciando sistema de monitoramento...")
        
        # Iniciar monitoramento do sistema
        self.monitoring_task = asyncio.create_task(
            self.system_monitor.start_monitoring()
        )
        
        logger.info("✅ Sistema de monitoramento iniciado")
    
    async def stop(self):
        """Para sistema de monitoramento"""
        logger.info("🔄 Parando sistema de monitoramento...")
        
        if self.monitoring_task:
            self.monitoring_task.cancel()
            try:
                await self.monitoring_task
            except asyncio.CancelledError:
                pass
        
        await self.system_monitor.stop_monitoring()
        logger.info("✅ Sistema de monitoramento parado")
    
    async def get_health_status(self) -> Dict[str, Any]:
        """Retorna status de saúde do sistema de monitoramento"""
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "components": {
                "prometheus_metrics": True,
                "redis_store": self.redis_store.redis_client is not None,
                "alert_manager": True,
                "system_monitor": self.system_monitor.monitoring_active
            },
            "metrics_summary": self.system_monitor.get_metrics_summary(),
            "active_alerts": len(self.alert_manager.get_alerts(resolved=False))
        }
    
    async def get_prometheus_metrics(self) -> str:
        """Retorna métricas no formato Prometheus"""
        return generate_latest()
    
    async def get_alerts(self, level: Optional[str] = None, resolved: Optional[bool] = None) -> List[Dict]:
        """Retorna alertas filtrados"""
        alert_level = AlertLevel(level) if level else None
        alerts = self.alert_manager.get_alerts(alert_level, resolved)
        return [asdict(alert) for alert in alerts]

# Instância global do sistema de monitoramento
monitoring_system = None

async def get_monitoring_system() -> MonitoringSystem:
    """Retorna instância global do sistema de monitoramento"""
    global monitoring_system
    if monitoring_system is None:
        redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
        monitoring_system = MonitoringSystem(redis_url)
        await monitoring_system.start()
    return monitoring_system

# Função para iniciar monitoramento
async def start_monitoring():
    """Inicia sistema de monitoramento"""
    monitoring_system = await get_monitoring_system()
    return monitoring_system

# Função para parar monitoramento
async def stop_monitoring():
    """Para sistema de monitoramento"""
    global monitoring_system
    if monitoring_system:
        await monitoring_system.stop()
        monitoring_system = None

if __name__ == "__main__":
    # Teste do sistema de monitoramento
    async def test_monitoring():
        monitoring = await start_monitoring()
        
        try:
            # Aguardar algumas métricas
            await asyncio.sleep(60)
            
            # Verificar status
            health = await monitoring.get_health_status()
            print("Status de saúde:", json.dumps(health, indent=2))
            
        finally:
            await stop_monitoring()
    
    asyncio.run(test_monitoring())
