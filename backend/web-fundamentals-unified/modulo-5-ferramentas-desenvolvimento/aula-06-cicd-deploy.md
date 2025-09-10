# 🚀 Aula 6: CI/CD e Deploy
## Web Fundamentals - Módulo 5: Ferramentas de Desenvolvimento

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar GitHub Actions
- ✅ Implementar deploy automatizado
- ✅ Configurar ambientes (dev/staging/prod)
- ✅ Gerenciar variáveis de ambiente
- ✅ Implementar monitoramento e logs
- ✅ Configurar rollback e recovery
- ✅ Automatizar testes e build
- ✅ Implementar notificações

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos do GitHub Actions

#### **O que é GitHub Actions?**
```yaml
# GitHub Actions é uma plataforma de CI/CD integrada ao GitHub
# Permite automatizar workflows de desenvolvimento
# Suporta múltiplos ambientes e linguagens
# Integra com serviços externos

# Estrutura básica de workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

#### **Configuração Básica**
```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### 2. 🚀 Deploy Automatizado

#### **Deploy para Staging**
```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [ develop ]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build:staging
    
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment..."
        # Comandos de deploy específicos
        rsync -av dist/ staging@servidor:/var/www/staging/
    
    - name: Health check
      run: |
        curl -f https://staging.exemplo.com/health || exit 1
```

#### **Deploy para Produção**
```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build:production
    
    - name: Deploy to production
      run: |
        echo "Deploying to production environment..."
        # Comandos de deploy específicos
        rsync -av dist/ prod@servidor:/var/www/production/
    
    - name: Health check
      run: |
        curl -f https://exemplo.com/health || exit 1
    
    - name: Notify team
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 3. 🌍 Gerenciamento de Ambientes

#### **Configuração de Ambientes**
```yaml
# .github/workflows/deploy.yml
name: Deploy Application

