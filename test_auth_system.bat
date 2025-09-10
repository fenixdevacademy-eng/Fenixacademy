@echo off
echo 🔐 Testando Sistema de Autenticação da Fenix Academy
echo.

echo 📋 Fluxo de Teste:
echo.
echo 1. Acesse: http://localhost:3000
echo 2. Tente acessar: http://localhost:3000/course/1 (será redirecionado para login)
echo 3. Registre-se em: http://localhost:3000/auth/register
echo 4. Faça login em: http://localhost:3000/auth/login
echo 5. Compre um curso em: http://localhost:3000/payment
echo 6. Acesse o curso em: http://localhost:3000/course/1
echo.

echo 🚀 Iniciando servidor...
cd frontend
npm run dev 