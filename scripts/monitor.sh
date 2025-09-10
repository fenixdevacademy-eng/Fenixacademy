#!/bin/bash

# 📊 Script de Monitoramento - Fenix Academy
# Monitora saúde, performance e disponibilidade dos serviços

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
DOMAIN="fenix-academy.com"
API_URL="https://api.fenix-academy.com"
CDN_URL="https://cdn.fenix-academy.com"
ADMIN_EMAIL="admin@fenix-academy.com"
SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"

# Thresholds
MAX_RESPONSE_TIME=2000  # 2 segundos
MIN_UPTIME=99.9         # 99.9%
MAX_ERROR_RATE=1        # 1%

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar uptime de um serviço
check_uptime() {
    local url=$1
    local service_name=$2
    
    log "Verificando uptime de $service_name..."
    
    local start_time=$(date +%s%3N)
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    local end_time=$(date +%s%3N)
    local response_time=$((end_time - start_time))
    
    if [ "$response" = "200" ]; then
        success "$service_name: OK (${response_time}ms)"
        return 0
    else
        error "$service_name: FALHOU (HTTP $response, ${response_time}ms)"
        return 1
    fi
}

# Verificar performance
check_performance() {
    local url=$1
    local service_name=$2
    
    log "Verificando performance de $service_name..."
    
    local start_time=$(date +%s%3N)
    curl -s "$url" > /dev/null
    local end_time=$(date +%s%3N)
    local response_time=$((end_time - start_time))
    
    if [ $response_time -lt $MAX_RESPONSE_TIME ]; then
        success "$service_name: Performance OK (${response_time}ms)"
        return 0
    else
        warning "$service_name: Performance lenta (${response_time}ms > ${MAX_RESPONSE_TIME}ms)"
        return 1
    fi
}

# Verificar SSL
check_ssl() {
    local domain=$1
    
    log "Verificando SSL de $domain..."
    
    local ssl_info=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        local not_after=$(echo "$ssl_info" | grep "notAfter" | cut -d= -f2)
        local expiry_date=$(date -d "$not_after" +%s)
        local current_date=$(date +%s)
        local days_until_expiry=$(( (expiry_date - current_date) / 86400 ))
        
        if [ $days_until_expiry -gt 30 ]; then
            success "SSL: OK (expira em $days_until_expiry dias)"
        else
            warning "SSL: Expira em $days_until_expiry dias"
        fi
    else
        error "SSL: Falha na verificação"
    fi
}

# Verificar DNS
check_dns() {
    local domain=$1
    
    log "Verificando DNS de $domain..."
    
    local dns_response=$(dig +short "$domain" | head -1)
    
    if [ ! -z "$dns_response" ]; then
        success "DNS: OK ($dns_response)"
    else
        error "DNS: Falha na resolução"
    fi
}

