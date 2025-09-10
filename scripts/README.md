# 🎓 Gerador Automático de Aulas - Web Fundamentals

Este conjunto de scripts automatiza a criação das 72 aulas do curso web-fundamentals com o mesmo padrão de qualidade e estrutura detalhada.

## 📁 Arquivos

- **`generate_lessons.py`** - Script principal que gera todas as aulas
- **`run_generator.py`** - Script de execução simplificado
- **`verify_lessons.py`** - Script para verificar o status das aulas
- **`README.md`** - Este arquivo de instruções

## 🚀 Como Usar

### 1. Executar o Gerador

```bash
# Opção 1: Executar diretamente
python scripts/generate_lessons.py

# Opção 2: Usar o script de execução
python scripts/run_generator.py
```

### 2. Verificar o Status

```bash
python scripts/verify_lessons.py
```

## 📚 Estrutura das Aulas

Cada aula gerada inclui:

1. **Introdução** - Conceitos fundamentais e características
2. **Arquitetura** - Implementação detalhada com código JavaScript
3. **Implementação Prática** - Configuração, validação e ambiente
4. **Estudo de Caso Brasileiro** - Contexto nacional com validações CPF/CNPJ
5. **Exercícios Práticos** - Implementações hands-on
6. **Conclusão** - Resumo dos conceitos abordados

## 🎯 Aulas a Serem Criadas

### Já Existentes (1-21):
- ✅ Aula 01: Introdução ao Desenvolvimento Web Moderno
- ✅ Aula 02: Arquitetura Web e Protocolos Fundamentais
- ✅ Aula 03: HTML5 Semântico e Acessibilidade
- ✅ Aula 04: CSS3 Avançado e Layouts Modernos
- ✅ Aula 05: JavaScript ES6+ e Padrões Modernos
- ✅ Aula 06: Performance Web e Otimização
- ✅ Aula 07: APIs e Integrações
- ✅ Aula 08: Segurança Web e Boas Práticas
- ✅ Aula 09: Desenvolvimento de APIs RESTful Avançadas e GraphQL
- ✅ Aula 10: Desenvolvimento Frontend Avançado e Componentização
- ✅ Aula 11: Testes e Qualidade de Código Frontend
- ✅ Aula 12: Deploy e DevOps para Frontend
- ✅ Aula 13: Progressive Web Apps (PWAs)
- ✅ Aula 14: WebAssembly e Performance Avançada
- ✅ Aula 15: Micro-frontends e Arquitetura Distribuída
- ✅ Aula 16: Acessibilidade Web Avançada
- ✅ Aula 17: SEO Avançado e Performance
- ✅ Aula 18: Monitoramento e Analytics Avançados
- ✅ Aula 19: Arquitetura de Microsserviços para Frontend
- ✅ Aula 20: Otimização de Performance para Aplicações Web
- ✅ Aula 21: Desenvolvimento de APIs RESTful Avançadas

