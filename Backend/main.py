# main.py — Oliver + Emmanuel

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.api import router
from services import history


@asynccontextmanager
async def lifespan(app: FastAPI):
    history.init_tablas()
    yield


app = FastAPI(title="OperaLens API", lifespan=lifespan)

# CORS: frontend y backend corren en puertos distintos → el browser bloquea
# cualquier fetch sin estos headers.
# allow_origin_regex cubre localhost:3000, 127.0.0.1:3000, localhost:5173, etc.
# En producción sobreescribir con CORS_ORIGINS=https://tu-dominio.com
_explicit = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_explicit or ["*"],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def health():
    return {"status": "ok", "service": "OperaLens API"}
