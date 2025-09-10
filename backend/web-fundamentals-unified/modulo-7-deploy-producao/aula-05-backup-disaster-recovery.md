# Aula 5: Backup e Disaster Recovery

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Implementar estratégias de backup abrangentes
- Configurar backup automático de bancos de dados
- Criar planos de disaster recovery
- Implementar backup de aplicações e configurações
- Configurar backup em nuvem
- Testar e validar procedimentos de recuperação

## 📚 Conteúdo da Aula

### 1. Introdução ao Backup e Disaster Recovery

#### O que é Backup?
Backup é o processo de criar cópias de dados importantes para proteger contra perda, corrupção ou falhas do sistema.

#### O que é Disaster Recovery?
Disaster Recovery é o conjunto de políticas e procedimentos para recuperar sistemas após desastres naturais, falhas técnicas ou ataques.

**Objetivos do Backup e DR:**
- **RTO (Recovery Time Objective)**: Tempo máximo para recuperar
- **RPO (Recovery Point Objective)**: Perda máxima de dados aceitável
- **Disponibilidade**: Uptime mínimo garantido
- **Integridade**: Consistência dos dados recuperados

#### Tipos de Backup

| Tipo | Descrição | Vantagens | Desvantagens |
|------|-----------|-----------|--------------|
| **Full** | Backup completo | Recuperação rápida | Espaço e tempo |
| **Incremental** | Apenas mudanças | Eficiente | Recuperação complexa |
| **Differential** | Mudanças desde último full | Balanceado | Crescimento contínuo |
| **Snapshot** | Estado em um momento | Rápido | Dependência do sistema |

### 2. Estratégias de Backup

#### Regra 3-2-1
- **3 cópias** dos dados (original + 2 backups)
- **2 tipos diferentes** de mídia
- **1 cópia offsite** (fora do local)

#### Estratégia de Retenção
```bash
# Exemplo de retenção
Daily: 7 dias
Weekly: 4 semanas
Monthly: 12 meses
Yearly: 7 anos
```

#### Cronograma de Backup
```bash
# Crontab para backup
# Backup diário às 2:00 AM
0 2 * * * /scripts/backup-daily.sh

# Backup semanal aos domingos às 1:00 AM
0 1 * * 0 /scripts/backup-weekly.sh

# Backup mensal no dia 1 às 0:00 AM
0 0 1 * * /scripts/backup-monthly.sh
```

### 3. Backup de Bancos de Dados

#### PostgreSQL Backup
```bash
#!/bin/bash
# backup-postgres.sh

# Configurações
DB_NAME="minha_app"
DB_USER="usuario"
DB_PASSWORD="senha"
BACKUP_DIR="/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup completo
pg_dump -h localhost -U $DB_USER -d $DB_NAME \
  --verbose --clean --no-owner --no-privileges \
  --format=custom --compress=9 \
  --file="$BACKUP_DIR/postgres_${DB_NAME}_${DATE}.dump"

# Backup apenas schema
pg_dump -h localhost -U $DB_USER -d $DB_NAME \
  --schema-only --no-owner --no-privileges \
  --file="$BACKUP_DIR/postgres_${DB_NAME}_schema_${DATE}.sql"

# Backup apenas dados
pg_dump -h localhost -U $DB_USER -d $DB_NAME \
  --data-only --no-owner --no-privileges \
  --file="$BACKUP_DIR/postgres_${DB_NAME}_data_${DATE}.sql"

# Limpar backups antigos
find $BACKUP_DIR -name "postgres_*.dump" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "postgres_*.sql" -mtime +$RETENTION_DAYS -delete

echo "Backup PostgreSQL concluído: $DATE"
```