# Verificar Core Web Vitals
check_core_web_vitals() {
    local url=$1
    
    log "Verificando Core Web Vitals..."
    
    if command -v lighthouse &> /dev/null; then
        local lighthouse_output=$(lighthouse "$url" --output=json --quiet --chrome-flags="--headless" 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            local lcp=$(echo "$lighthouse_output" | jq -r '.audits."largest-contentful-paint".numericValue' 2>/dev/null || echo "0")
            local fid=$(echo "$lighthouse_output" | jq -r '.audits."max-potential-fid".numericValue' 2>/dev/null || echo "0")
            local cls=$(echo "$lighthouse_output" | jq -r '.audits."cumulative-layout-shift".numericValue' 2>/dev/null || echo "0")
            
            # Verificar LCP (< 2.5s)
            if (( $(echo "$lcp < 2500" | bc -l) )); then
                success "LCP: OK (${lcp}ms)"
            else
                warning "LCP: Lento (${lcp}ms > 2500ms)"
            fi
            
            # Verificar FID (< 100ms)
            if (( $(echo "$fid < 100" | bc -l) )); then
                success "FID: OK (${fid}ms)"
            else
                warning "FID: Lento (${fid}ms > 100ms)"
            fi
            
            # Verificar CLS (< 0.1)
            if (( $(echo "$cls < 0.1" | bc -l) )); then
                success "CLS: OK (${cls})"
            else
                warning "CLS: Alto (${cls} > 0.1)"
            fi
        else
            warning "Lighthouse: Falha na execução"
        fi
    else
        warning "Lighthouse não encontrado. Pulando verificação de Core Web Vitals"
    fi
}

# Verificar logs de erro
check_error_logs() {
    log "Verificando logs de erro..."
    
    # Simular verificação de logs (em produção, usar ferramenta real)
    local error_count=0
    
    # Verificar logs do Vercel (se disponível)
    if command -v vercel &> /dev/null; then
        local logs=$(vercel logs --limit=100 2>/dev/null | grep -i error | wc -l)
        error_count=$((error_count + logs))
    fi
    
    if [ $error_count -eq 0 ]; then
        success "Logs: Sem erros recentes"
    else
        warning "Logs: $error_count erros encontrados"
    fi
}

# Verificar uso de recursos
check_resource_usage() {
    log "Verificando uso de recursos..."
    
    # Verificar CPU
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    if (( $(echo "$cpu_usage < 80" | bc -l) )); then
        success "CPU: OK (${cpu_usage}%)"
    else
        warning "CPU: Alto uso (${cpu_usage}%)"
    fi
    
    # Verificar memória
    local mem_usage=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
    if (( $(echo "$mem_usage < 80" | bc -l) )); then
        success "Memória: OK (${mem_usage}%)"
    else
        warning "Memória: Alto uso (${mem_usage}%)"
    fi
    
    # Verificar disco
    local disk_usage=$(df -h / | awk 'NR==2{print $5}' | cut -d'%' -f1)
    if [ $disk_usage -lt 80 ]; then
        success "Disco: OK (${disk_usage}%)"
    else
        warning "Disco: Alto uso (${disk_usage}%)"
    fi
}

# Enviar alerta
send_alert() {
    local message=$1
    local severity=$2
    
    log "Enviando alerta: $message"
    
    # Slack
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        local color="good"
        if [ "$severity" = "warning" ]; then
            color="warning"
        elif [ "$severity" = "error" ]; then
            color="danger"
        fi
        
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"attachments\":[{\"color\":\"$color\",\"text\":\"$message\",\"timestamp\":$(date +%s)}]}" \
            "$SLACK_WEBHOOK_URL" 2>/dev/null || true
    fi
    
    # Email
    echo "$message" | mail -s "Fenix Academy Alert - $severity" "$ADMIN_EMAIL" 2>/dev/null || true
}

# Gerar relatório
generate_report() {
    local report_file="monitoring-report-$(date +%Y%m%d-%H%M%S).txt"
    
    log "Gerando relatório: $report_file"
    
    {
        echo "📊 RELATÓRIO DE MONITORAMENTO - FENIX ACADEMY"
        echo "=============================================="
        echo "Data: $(date)"
        echo "Domínio: $DOMAIN"
        echo ""
        
        echo "🌐 SERVIÇOS:"
        check_uptime "$DOMAIN" "Website Principal"
        check_uptime "$API_URL" "API"
        check_uptime "$CDN_URL" "CDN"
        echo ""
        
        echo "⚡ PERFORMANCE:"
        check_performance "$DOMAIN" "Website Principal"
        check_performance "$API_URL" "API"
        check_performance "$CDN_URL" "CDN"
        echo ""
        
        echo "🔒 SEGURANÇA:"
        check_ssl "$DOMAIN"
        check_dns "$DOMAIN"
        echo ""
        
        echo "📈 CORE WEB VITALS:"
        check_core_web_vitals "$DOMAIN"
        echo ""
        
        echo "📋 LOGS:"
        check_error_logs
        echo ""
        
        echo "💻 RECURSOS:"
        check_resource_usage
        echo ""
        
    } > "$report_file"
    
    success "Relatório gerado: $report_file"
}

# Função principal
main() {
    echo "📊 INICIANDO MONITORAMENTO DA FENIX ACADEMY"
    echo "==========================================="
    
    local errors=0
    
    # Verificar serviços principais
    check_uptime "$DOMAIN" "Website Principal" || ((errors++))
    check_uptime "$API_URL" "API" || ((errors++))
    check_uptime "$CDN_URL" "CDN" || ((errors++))
    
    # Verificar performance
    check_performance "$DOMAIN" "Website Principal" || ((errors++))
    check_performance "$API_URL" "API" || ((errors++))
    check_performance "$CDN_URL" "CDN" || ((errors++))
    
    # Verificar segurança
    check_ssl "$DOMAIN"
    check_dns "$DOMAIN"
    
    # Verificar Core Web Vitals
    check_core_web_vitals "$DOMAIN"
    
    # Verificar logs e recursos
    check_error_logs
    check_resource_usage
    
    # Gerar relatório
    generate_report
    
    # Enviar alertas se necessário
    if [ $errors -gt 0 ]; then
        send_alert "🚨 $errors serviços com problemas detectados!" "error"
    fi
    
    echo ""
    if [ $errors -eq 0 ]; then
        success "MONITORAMENTO CONCLUÍDO - TODOS OS SERVIÇOS OK"
    else
        error "MONITORAMENTO CONCLUÍDO - $errors PROBLEMAS DETECTADOS"
    fi
    echo "==========================================="
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi


