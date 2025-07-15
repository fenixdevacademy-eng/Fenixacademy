#!/bin/bash

# Script para executar Fenix Dev Academy em modo leve
# Otimizado para OptiPlex 760

echo "🚀 Iniciando Fenix Dev Academy (Modo Leve)"

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose -f docker-compose.light.yml down

# Limpar imagens não utilizadas para economizar espaço
echo "🧹 Limpando imagens não utilizadas..."
docker system prune -f

# Construir e iniciar containers
echo "🔨 Construindo containers..."
docker-compose -f docker-compose.light.yml build --no-cache

echo "▶️ Iniciando serviços..."
docker-compose -f docker-compose.light.yml up -d

# Aguardar serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

# Verificar status
echo "📊 Status dos containers:"
docker-compose -f docker-compose.light.yml ps

echo ""
echo "✅ Fenix Dev Academy iniciado!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "🗄️ Database: localhost:5432"
echo ""
echo "📝 Para ver logs: docker-compose -f docker-compose.light.yml logs -f"
echo "🛑 Para parar: docker-compose -f docker-compose.light.yml down" 