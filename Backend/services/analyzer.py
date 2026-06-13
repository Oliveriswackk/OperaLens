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

def _preparar(df):
    pass

def _inventario_valorizado(df):
    pass


def _capital_inmovilizado(df):
    pass


def _analisis_consumo(df, param):
    pass


def _perdidas_operativas(df):
    pass


def _resumen_por_etapa(df):
    pass