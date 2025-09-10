# Aula 4: Monitoramento e Logging

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Implementar sistemas de monitoramento abrangentes
- Configurar logging centralizado e estruturado
- Usar ferramentas de APM (Application Performance Monitoring)
- Configurar alertas e notificações
- Analisar métricas e logs para otimização
- Implementar observabilidade em aplicações web

## 📚 Conteúdo da Aula

### 1. Introdução ao Monitoramento

#### O que é Monitoramento?
Monitoramento é o processo de coletar, analisar e interpretar dados sobre o desempenho e saúde de sistemas em tempo real.

**Pilares do Monitoramento:**
- **Métricas**: Dados quantitativos sobre performance
- **Logs**: Registros de eventos e atividades
- **Traces**: Rastreamento de requisições através do sistema
- **Alertas**: Notificações sobre problemas críticos

#### Tipos de Monitoramento

| Tipo | Descrição | Exemplos |
|------|-----------|----------|
| **Infrastructure** | Recursos do sistema | CPU, RAM, Disco, Rede |
| **Application** | Performance da aplicação | Response time, Throughput |
| **Business** | Métricas de negócio | Usuários ativos, Conversões |
| **Security** | Segurança e compliance | Tentativas de login, Acessos |

### 2. Stack de Monitoramento

#### Prometheus + Grafana
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    privileged: true
    devices:
      - /dev/kmsg

  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager_data:/alertmanager

volumes:
  prometheus_data:
  grafana_data:
  alertmanager_data:
```

#### Configuração do Prometheus
```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']
```

### 3. Métricas Customizadas

#### Métricas na Aplicação Node.js
```javascript
// metrics.js
const client = require('prom-client');

// Criar registry
const register = new client.Registry();

// Adicionar métricas padrão
client.collectDefaultMetrics({ register });

// Métricas customizadas
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const databaseConnections = new client.Gauge({
  name: 'database_connections_active',
  help: 'Number of active database connections'
});

// Registrar métricas
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeConnections);
register.registerMetric(databaseConnections);

module.exports = {
  register,
  httpRequestDuration,
  httpRequestTotal,
  activeConnections,
  databaseConnections
};
```

#### Middleware de Métricas
```javascript
// app.js
const express = require('express');
const { 
  register, 
  httpRequestDuration, 
  httpRequestTotal 
} = require('./metrics');

const app = express();

// Middleware de métricas
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
});

// Endpoint de métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(3000);
```

### 4. Logging Estruturado

#### Configuração do Winston
```javascript
// logger.js
const winston = require('winston');
const { combine, timestamp, errors, json, printf, colorize } = winston.format;

// Formato customizado
const customFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  
  if (stack) {
    log += `\n${stack}`;
  }
  
  if (Object.keys(meta).length > 0) {
    log += `\n${JSON.stringify(meta, null, 2)}`;
  }
  
  return log;
});

// Configuração do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { 
    service: 'minha-app',
    version: process.env.npm_package_version || '1.0.0'
  },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      )
    }),
    
    // File transports
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// Adicionar transport para produção (ELK Stack)
if (process.env.NODE_ENV === 'production') {
  const { ElasticsearchTransport } = require('winston-elasticsearch');
  
  logger.add(new ElasticsearchTransport({
    level: 'info',
    clientOpts: {
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
    },
    index: 'logs-minha-app'
  }));
}

module.exports = logger;
```

#### Uso do Logger
```javascript
// app.js
const logger = require('./logger');

// Logging de requisições
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
  });
  
  next();
});

