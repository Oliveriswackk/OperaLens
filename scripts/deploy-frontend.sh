#!/usr/bin/env bash
# Despliega solo el frontend en el servidor (100.70.124.108:3000).
# Ejecutar EN EL SERVIDOR, dentro del repo OperaLens. No modifica el backend.
set -euo pipefail

echo "==> Actualizando codigo..."
git pull origin main

echo "==> Reconstruyendo frontend (VITE_API_URL=/api via nginx)..."
docker compose build frontend --no-cache

echo "==> Reiniciando contenedor frontend..."
docker compose up frontend -d

echo "==> Listo. Abre http://100.70.124.108:3000"
docker compose ps frontend
