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

# CORS obligatorio: frontend (puerto 3000) y backend (puerto 8000) son orígenes distintos.
# El navegador bloquea cualquier fetch cross-origin sin estos headers.
_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