#### MySQL Backup
```bash
#!/bin/bash
# backup-mysql.sh

# Configurações
DB_NAME="minha_app"
DB_USER="usuario"
DB_PASSWORD="senha"
BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup completo
mysqldump -h localhost -u $DB_USER -p$DB_PASSWORD \
  --single-transaction --routines --triggers \
  --hex-blob --opt $DB_NAME \
  | gzip > "$BACKUP_DIR/mysql_${DB_NAME}_${DATE}.sql.gz"

# Backup apenas estrutura
mysqldump -h localhost -u $DB_USER -p$DB_PASSWORD \
  --no-data --routines --triggers $DB_NAME \
  > "$BACKUP_DIR/mysql_${DB_NAME}_structure_${DATE}.sql"

# Backup apenas dados
mysqldump -h localhost -u $DB_USER -p$DB_PASSWORD \
  --no-create-info --single-transaction $DB_NAME \
  | gzip > "$BACKUP_DIR/mysql_${DB_NAME}_data_${DATE}.sql.gz"

# Limpar backups antigos
find $BACKUP_DIR -name "mysql_*.sql.gz" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "mysql_*.sql" -mtime +$RETENTION_DAYS -delete

echo "Backup MySQL concluído: $DATE"
```

#### MongoDB Backup
```bash
#!/bin/bash
# backup-mongodb.sh

# Configurações
DB_NAME="minha_app"
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup completo
mongodump --db $DB_NAME \
  --out "$BACKUP_DIR/mongodb_${DB_NAME}_${DATE}"

# Compactar backup
tar -czf "$BACKUP_DIR/mongodb_${DB_NAME}_${DATE}.tar.gz" \
  "$BACKUP_DIR/mongodb_${DB_NAME}_${DATE}"

# Remover diretório não compactado
rm -rf "$BACKUP_DIR/mongodb_${DB_NAME}_${DATE}"

# Limpar backups antigos
find $BACKUP_DIR -name "mongodb_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup MongoDB concluído: $DATE"
```

### 4. Backup de Aplicações

#### Backup de Código e Configurações
```bash
#!/bin/bash
# backup-app.sh

# Configurações
APP_DIR="/var/www/minha-app"
BACKUP_DIR="/backups/app"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup do código (excluindo node_modules, logs, etc.)
tar --exclude='node_modules' \
    --exclude='logs' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='.env' \
    -czf "$BACKUP_DIR/app_code_${DATE}.tar.gz" \
    -C "$(dirname $APP_DIR)" \
    "$(basename $APP_DIR)"

# Backup das configurações
tar -czf "$BACKUP_DIR/app_config_${DATE}.tar.gz" \
  /etc/nginx/ \
  /etc/systemd/system/ \
  /etc/ssl/

# Backup dos logs (últimos 7 dias)
find $APP_DIR/logs -name "*.log" -mtime -7 \
  -exec tar -czf "$BACKUP_DIR/app_logs_${DATE}.tar.gz" {} +

# Limpar backups antigos
find $BACKUP_DIR -name "app_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup da aplicação concluído: $DATE"
```

#### Backup com Git
```bash
#!/bin/bash
# backup-git.sh

# Configurações
REPO_DIR="/var/www/minha-app"
BACKUP_REPO="backup-repo.git"
BACKUP_DIR="/backups/git"
DATE=$(date +%Y%m%d_%H%M%S)

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Criar repositório de backup se não existir
if [ ! -d "$BACKUP_DIR/$BACKUP_REPO" ]; then
    git init --bare "$BACKUP_DIR/$BACKUP_REPO"
fi

# Adicionar remote de backup
cd $REPO_DIR
git remote add backup "$BACKUP_DIR/$BACKUP_REPO" 2>/dev/null || true

# Fazer push para backup
git push backup main

# Criar tag com timestamp
git tag "backup-$DATE"
git push backup "backup-$DATE"

echo "Backup Git concluído: $DATE"
```

### 5. Backup em Nuvem

#### AWS S3 Backup
```bash
#!/bin/bash
# backup-s3.sh

# Configurações
S3_BUCKET="meu-backup-bucket"
BACKUP_DIR="/backups"
AWS_PROFILE="backup-profile"
RETENTION_DAYS=30

# Instalar AWS CLI se não estiver instalado
if ! command -v aws &> /dev/null; then
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
fi

# Configurar AWS CLI
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile $AWS_PROFILE
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile $AWS_PROFILE
aws configure set default.region us-east-1 --profile $AWS_PROFILE

# Sincronizar backups com S3
aws s3 sync $BACKUP_DIR s3://$S3_BUCKET/backups/ \
  --profile $AWS_PROFILE \
  --storage-class STANDARD_IA \
  --delete

# Configurar lifecycle para arquivamento
aws s3api put-bucket-lifecycle-configuration \
  --bucket $S3_BUCKET \
  --lifecycle-configuration '{
    "Rules": [
      {
        "ID": "ArchiveOldBackups",
        "Status": "Enabled",
        "Transitions": [
          {
            "Days": 30,
            "StorageClass": "GLACIER"
          },
          {
            "Days": 90,
            "StorageClass": "DEEP_ARCHIVE"
          }
        ]
      }
    ]
  }' \
  --profile $AWS_PROFILE

echo "Backup S3 concluído"
```

