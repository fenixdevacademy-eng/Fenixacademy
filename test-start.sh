#!/bin/bash

echo "=== Testando inicialização dos containers ==="

# Parar tudo
echo "1. Parando containers..."
/usr/bin/docker-compose down

# Iniciar apenas banco e redis
echo "2. Iniciando banco e redis..."
/usr/bin/docker-compose up -d db redis

# Aguardar
echo "3. Aguardando 10 segundos..."
sleep 10

# Verificar status
echo "4. Status dos containers:"
docker ps

# Testar conexão com banco
echo "5. Testando conexão com banco..."
docker exec fenixdevacademy_db_1 pg_isready -U fenix -d fenix

echo "=== Teste concluído ===" 