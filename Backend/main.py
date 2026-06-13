# main.py — Oliver + Emmanuel

from contextlib import asynccontextmanager

from fastapi import FastAPI

from routers.api import router
from services import history


@asynccontextmanager
async def lifespan(app: FastAPI):
    history.init_tablas()
    yield


app = FastAPI(title="OperaLens API", lifespan=lifespan)

app.include_router(router)