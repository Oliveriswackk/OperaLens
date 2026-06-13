import pandas as pd
import numpy as np
from datetime import datetime
from typing import Any

TIPOS_ENTRADA = {"entrada"}
TIPOS_SALIDA = {"salida", "produccion"}
TIPOS_PERDIDA = {"desperdicio", "ajuste"}

DIAS_INMOVILIZADO = 30  # días sin rotación para considerar capital inmovilizado


def analyze(df: pd.DataFrame, consumo_esperado: dict[str, float] | None = None) -> dict[str, Any]:
    df = _preparar(df)
    return {
        "inventario_valorizado": _inventario_valorizado(df),
        "capital_inmovilizado": _capital_inmovilizado(df),
        "consumo": _analisis_consumo(df, consumo_esperado or {}),
        "perdidas_operativas": _perdidas_operativas(df),
        "resumen_etapas": _resumen_por_etapa(df),
        "fecha_analisis": datetime.utcnow().isoformat(),
        "periodo": {
            "inicio": df["fecha"].min().isoformat() if not df.empty else None,
            "fin": df["fecha"].max().isoformat() if not df.empty else None,
        },
    }

def _preparar(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["fecha"] = pd.to_datetime(df["fecha"])
    df["cantidad"] = pd.to_numeric(df["cantidad"], errors="coerce").fillna(0)
    df["costo_unitario"] = pd.to_numeric(df["costo_unitario"], errors="coerce").fillna(0)
    df["valor"] = df["cantidad"] * df["costo_unitario"]
    df["tipo"] = df["tipo"].str.lower().str.strip()
    return df

def _inventario_valorizado(df: pd.DataFrame) -> dict[str, Any]:

    entradas = df[df["tipo"].isin(TIPOS_ENTRADA)].groupby("material")["cantidad"].sum()
    salidas = df[df["tipo"].isin(TIPOS_SALIDA)].groupby("material")["cantidad"].sum()
    costo_prom = df.groupby("material")["costo_unitario"].mean()

    materiales = entradas.index.union(salidas.index)
    stock = (entradas.reindex(materiales, fill_value=0) - salidas.reindex(materiales, fill_value=0))
    stock = stock.clip(lower=0) 

    valor_por_material = (stock * costo_prom.reindex(materiales, fill_value=0)).round(2)
    total = float(valor_por_material.sum())

    por_material = {
        mat: {
            "cantidad": float(stock[mat]),
            "costo_unitario_promedio": float(costo_prom.get(mat, 0)),
            "valor": float(valor_por_material[mat]),
        }
        for mat in materiales
    }

    return {"total": total, "por_material": por_material}


def _capital_inmovilizado(df):
    pass


def _analisis_consumo(df, param):
    pass


def _perdidas_operativas(df):
    pass


def _resumen_por_etapa(df):
    pass