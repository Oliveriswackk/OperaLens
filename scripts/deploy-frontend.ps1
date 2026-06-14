# Despliega el frontend en el servidor remoto via SSH (solo frontend, sin tocar backend).
# Requiere: Tailscale conectado y acceso SSH al host 100.70.124.108
param(
    [string]$Server = "100.70.124.108",
    [string]$User = "",
    [string]$RepoPath = "~/OperaLens"
)

if (-not $User) {
    Write-Host "Uso: .\deploy-frontend.ps1 -User TU_USUARIO_SSH [-Server 100.70.124.108] [-RepoPath ~/OperaLens]"
    Write-Host ""
    Write-Host "Ejemplo (con Tailscale conectado):"
    Write-Host "  .\scripts\deploy-frontend.ps1 -User ubuntu"
    exit 1
}

$remote = "${User}@${Server}"
$cmd = "cd $RepoPath && git pull origin main && docker compose build frontend --no-cache && docker compose up frontend -d && docker compose ps frontend"

Write-Host "==> Desplegando frontend en $Server (solo frontend)..."
ssh $remote $cmd
Write-Host "==> Listo. Abre http://${Server}:3000"