#### Google Cloud Storage
```bash
#!/bin/bash
# backup-gcs.sh

# Configurações
GCS_BUCKET="meu-backup-bucket"
BACKUP_DIR="/backups"
PROJECT_ID="meu-projeto"

# Instalar gsutil se não estiver instalado
if ! command -v gsutil &> /dev/null; then
    curl https://sdk.cloud.google.com | bash
    source ~/.bashrc
fi

# Autenticar
gcloud auth login
gcloud config set project $PROJECT_ID

# Sincronizar backups com GCS
gsutil -m rsync -r -d $BACKUP_DIR gs://$GCS_BUCKET/backups/

# Configurar lifecycle
gsutil lifecycle set - gs://$GCS_BUCKET <<EOF
{
  "rule": [
    {
      "action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},
      "condition": {"age": 30}
    },
    {
      "action": {"type": "SetStorageClass", "storageClass": "COLDLINE"},
      "condition": {"age": 90}
    },
    {
      "action": {"type": "Delete"},
      "condition": {"age": 365}
    }
  ]
}
EOF

echo "Backup GCS concluído"
```

### 6. Disaster Recovery

#### Plano de Disaster Recovery
```markdown
# Plano de Disaster Recovery - Minha App

## 1. Objetivos
- RTO: 4 horas
- RPO: 1 hora
- Disponibilidade: 99.9%

## 2. Cenários de Desastre
- Falha de servidor
- Falha de datacenter
- Ataque de ransomware
- Desastre natural
- Erro humano

## 3. Procedimentos de Recuperação

### 3.1 Falha de Servidor
1. Verificar status do servidor
2. Ativar servidor de backup
3. Restaurar dados do backup
4. Verificar integridade
5. Redirecionar tráfego

### 3.2 Falha de Datacenter
1. Ativar datacenter secundário
2. Restaurar aplicação
3. Restaurar banco de dados
4. Configurar DNS
5. Verificar funcionalidades

## 4. Contatos de Emergência
- Administrador: +55 11 99999-9999
- DBA: +55 11 88888-8888
- DevOps: +55 11 77777-7777
```

#### Script de Recuperação
```bash
#!/bin/bash
# disaster-recovery.sh

# Configurações
BACKUP_DIR="/backups"
APP_DIR="/var/www/minha-app"
DB_NAME="minha_app"
DB_USER="usuario"
DB_PASSWORD="senha"
LOG_FILE="/var/log/disaster-recovery.log"

# Função de log
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

# Função de verificação
check_service() {
    if systemctl is-active --quiet $1; then
        log "Serviço $1 está ativo"
        return 0
    else
        log "Serviço $1 não está ativo"
        return 1
    fi
}

# Função de restauração do banco
restore_database() {
    log "Iniciando restauração do banco de dados"
    
    # Encontrar backup mais recente
    LATEST_BACKUP=$(find $BACKUP_DIR -name "postgres_${DB_NAME}_*.dump" | sort | tail -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        log "ERRO: Nenhum backup encontrado"
        exit 1
    fi
    
    log "Restaurando backup: $LATEST_BACKUP"
    
    # Restaurar banco
    pg_restore -h localhost -U $DB_USER -d $DB_NAME \
      --verbose --clean --no-owner --no-privileges \
      $LATEST_BACKUP
    
    if [ $? -eq 0 ]; then
        log "Banco de dados restaurado com sucesso"
    else
        log "ERRO: Falha na restauração do banco"
        exit 1
    fi
}

# Função de restauração da aplicação
restore_application() {
    log "Iniciando restauração da aplicação"
    
    # Encontrar backup mais recente
    LATEST_BACKUP=$(find $BACKUP_DIR -name "app_code_*.tar.gz" | sort | tail -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        log "ERRO: Nenhum backup da aplicação encontrado"
        exit 1
    fi
    
    log "Restaurando aplicação: $LATEST_BACKUP"
    
    # Parar aplicação
    systemctl stop minha-app
    
    # Fazer backup do estado atual
    mv $APP_DIR $APP_DIR.backup.$(date +%Y%m%d_%H%M%S)
    
    # Restaurar aplicação
    tar -xzf $LATEST_BACKUP -C /var/www/
    
    # Instalar dependências
    cd $APP_DIR
    npm install --production
    
    # Configurar permissões
    chown -R www-data:www-data $APP_DIR
    chmod -R 755 $APP_DIR
    
    # Iniciar aplicação
    systemctl start minha-app
    
    if check_service "minha-app"; then
        log "Aplicação restaurada com sucesso"
    else
        log "ERRO: Falha na restauração da aplicação"
        exit 1
    fi
}

# Função principal
main() {
    log "Iniciando procedimento de disaster recovery"
    
    # Verificar serviços essenciais
    check_service "nginx" || systemctl start nginx
    check_service "postgresql" || systemctl start postgresql
    
    # Restaurar banco de dados
    restore_database
    
    # Restaurar aplicação
    restore_application
    
    # Verificar funcionalidades
    if curl -f http://localhost/health; then
        log "Disaster recovery concluído com sucesso"
    else
        log "ERRO: Aplicação não está respondendo"
        exit 1
    fi
}

# Executar
main "$@"
```

