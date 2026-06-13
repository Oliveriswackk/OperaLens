#Emmanuel Gonzalez Hernandez

import json
import os
import sqlite3
import pandas as pd
from datetime import datetime
from pathlib import Path
from typing import Any

# Docker: DB_PATH=/app/db.sqlite via env var
# Local dev: Backend/db.sqlite (junto a main.py)
_default_db = Path(__file__).resolve().parent.parent / "db.sqlite"
DB_PATH = Path(os.getenv("DB_PATH", str(_default_db)))


def get_connection() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_tablas() -> None:
    with get_connection() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS analisis_historico (
                id                    INTEGER PRIMARY KEY AUTOINCREMENT,
                fecha_carga           TEXT    NOT NULL,
                periodo_inicio        TEXT,
                periodo_fin           TEXT,
                total_perdidas        REAL    DEFAULT 0,
                capital_inmovilizado  REAL    DEFAULT 0,
                inventario_valorizado REAL    DEFAULT 0,
                anomalias_count       INTEGER DEFAULT 0,
                payload               TEXT
            );

            CREATE TABLE IF NOT EXISTS movimientos_historicos (
                id             INTEGER PRIMARY KEY AUTOINCREMENT,
                fecha_carga    TEXT NOT NULL,
                fecha          TEXT NOT NULL,
                tipo           TEXT NOT NULL,
                material       TEXT NOT NULL,
                cantidad       REAL NOT NULL,
                costo_unitario REAL NOT NULL,
                etapa          TEXT
            );

            CREATE INDEX IF NOT EXISTS idx_mov_material ON movimientos_historicos(material);
            CREATE INDEX IF NOT EXISTS idx_mov_fecha    ON movimientos_historicos(fecha);
        """)


# ---------------------------------------------------------------------------
# Escritura
# ---------------------------------------------------------------------------

def guardar_analisis(analisis: dict[str, Any], anomalias: list[dict]) -> int:
    row = {
        "fecha_carga": datetime.utcnow().isoformat(),
        "periodo_inicio": analisis.get("periodo", {}).get("inicio"),
        "periodo_fin": analisis.get("periodo", {}).get("fin"),
        "total_perdidas": analisis.get("perdidas_operativas", {}).get("total", 0),
        "capital_inmovilizado": analisis.get("capital_inmovilizado", {}).get("total", 0),
        "inventario_valorizado": analisis.get("inventario_valorizado", {}).get("total", 0),
        "anomalias_count": len(anomalias),
        "payload": json.dumps({"analisis": analisis, "anomalias": anomalias}, ensure_ascii=False),
    }

    with get_connection() as conn:
        cur = conn.execute(
            """
            INSERT INTO analisis_historico
                (fecha_carga, periodo_inicio, periodo_fin, total_perdidas,
                 capital_inmovilizado, inventario_valorizado, anomalias_count, payload)
            VALUES
                (:fecha_carga, :periodo_inicio, :periodo_fin, :total_perdidas,
                 :capital_inmovilizado, :inventario_valorizado, :anomalias_count, :payload)
            """,
            row,
        )
        return cur.lastrowid


def guardar_movimientos(df: pd.DataFrame) -> None:
    cols = ["fecha", "tipo", "material", "cantidad", "costo_unitario", "etapa"]
    fecha_carga = datetime.utcnow().isoformat()

    filas = [
        (
            fecha_carga,
            str(row.fecha),
            row.tipo,
            row.material,
            float(row.cantidad),
            float(row.costo_unitario),
            row.etapa,
        )
        for row in df[cols].itertuples(index=False)
    ]

    with get_connection() as conn:
        conn.executemany(
            """
            INSERT INTO movimientos_historicos
                (fecha_carga, fecha, tipo, material, cantidad, costo_unitario, etapa)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            filas,
        )


# ---------------------------------------------------------------------------
# Lectura
# ---------------------------------------------------------------------------

def obtener_historial(limite: int = 10) -> list[dict]:
    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT id, fecha_carga, periodo_inicio, periodo_fin,
                   total_perdidas, capital_inmovilizado, inventario_valorizado,
                   anomalias_count
            FROM analisis_historico
            ORDER BY fecha_carga DESC
            LIMIT ?
            """,
            (limite,),
        ).fetchall()
    return [dict(r) for r in rows]


def obtener_analisis_por_id(analisis_id: int) -> dict | None:
    with get_connection() as conn:
        row = conn.execute(
            "SELECT payload FROM analisis_historico WHERE id = ?", (analisis_id,)
        ).fetchone()
    if not row:
        return None
    return json.loads(row["payload"])


def obtener_movimientos_historicos(material: str | None = None, ultimos_dias: int = 90) -> pd.DataFrame:
    query = """
        SELECT fecha, tipo, material, cantidad, costo_unitario, etapa
        FROM movimientos_historicos
        WHERE fecha >= date('now', ? || ' days')
    """
    params: list[Any] = [f"-{ultimos_dias}"]

    if material:
        query += " AND material = ?"
        params.append(material)

    with get_connection() as conn:
        df = pd.read_sql_query(query, conn, params=params, parse_dates=["fecha"])

    return df


def tendencia_perdidas(ultimos_n: int = 6) -> list[dict]:
    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT fecha_carga, total_perdidas, capital_inmovilizado,
                   inventario_valorizado, anomalias_count
            FROM analisis_historico
            ORDER BY fecha_carga DESC
            LIMIT ?
            """,
            (ultimos_n,),
        ).fetchall()

    return list(reversed([dict(r) for r in rows]))
