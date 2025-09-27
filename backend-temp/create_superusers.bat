@echo off
echo ========================================
echo    Criando Super Usuarios - Fenix Academy
echo ========================================
echo.

cd /d "%~dp0"

echo Executando comando de criacao de super usuarios...
python manage.py create_superusers

echo.
echo ========================================
echo    Comando concluido!
echo ========================================
pause 