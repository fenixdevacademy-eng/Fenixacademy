#!/bin/bash
set -e

echo "Instalando dependências do backend..."
cd backend && pip install -r requirements.txt && cd ..

echo "Instalando dependências do frontend..."
cd frontend && npm install && cd ..

echo "Setup concluído!" 