### 7. Backup Automatizado com Docker

#### Docker Compose para Backup
```yaml
# docker-compose.backup.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups

  backup-postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - ./backups:/backups
      - ./scripts:/scripts
    command: >
      sh -c "
        while true; do
          /scripts/backup-postgres.sh
          sleep 86400
        done
      "
    depends_on:
      - postgres

  backup-s3:
    image: amazon/aws-cli:latest
    environment:
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      AWS_DEFAULT_REGION: us-east-1
    volumes:
      - ./backups:/backups
      - ./scripts:/scripts
    command: >
      sh -c "
        while true; do
          /scripts/backup-s3.sh
          sleep 86400
        done
      "

volumes:
  postgres_data:
```

#### Script de Backup Dockerizado
```bash
#!/bin/bash
# backup-postgres-docker.sh

# Configurações
DB_HOST="postgres"
DB_NAME="minha_app"
DB_USER="usuario"
DB_PASSWORD="senha"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup completo
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME \
  --verbose --clean --no-owner --no-privileges \
  --format=custom --compress=9 \
  --file="$BACKUP_DIR/postgres_${DB_NAME}_${DATE}.dump"

# Verificar integridade do backup
if [ $? -eq 0 ]; then
    echo "Backup PostgreSQL concluído: $DATE"
    
    # Enviar para S3
    aws s3 cp "$BACKUP_DIR/postgres_${DB_NAME}_${DATE}.dump" \
      s3://meu-backup-bucket/postgres/
else
    echo "ERRO: Falha no backup PostgreSQL"
    exit 1
fi
```

### 8. Teste de Recuperação

#### Script de Teste
```bash
#!/bin/bash
# test-recovery.sh

# Configurações
TEST_DB="test_recovery"
BACKUP_DIR="/backups"
LOG_FILE="/var/log/test-recovery.log"

# Função de log
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

# Função de teste de backup
test_backup() {
    log "Iniciando teste de backup"
    
    # Encontrar backup mais recente
    LATEST_BACKUP=$(find $BACKUP_DIR -name "postgres_*.dump" | sort | tail -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        log "ERRO: Nenhum backup encontrado"
        return 1
    fi
    
    log "Testando backup: $LATEST_BACKUP"
    
    # Criar banco de teste
    createdb $TEST_DB
    
    # Restaurar backup
    pg_restore -d $TEST_DB --verbose $LATEST_BACKUP
    
    if [ $? -eq 0 ]; then
        log "Teste de backup bem-sucedido"
        
        # Verificar integridade
        psql -d $TEST_DB -c "SELECT COUNT(*) FROM information_schema.tables;"
        
        # Limpar banco de teste
        dropdb $TEST_DB
        
        return 0
    else
        log "ERRO: Falha no teste de backup"
        dropdb $TEST_DB 2>/dev/null
        return 1
    fi
}

# Função de teste de aplicação
test_application() {
    log "Iniciando teste de aplicação"
    
    # Verificar se a aplicação está respondendo
    if curl -f http://localhost/health; then
        log "Aplicação está respondendo"
        return 0
    else
        log "ERRO: Aplicação não está respondendo"
        return 1
    fi
}

# Função principal
main() {
    log "Iniciando testes de recuperação"
    
    # Testar backup
    if test_backup; then
        log "Teste de backup: PASSOU"
    else
        log "Teste de backup: FALHOU"
        exit 1
    fi
    
    # Testar aplicação
    if test_application; then
        log "Teste de aplicação: PASSOU"
    else
        log "Teste de aplicação: FALHOU"
        exit 1
    fi
    
    log "Todos os testes passaram com sucesso"
}

# Executar
main "$@"
```