on:
  push:
    branches: [ main, develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to environment
      run: |
        if [ "${{ github.ref }}" == "refs/heads/main" ]; then
          echo "Deploying to production..."
          rsync -av dist/ prod@servidor:/var/www/production/
        elif [ "${{ github.ref }}" == "refs/heads/develop" ]; then
          echo "Deploying to staging..."
          rsync -av dist/ staging@servidor:/var/www/staging/
        fi
```

#### **Variáveis de Ambiente**
```yaml
# .github/workflows/deploy.yml
name: Deploy with Environment Variables

on:
  push:
    branches: [ main, develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build
      env:
        NODE_ENV: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        API_URL: ${{ secrets.API_URL }}
        DB_URL: ${{ secrets.DB_URL }}
    
    - name: Deploy to environment
      run: |
        echo "Deploying to ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}..."
        # Comandos de deploy específicos
```

### 4. 📊 Monitoramento e Logs

#### **Configuração de Monitoramento**
```yaml
# .github/workflows/monitor.yml
name: Application Monitoring

on:
  schedule:
    - cron: '*/5 * * * *' # A cada 5 minutos

jobs:
  monitor:
    runs-on: ubuntu-latest
    
    steps:
    - name: Check application health
      run: |
        # Verificar saúde da aplicação
        curl -f https://exemplo.com/health || exit 1
        
        # Verificar métricas de performance
        response_time=$(curl -o /dev/null -s -w '%{time_total}' https://exemplo.com/)
        if (( $(echo "$response_time > 2.0" | bc -l) )); then
          echo "Response time too high: ${response_time}s"
          exit 1
        fi
    
    - name: Check database connectivity
      run: |
        # Verificar conectividade com banco de dados
        curl -f https://exemplo.com/api/health/db || exit 1
    
    - name: Check external services
      run: |
        # Verificar serviços externos
        curl -f https://exemplo.com/api/health/external || exit 1
    
    - name: Send alert if issues found
      if: failure()
      uses: 8398a7/action-slack@v3
      with:
        status: failure
        channel: '#alerts'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        text: 'Application health check failed!'
```

#### **Configuração de Logs**
```yaml
# .github/workflows/logs.yml
name: Log Analysis

on:
  schedule:
    - cron: '0 */6 * * *' # A cada 6 horas

jobs:
  analyze-logs:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Analyze application logs
      run: |
        # Analisar logs de erro
        error_count=$(curl -s https://exemplo.com/api/logs/errors | jq '.count')
        if [ "$error_count" -gt 100 ]; then
          echo "High error count detected: $error_count"
          exit 1
        fi
        
        # Analisar logs de performance
        slow_requests=$(curl -s https://exemplo.com/api/logs/slow | jq '.count')
        if [ "$slow_requests" -gt 50 ]; then
          echo "High number of slow requests: $slow_requests"
          exit 1
        fi
    
    - name: Send log summary
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#logs'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        text: 'Log analysis completed'
```

### 5. 🔄 Rollback e Recovery

#### **Configuração de Rollback**
```yaml
# .github/workflows/rollback.yml
name: Rollback Application

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to rollback'
        required: true
        default: 'staging'
        type: choice
        options:
        - staging
        - production
      version:
        description: 'Version to rollback to'
        required: true
        default: 'previous'

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Rollback application
      run: |
        echo "Rolling back ${{ inputs.environment }} to ${{ inputs.version }}..."
        
        if [ "${{ inputs.environment }}" == "production" ]; then
          # Rollback de produção
          ssh prod@servidor "cd /var/www/production && git checkout ${{ inputs.version }}"
        elif [ "${{ inputs.environment }}" == "staging" ]; then
          # Rollback de staging
          ssh staging@servidor "cd /var/www/staging && git checkout ${{ inputs.version }}"
        fi
    
    - name: Health check after rollback
      run: |
        if [ "${{ inputs.environment }}" == "production" ]; then
          curl -f https://exemplo.com/health || exit 1
        elif [ "${{ inputs.environment }}" == "staging" ]; then
          curl -f https://staging.exemplo.com/health || exit 1
        fi
    
    - name: Notify team
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        text: 'Rollback completed for ${{ inputs.environment }}'
```

#### **Configuração de Recovery**
```yaml
# .github/workflows/recovery.yml
name: Disaster Recovery

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to recover'
        required: true
        default: 'production'
        type: choice
        options:
        - staging
        - production

jobs:
  recovery:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Backup current state
      run: |
        echo "Backing up current state..."
        if [ "${{ inputs.environment }}" == "production" ]; then
          ssh prod@servidor "tar -czf /backup/production-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/production"
        elif [ "${{ inputs.environment }}" == "staging" ]; then
          ssh staging@servidor "tar -czf /backup/staging-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/staging"
        fi
    
    - name: Restore from backup
      run: |
        echo "Restoring from backup..."
        if [ "${{ inputs.environment }}" == "production" ]; then
          ssh prod@servidor "cd /var/www/production && git checkout main && git pull origin main"
        elif [ "${{ inputs.environment }}" == "staging" ]; then
          ssh staging@servidor "cd /var/www/staging && git checkout develop && git pull origin develop"
        fi
    
    - name: Health check after recovery
      run: |
        if [ "${{ inputs.environment }}" == "production" ]; then
          curl -f https://exemplo.com/health || exit 1
        elif [ "${{ inputs.environment }}" == "staging" ]; then
          curl -f https://staging.exemplo.com/health || exit 1
        fi
    
    - name: Notify team
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#alerts'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        text: 'Disaster recovery completed for ${{ inputs.environment }}'
```

### 6. 🔔 Notificações

#### **Configuração de Notificações**
```yaml
# .github/workflows/notifications.yml
name: Deployment Notifications

on:
  push:
    branches: [ main, develop ]

jobs:
  notify:
    runs-on: ubuntu-latest
    
    steps:
    - name: Notify deployment start
      uses: 8398a7/action-slack@v3
      with:
        status: custom
        custom_payload: |
          {
            "text": "🚀 Deployment started",
            "attachments": [
              {
                "color": "good",
                "fields": [
                  {
                    "title": "Branch",
                    "value": "${{ github.ref_name }}",
                    "short": true
                  },
                  {
                    "title": "Commit",
                    "value": "${{ github.sha }}",
                    "short": true
                  }
                ]
              }
            ]
          }
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
    
    - name: Deploy application
      run: |
        echo "Deploying application..."
        # Comandos de deploy
    
    - name: Notify deployment success
      if: success()
      uses: 8398a7/action-slack@v3
      with:
        status: success
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        text: '✅ Deployment successful'
    
    - name: Notify deployment failure
      if: failure()
      uses: 8398a7/action-slack@v3
      with:
        status: failure
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        text: '❌ Deployment failed'
```

### 7. 🔧 Configurações Avançadas

#### **Workflow Completo**
```yaml
# .github/workflows/complete-pipeline.yml
name: Complete CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/
    
    - name: Deploy to environment
      run: |
        if [ "${{ github.ref }}" == "refs/heads/main" ]; then
          echo "Deploying to production..."
          rsync -av dist/ prod@servidor:/var/www/production/
        elif [ "${{ github.ref }}" == "refs/heads/develop" ]; then
          echo "Deploying to staging..."
          rsync -av dist/ staging@servidor:/var/www/staging/
        fi
    
    - name: Health check
      run: |
        if [ "${{ github.ref }}" == "refs/heads/main" ]; then
          curl -f https://exemplo.com/health || exit 1
        elif [ "${{ github.ref }}" == "refs/heads/develop" ]; then
          curl -f https://staging.exemplo.com/health || exit 1
        fi
    
    - name: Notify team
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 8. 📈 Métricas e Relatórios

#### **Configuração de Métricas**
```yaml
# .github/workflows/metrics.yml
name: Performance Metrics

on:
  schedule:
    - cron: '0 */12 * * *' # A cada 12 horas

jobs:
  collect-metrics:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Collect performance metrics
      run: |
        # Coletar métricas de performance
        response_time=$(curl -o /dev/null -s -w '%{time_total}' https://exemplo.com/)
        echo "Response time: ${response_time}s"
        
        # Coletar métricas de disponibilidade
        availability=$(curl -s https://exemplo.com/api/health | jq '.availability')
        echo "Availability: ${availability}%"
        
        # Coletar métricas de uso
        active_users=$(curl -s https://exemplo.com/api/metrics/users | jq '.active')
        echo "Active users: ${active_users}"
    
    - name: Send metrics to monitoring service
      run: |
        # Enviar métricas para serviço de monitoramento
        curl -X POST https://monitoring.exemplo.com/api/metrics \
          -H "Content-Type: application/json" \
          -d '{
            "service": "web-app",
            "metrics": {
              "response_time": "'${response_time}'",
              "availability": "'${availability}'",
              "active_users": "'${active_users}'"
            }
          }'
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Pipeline Básico**
Configure pipeline CI/CD básico:
- Criar workflow GitHub Actions
- Configurar testes automatizados
- Implementar build automatizado
- Testar funcionamento

**Critérios de avaliação:**
- ✅ Workflow criado
- ✅ Testes automatizados
- ✅ Build automatizado
- ✅ Funcionamento testado

### **Exercício 2: Deploy Automatizado**
Implemente deploy automatizado:
- Configurar ambientes
- Implementar deploy para staging
- Implementar deploy para produção
- Configurar variáveis de ambiente

**Critérios de avaliação:**
- ✅ Ambientes configurados
- ✅ Deploy para staging
- ✅ Deploy para produção
- ✅ Variáveis configuradas

### **Exercício 3: Monitoramento**
Configure monitoramento:
- Implementar health checks
- Configurar métricas
- Implementar alertas
- Configurar logs

**Critérios de avaliação:**
- ✅ Health checks implementados
- ✅ Métricas configuradas
- ✅ Alertas implementados
- ✅ Logs configurados

### **Exercício 4: Recovery**
Implemente recovery:
- Configurar rollback
- Implementar backup
- Configurar recovery
- Testar funcionamento

**Critérios de avaliação:**
- ✅ Rollback configurado
- ✅ Backup implementado
- ✅ Recovery configurado
- ✅ Funcionamento testado

---

## 💡 Dicas Importantes

### **1. GitHub Actions**
- Use actions oficiais quando possível
- Configure secrets adequadamente
- Use matrix para múltiplas versões
- Monitore uso de minutos

### **2. Deploy**
- Configure ambientes adequadamente
- Use variáveis de ambiente
- Implemente health checks
- Configure rollback

### **3. Monitoramento**
- Monitore métricas importantes
- Configure alertas apropriados
- Implemente logs estruturados
- Use ferramentas de monitoramento

### **4. Segurança**
- Use secrets para dados sensíveis
- Configure permissões adequadamente
- Implemente auditoria
- Monitore acessos

---

## 🚀 Próximos Passos

Após completar este módulo, você estará pronto para:
- **Módulo 6**: APIs e Integração
- **Projetos mais complexos**
- **Colaboração em equipes**
- **Oportunidades profissionais**

---

## 📝 Checklist de Conclusão

- [ ] Dominou GitHub Actions
- [ ] Implementou deploy automatizado
- [ ] Configurou ambientes (dev/staging/prod)
- [ ] Gerenciou variáveis de ambiente
- [ ] Implementou monitoramento e logs
- [ ] Configurou rollback e recovery
- [ ] Automatizou testes e build
- [ ] Implementou notificações
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou o Módulo 5 com sucesso!**

---

## 📚 Recursos Adicionais

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CI/CD Best Practices](https://docs.github.com/en/actions/learn-github-actions)
- [Deployment Strategies](https://martinfowler.com/articles/blue-green-deployment.html)
- [Monitoring and Observability](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows)

---

*Próximo módulo: Módulo 6 - APIs e Integração*







