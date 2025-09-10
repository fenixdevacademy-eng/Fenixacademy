#!/bin/bash

echo "========================================"
echo "  Fenix IDE 2.0 Desktop - Instalador"
echo "========================================"
echo

echo "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js não encontrado!"
    echo "Por favor, instale o Node.js de https://nodejs.org/"
    exit 1
fi

echo "Node.js encontrado: $(node --version)"
echo

echo "Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências!"
    exit 1
fi

echo
echo "========================================"
echo "  Instalação concluída com sucesso!"
echo "========================================"
echo
echo "Para executar o Fenix IDE 2.0 Desktop:"
echo "  npm start"
echo
echo "Para modo de desenvolvimento:"
echo "  npm run dev"
echo
echo "Para construir o aplicativo:"
echo "  npm run build"
echo