### 9. Monitoramento de Backup

#### Script de Monitoramento
```bash
#!/bin/bash
# monitor-backup.sh

# Configurações
BACKUP_DIR="/backups"
ALERT_EMAIL="admin@example.com"
LOG_FILE="/var/log/backup-monitor.log"

# Função de log
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

# Função de envio de email
send_alert() {
    local subject="$1"
    local message="$2"
    
    echo "$message" | mail -s "$subject" $ALERT_EMAIL
    log "Alerta enviado: $subject"
}

# Verificar backups recentes
check_recent_backups() {
    log "Verificando backups recentes"
    
    # Verificar backup do banco (últimas 24 horas)
    DB_BACKUP=$(find $BACKUP_DIR -name "postgres_*.dump" -mtime -1 | wc -l)
    
    if [ $DB_BACKUP -eq 0 ]; then
        send_alert "ALERTA: Backup do banco não encontrado" \
          "Nenhum backup do banco de dados foi encontrado nas últimas 24 horas."
        return 1
    fi
    
    # Verificar backup da aplicação (últimas 24 horas)
    APP_BACKUP=$(find $BACKUP_DIR -name "app_*.tar.gz" -mtime -1 | wc -l)
    
    if [ $APP_BACKUP -eq 0 ]; then
        send_alert "ALERTA: Backup da aplicação não encontrado" \
          "Nenhum backup da aplicação foi encontrado nas últimas 24 horas."
        return 1
    fi
    
    log "Backups recentes encontrados: DB=$DB_BACKUP, APP=$APP_BACKUP"
    return 0
}

# Verificar integridade dos backups
check_backup_integrity() {
    log "Verificando integridade dos backups"
    
    # Verificar backup mais recente do banco
    LATEST_DB_BACKUP=$(find $BACKUP_DIR -name "postgres_*.dump" | sort | tail -1)
    
    if [ -n "$LATEST_DB_BACKUP" ]; then
        # Verificar se o arquivo não está corrompido
        if pg_restore --list "$LATEST_DB_BACKUP" > /dev/null 2>&1; then
            log "Backup do banco íntegro: $LATEST_DB_BACKUP"
        else
            send_alert "ALERTA: Backup do banco corrompido" \
              "O backup do banco de dados $LATEST_DB_BACKUP está corrompido."
            return 1
        fi
    fi
    
    # Verificar backup mais recente da aplicação
    LATEST_APP_BACKUP=$(find $BACKUP_DIR -name "app_*.tar.gz" | sort | tail -1)
    
    if [ -n "$LATEST_APP_BACKUP" ]; then
        # Verificar se o arquivo não está corrompido
        if tar -tzf "$LATEST_APP_BACKUP" > /dev/null 2>&1; then
            log "Backup da aplicação íntegro: $LATEST_APP_BACKUP"
        else
            send_alert "ALERTA: Backup da aplicação corrompido" \
              "O backup da aplicação $LATEST_APP_BACKUP está corrompido."
            return 1
        fi
    fi
    
    return 0
}

# Verificar espaço em disco
check_disk_space() {
    log "Verificando espaço em disco"
    
    # Verificar espaço no diretório de backup
    DISK_USAGE=$(df $BACKUP_DIR | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ $DISK_USAGE -gt 80 ]; then
        send_alert "ALERTA: Espaço em disco baixo" \
          "O espaço em disco no diretório de backup está em ${DISK_USAGE}%."
        return 1
    fi
    
    log "Espaço em disco OK: ${DISK_USAGE}%"
    return 0
}

# Função principal
main() {
    log "Iniciando monitoramento de backup"
    
    # Verificar backups recentes
    check_recent_backups
    
    # Verificar integridade
    check_backup_integrity
    
    # Verificar espaço em disco
    check_disk_space
    
    log "Monitoramento de backup concluído"
}

# Executar
main "$@"
```

