@echo off
echo Atualizando o repositório Git...
git add .
git commit -m "Atualização automática: %date% %time%"
git push
echo Atualização concluída!
pause 