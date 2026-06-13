from fastapi import FastAPI
from routers import api
from database.db import init_db

app = FastAPI(title="OperaLens", version="0.1.0")

app.include_router(api.router, prefix="/api")


@app.on_event("startup")
async def startup():
    init_db()


@app.get("/health")
def health():
    return {"status": "ok"}
