@echo off
echo Atualizando o repositório Git...
git add src/pages/Dashboard.tsx src/contexts/TransactionContext.tsx
git commit -m "fix: melhora tratamento de autenticação"
git push origin main
echo Atualização concluída!
pause 