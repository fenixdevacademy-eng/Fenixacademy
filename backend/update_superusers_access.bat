@echo off
echo ========================================
echo    Atualizando Acesso dos Super Usuarios
echo ========================================
echo.

cd /d "%~dp0"

echo Executando comando de atualizacao de acesso...
python manage.py update_superusers_access

echo.
echo ========================================
echo    Comando concluido!
echo ========================================
pause 