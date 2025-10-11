@echo off
echo ========================================
echo    CONFIGURACAO DO BANCO DE DADOS
echo    FENIX ACADEMY - BACKEND DJANGO
echo ========================================
echo.

echo [1/4] Verificando dependencias...
cd backend-temp

echo [2/4] Instalando dependencias Python...
pip install -r requirements.txt

echo [3/4] Executando migracoes e criando dados de exemplo...
python setup_database.py

echo [4/4] Iniciando servidor Django...
echo.
echo ========================================
echo    SERVIDOR INICIADO COM SUCESSO!
echo ========================================
echo.
echo Backend Django: http://localhost:8000
echo API: http://localhost:8000/api/v1/
echo Admin: http://localhost:8000/admin/
echo Documentacao: http://localhost:8000/api/docs/
echo.
echo Usuario admin: admin
echo Senha admin: admin123
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================

python run_server.py



