// Logging de erros
app.use((err, req, res, next) => {
  logger.error('Unhandled Error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  
  res.status(500).json({ 
    error: 'Internal Server Error',
    requestId: req.id
  });
});

// Logging de negócio
app.post('/api/users', async (req, res) => {
  try {
    const user = await createUser(req.body);
    
    logger.info('User Created', {
      userId: user.id,
      email: user.email,
      action: 'user_created'
    });
    
    res.status(201).json(user);
  } catch (error) {
    logger.error('User Creation Failed', {
      error: error.message,
      email: req.body.email,
      action: 'user_creation_failed'
    });
    
    res.status(400).json({ error: error.message });
  }
});
```

### 5. ELK Stack (Elasticsearch, Logstash, Kibana)

#### docker-compose.elk.yml
```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    ports:
      - "5044:5044"
      - "5000:5000/tcp"
      - "5000:5000/udp"
      - "9600:9600"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
      - ./logstash/config:/usr/share/logstash/config
    environment:
      - LS_JAVA_OPTS=-Xmx256m -Xms256m
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

  filebeat:
    image: docker.elastic.co/beats/filebeat:8.8.0
    user: root
    volumes:
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./logs:/var/log/app:ro
    environment:
      - ELASTICSEARCH_HOSTS=elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

#### Configuração do Logstash
```ruby
# logstash/pipeline/logstash.conf
input {
  beats {
    port => 5044
  }
  
  tcp {
    port => 5000
    codec => json_lines
  }
  
  file {
    path => "/var/log/app/*.log"
    start_position => "beginning"
    codec => json
  }
}

filter {
  if [fields][service] == "minha-app" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} \[%{LOGLEVEL:level}\]: %{GREEDYDATA:message}" }
    }
    
    date {
      match => [ "timestamp", "ISO8601" ]
    }
    
    mutate {
      add_field => { "service" => "minha-app" }
    }
  }
  
  if [level] == "ERROR" {
    mutate {
      add_tag => [ "error" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
  
  stdout {
    codec => rubydebug
  }
}
```

#### Configuração do Filebeat
```yaml
# filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/app/*.log
  fields:
    service: minha-app
  fields_under_root: true
  multiline.pattern: '^\d{4}-\d{2}-\d{2}'
  multiline.negate: true
  multiline.match: after

- type: container
  enabled: true
  paths:
    - '/var/lib/docker/containers/*/*.log'
  processors:
    - add_docker_metadata:
        host: "unix:///var/run/docker.sock"

output.logstash:
  hosts: ["logstash:5044"]

processors:
  - add_host_metadata:
      when.not.contains.tags: forwarded
```

### 6. APM (Application Performance Monitoring)

#### New Relic
```javascript
// newrelic.js
'use strict'

exports.config = {
  app_name: ['Minha App'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  distributed_tracing: {
    enabled: true
  },
  logging: {
    level: 'info'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
```

#### Datadog
```javascript
// datadog.js
const tracer = require('dd-trace').init({
  service: 'minha-app',
  env: process.env.NODE_ENV,
  version: process.env.npm_package_version,
  logInjection: true,
  runtimeMetrics: true,
  profiling: true,
  tags: {
    'team': 'backend',
    'component': 'api'
  }
});

// Instrumentar Express
const express = require('express');
const app = express();

// Middleware de tracing
app.use((req, res, next) => {
  const span = tracer.startSpan('http.request');
  span.setTag('http.method', req.method);
  span.setTag('http.url', req.url);
  
  res.on('finish', () => {
    span.setTag('http.status_code', res.statusCode);
    span.finish();
  });
  
  next();
});

module.exports = { tracer };
```

### 7. Alertas e Notificações

#### Configuração do Alertmanager
```yaml
# alertmanager.yml
global:
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alerts@example.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'

receivers:
- name: 'web.hook'
  webhook_configs:
  - url: 'http://webhook:5001/'
    send_resolved: true

- name: 'email'
  email_configs:
  - to: 'admin@example.com'
    subject: 'Alert: {{ .GroupLabels.alertname }}'
    body: |
      {{ range .Alerts }}
      Alert: {{ .Annotations.summary }}
      Description: {{ .Annotations.description }}
      {{ end }}

- name: 'slack'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
    channel: '#alerts'
    title: 'Alert: {{ .GroupLabels.alertname }}'
    text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
```

#### Regras de Alerta
```yaml
# alert_rules.yml
groups:
- name: example
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} errors per second"

  - alert: HighResponseTime
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High response time detected"
      description: "95th percentile response time is {{ $value }} seconds"

  - alert: HighCPUUsage
    expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High CPU usage detected"
      description: "CPU usage is {{ $value }}%"

  - alert: HighMemoryUsage
    expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage detected"
      description: "Memory usage is {{ $value }}%"

  - alert: DiskSpaceLow
    expr: (1 - (node_filesystem_avail_bytes / node_filesystem_size_bytes)) * 100 > 80
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Disk space low"
      description: "Disk usage is {{ $value }}%"
```

### 8. Dashboards do Grafana

#### Dashboard de Infraestrutura
```json
{
  "dashboard": {
    "title": "Infrastructure Dashboard",
    "panels": [
      {
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "100 - (avg by(instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)",
            "legendFormat": "CPU Usage %"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100",
            "legendFormat": "Memory Usage %"
          }
        ]
      },
      {
        "title": "Disk Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "(1 - (node_filesystem_avail_bytes / node_filesystem_size_bytes)) * 100",
            "legendFormat": "Disk Usage %"
          }
        ]
      }
    ]
  }
}
```

#### Dashboard de Aplicação
```json
{
  "dashboard": {
    "title": "Application Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          },
          {
            "expr": "histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "50th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status_code=~\"5..\"}[5m])",
            "legendFormat": "5xx errors"
          }
        ]
      }
    ]
  }
}
```

### 9. Tracing Distribuído

#### OpenTelemetry
```javascript
// tracing.js
const { NodeSDK } = require('@opentelemetry/auto-instrumentations-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'minha-app',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
```

#### Jaeger
```yaml
# docker-compose.jaeger.yml
version: '3.8'

services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "14268:14268"
    environment:
      - COLLECTOR_OTLP_ENABLED=true

  app:
    image: minha-app
    environment:
      - JAEGER_AGENT_HOST=jaeger
      - JAEGER_AGENT_PORT=6832
    depends_on:
      - jaeger
```

### 10. Projeto Prático: Sistema de Monitoramento Completo

#### Estrutura do Projeto
```
monitoring-system/
├── docker-compose.yml
├── prometheus/
│   ├── prometheus.yml
│   └── alert_rules.yml
├── grafana/
│   ├── provisioning/
│   │   ├── dashboards/
│   │   └── datasources/
│   └── dashboards/
├── logstash/
│   └── pipeline/
├── app/
│   ├── metrics.js
│   ├── logger.js
│   └── app.js
└── alerts/
    └── webhook.js
```

#### Webhook para Alertas
```javascript
// alerts/webhook.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  const { alerts } = req.body;
  
  alerts.forEach(alert => {
    console.log(`Alert: ${alert.labels.alertname}`);
    console.log(`Status: ${alert.status}`);
    console.log(`Description: ${alert.annotations.description}`);
    
    // Enviar para Slack
    if (alert.status === 'firing') {
      sendSlackAlert(alert);
    }
    
    // Enviar email
    if (alert.labels.severity === 'critical') {
      sendEmailAlert(alert);
    }
  });
  
  res.status(200).send('OK');
});

function sendSlackAlert(alert) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  const message = {
    text: `🚨 Alert: ${alert.labels.alertname}`,
    attachments: [{
      color: 'danger',
      fields: [
        { title: 'Status', value: alert.status, short: true },
        { title: 'Severity', value: alert.labels.severity, short: true },
        { title: 'Description', value: alert.annotations.description, short: false }
      ]
    }]
  };
  
  // Enviar para Slack
  // Implementar envio
}

function sendEmailAlert(alert) {
  // Implementar envio de email
}

app.listen(5001);
```

## 🎯 Exercícios Práticos

### Exercício 1: Métricas Básicas
1. Implemente métricas customizadas na aplicação
2. Configure Prometheus para coletar métricas
3. Crie um dashboard básico no Grafana

### Exercício 2: Logging Estruturado
1. Configure logging estruturado com Winston
2. Implemente ELK Stack
3. Crie visualizações no Kibana

### Exercício 3: Alertas
1. Configure regras de alerta no Prometheus
2. Implemente notificações via Slack/Email
3. Teste cenários de alerta

### Exercício 4: APM
1. Configure APM com New Relic ou Datadog
2. Implemente tracing distribuído
3. Analise performance da aplicação

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Monitoramento**: Conceitos e pilares
2. **Prometheus**: Coleta e armazenamento de métricas
3. **Grafana**: Visualização e dashboards
4. **Logging**: Estruturação e centralização
5. **ELK Stack**: Elasticsearch, Logstash, Kibana
6. **APM**: Application Performance Monitoring
7. **Alertas**: Configuração e notificações
8. **Tracing**: Rastreamento distribuído
9. **Dashboards**: Criação e configuração
10. **Observabilidade**: Sistema completo

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- **Backup e Recovery**: Estratégias de backup
- **Disaster Recovery**: Planos de recuperação
- **Security**: Segurança em produção
- **Compliance**: Conformidade e auditoria
- **Cost Optimization**: Otimização de custos

## 📚 Recursos Adicionais

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [ELK Stack Guide](https://www.elastic.co/guide/)
- [OpenTelemetry](https://opentelemetry.io/docs/)
- [Winston Logger](https://github.com/winstonjs/winston)

---

**🎉 Parabéns!** Você completou a Aula 4 do Módulo 7. Continue praticando e explore as possibilidades do monitoramento!