### A Serem Criadas (22-72):
- 🔄 Aula 22: GraphQL e APIs Modernas
- 🔄 Aula 23: WebSockets e Comunicação em Tempo Real
- 🔄 Aula 24: Arquitetura de Microsserviços
- 🔄 Aula 25: Docker e Containerização
- 🔄 Aula 26: Kubernetes e Orquestração
- 🔄 Aula 27: CI/CD e Pipeline de Deploy
- 🔄 Aula 28: Monitoramento e Observabilidade
- 🔄 Aula 29: Logs Centralizados e Análise
- 🔄 Aula 30: Métricas e Alertas
- 🔄 Aula 31: Tracing Distribuído
- 🔄 Aula 32: Segurança em Microsserviços
- 🔄 Aula 33: API Gateway e Service Mesh
- 🔄 Aula 34: Event Sourcing e CQRS
- 🔄 Aula 35: Saga Pattern e Transações Distribuídas
- 🔄 Aula 36: Circuit Breaker e Resilience Patterns
- 🔄 Aula 37: Rate Limiting e Throttling
- 🔄 Aula 38: Cache Distribuído
- 🔄 Aula 39: Message Queues e Event Streaming
- 🔄 Aula 40: Kafka e Apache Pulsar
- 🔄 Aula 41: Redis e Memcached
- 🔄 Aula 42: Elasticsearch e Busca
- 🔄 Aula 43: MongoDB e NoSQL
- 🔄 Aula 44: PostgreSQL e Bancos Relacionais
- 🔄 Aula 45: Migrations e Versionamento de Schema
- 🔄 Aula 46: Backup e Recuperação
- 🔄 Aula 47: Sharding e Replicação
- 🔄 Aula 48: Performance de Banco de Dados
- 🔄 Aula 49: Índices e Otimização de Queries
- 🔄 Aula 50: Connection Pooling
- 🔄 Aula 51: Transações e Consistência
- 🔄 Aula 52: Deadlocks e Concorrência
- 🔄 Aula 53: Monitoramento de Banco
- 🔄 Aula 54: Segurança de Dados
- 🔄 Aula 55: Criptografia e Hashing
- 🔄 Aula 56: Auditoria e Compliance
- 🔄 Aula 57: GDPR e LGPD
- 🔄 Aula 58: Testes de Performance
- 🔄 Aula 59: Load Testing e Stress Testing
- 🔄 Aula 60: JMeter e K6
- 🔄 Aula 61: Profiling e Otimização
- 🔄 Aula 62: Memory Leaks e Garbage Collection
- 🔄 Aula 63: CPU Profiling
- 🔄 Aula 64: Network Profiling
- 🔄 Aula 65: Database Profiling
- 🔄 Aula 66: Frontend Performance
- 🔄 Aula 67: Backend Performance
- 🔄 Aula 68: Infrastructure Performance
- 🔄 Aula 69: Cloud Computing
- 🔄 Aula 70: AWS e Serviços
- 🔄 Aula 71: Azure e Serviços
- 🔄 Aula 72: Google Cloud Platform

## ✨ Características

- **Padrão de Qualidade**: Todas as aulas seguem o mesmo padrão de qualidade
- **Estrutura Consistente**: Formato padronizado com seções bem definidas
- **Código JavaScript**: Implementações práticas com código funcional
- **Contexto Brasileiro**: Validações CPF/CNPJ, PIX, LGPD
- **3000+ Palavras**: Cada aula tem conteúdo detalhado e completo
- **Exercícios Práticos**: Implementações hands-on para fixar o aprendizado

## 🔧 Requisitos

- Python 3.7+
- Acesso ao diretório `backend/fenix-expanded-content/web-fundamentals/avancado`

## 📝 Exemplo de Saída

```
🎓 GERADOR AUTOMÁTICO DE AULAS - WEB FUNDAMENTALS
============================================================
🚀 Iniciando geração automática das aulas...
📚 Aulas já existentes: 21
🎯 Total de aulas a serem criadas: 51
📊 Total final: 72 aulas

📝 Criando Aula 22: GraphQL e APIs Modernas
✅ Aula 22 criada: modulo-22-avancado-web-fundamentals.md

📝 Criando Aula 23: WebSockets e Comunicação em Tempo Real
✅ Aula 23 criada: modulo-23-avancado-web-fundamentals.md

...

🎉 GERAÇÃO CONCLUÍDA!
✅ Aulas criadas com sucesso: 51
❌ Erros: 0
📊 Total de aulas: 72
```

## 🎯 Próximos Passos

1. Execute o gerador: `python scripts/run_generator.py`
2. Verifique o status: `python scripts/verify_lessons.py`
3. Revise as aulas geradas no diretório de destino
4. Personalize o conteúdo conforme necessário

## 🚨 Notas Importantes

- O script preserva as aulas já existentes
- Cada aula é criada com conteúdo único baseado no título
- O processo pode levar alguns minutos para completar
- Verifique sempre o status após a execução

---

**🎉 Boa sorte com suas aulas!**