### 10. Projeto Prático: Sistema de Backup Completo

#### Estrutura do Projeto
```
backup-system/
├── docker-compose.yml
├── scripts/
│   ├── backup-postgres.sh
│   ├── backup-app.sh
│   ├── disaster-recovery.sh
│   ├── test-recovery.sh
│   └── monitor-backup.sh
├── configs/
│   ├── crontab
│   └── backup.conf
└── docs/
    ├── disaster-recovery-plan.md
    └── backup-procedures.md
```

#### Configuração do Crontab
```bash
# /etc/crontab
# Backup diário às 2:00 AM
0 2 * * * root /scripts/backup-postgres.sh >> /var/log/backup.log 2>&1
0 3 * * * root /scripts/backup-app.sh >> /var/log/backup.log 2>&1

# Backup semanal aos domingos às 1:00 AM
0 1 * * 0 root /scripts/backup-weekly.sh >> /var/log/backup.log 2>&1

# Monitoramento a cada 6 horas
0 */6 * * * root /scripts/monitor-backup.sh >> /var/log/backup-monitor.log 2>&1

# Teste de recuperação semanal
0 4 * * 0 root /scripts/test-recovery.sh >> /var/log/test-recovery.log 2>&1
```

#### Documentação de Procedimentos
```markdown
# Procedimentos de Backup

## Backup Diário
1. Executar backup do banco de dados
2. Executar backup da aplicação
3. Verificar integridade dos backups
4. Enviar backups para nuvem
5. Limpar backups antigos

## Backup Semanal
1. Executar backup completo
2. Testar recuperação
3. Verificar espaço em disco
4. Gerar relatório de backup

## Em Caso de Desastre
1. Avaliar a situação
2. Ativar plano de disaster recovery
3. Restaurar serviços críticos
4. Verificar integridade dos dados
5. Comunicar status para stakeholders
```

## 🎯 Exercícios Práticos

### Exercício 1: Backup de Banco de Dados
1. Configure backup automático do PostgreSQL
2. Implemente verificação de integridade
3. Configure retenção de backups

### Exercício 2: Backup em Nuvem
1. Configure backup para AWS S3
2. Implemente lifecycle policies
3. Teste restauração a partir da nuvem

### Exercício 3: Disaster Recovery
1. Crie um plano de disaster recovery
2. Implemente script de recuperação
3. Teste o procedimento completo

### Exercício 4: Monitoramento
1. Configure monitoramento de backups
2. Implemente alertas por email
3. Crie relatórios de backup

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Conceitos**: Backup e disaster recovery
2. **Estratégias**: Tipos de backup e retenção
3. **Bancos de Dados**: Backup de PostgreSQL, MySQL, MongoDB
4. **Aplicações**: Backup de código e configurações
5. **Nuvem**: Backup para AWS S3 e Google Cloud
6. **Disaster Recovery**: Planos e procedimentos
7. **Automação**: Scripts e cronogramas
8. **Testes**: Validação de backups
9. **Monitoramento**: Alertas e verificações
10. **Documentação**: Procedimentos e planos

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- **Segurança em Produção**: Hardening e proteção
- **Compliance**: Conformidade e auditoria
- **Cost Optimization**: Otimização de custos
- **Performance**: Tuning e otimização
- **Manutenção**: Procedimentos de manutenção

## 📚 Recursos Adicionais

- [PostgreSQL Backup Documentation](https://www.postgresql.org/docs/current/backup.html)
- [AWS S3 Backup Guide](https://docs.aws.amazon.com/s3/)
- [Google Cloud Storage](https://cloud.google.com/storage/docs)
- [Disaster Recovery Planning](https://www.ready.gov/business/implementation/continuity)
- [Backup Best Practices](https://www.backupassist.com/blog/backup-best-practices/)

---

**🎉 Parabéns!** Você completou a Aula 5 do Módulo 7. Continue praticando e explore as possibilidades do backup e disaster recovery!







