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
    if df.empty:
        return {"total": 0.0, "materiales": []}

    fecha_corte = df["fecha"].max() - pd.Timedelta(days=DIAS_INMOVILIZADO)

    ultima_salida = (
        df[df["tipo"].isin(TIPOS_SALIDA)]
        .groupby("material")["fecha"]
        .max()
    )

    inv = _inventario_valorizado(df)
    materiales_inmovilizados = []

    for mat, datos in inv["por_material"].items():
        if datos["valor"] <= 0:
            continue

        ultima = ultima_salida.get(mat)
        if ultima is None or ultima < fecha_corte:
            dias = (
                int((df["fecha"].max() - ultima).days) if ultima is not None
                else DIAS_INMOVILIZADO
            )
            materiales_inmovilizados.append({
                "material": mat,
                "dias_sin_rotacion": dias,
                "valor_inmovilizado": datos["valor"],
                "cantidad": datos["cantidad"],
            })

    total = sum(m["valor_inmovilizado"] for m in materiales_inmovilizados)
    return {"total": round(total, 2), "materiales": materiales_inmovilizados}


def _analisis_consumo(df: pd.DataFrame, consumo_esperado: dict[str, float]) -> dict[str, Any]:
    consumo_real = (
        df[df["tipo"].isin(TIPOS_SALIDA)]
        .groupby("material")["cantidad"]
        .sum()
    )

    if not consumo_esperado:
        # Fallback: esperado = media de consumo diario * días del periodo
        dias = max((df["fecha"].max() - df["fecha"].min()).days, 1) if not df.empty else 1
        consumo_diario = (
            df[df["tipo"].isin(TIPOS_SALIDA)]
            .groupby(["material", df["fecha"].dt.date])["cantidad"]
            .sum()
            .groupby("material")
            .mean()
        )
        esperado_serie = (consumo_diario * dias).round(4)
    else:
        esperado_serie = pd.Series(consumo_esperado)

    materiales = consumo_real.index.union(esperado_serie.index)
    real = consumo_real.reindex(materiales, fill_value=0)
    esperado = esperado_serie.reindex(materiales, fill_value=0)

    desviacion = np.where(
        esperado > 0,
        ((real - esperado) / esperado * 100).round(2),
        0.0,
    )

    por_material = {
        mat: {
            "consumo_real": float(real[mat]),
            "consumo_esperado": float(esperado[mat]),
            "desviacion_pct": float(desviacion[i]),
            "exceso": float(max(real[mat] - esperado[mat], 0)),
        }
        for i, mat in enumerate(materiales)
    }

    return {"por_material": por_material}


def _perdidas_operativas(df: pd.DataFrame) -> dict[str, Any]:
    """
    Desperdicio y ajustes negativos valorados en dinero.
    """
    perdidas = df[df["tipo"].isin(TIPOS_PERDIDA)].copy()
    perdidas["valor"] = perdidas["cantidad"] * perdidas["costo_unitario"]

    por_tipo = perdidas.groupby("tipo")["valor"].sum().round(2).to_dict()
    por_material = perdidas.groupby("material")["valor"].sum().round(2).to_dict()
    total = float(perdidas["valor"].sum())

    return {
        "total": round(total, 2),
        "por_tipo": por_tipo,
        "por_material": por_material,
    }


def _resumen_por_etapa(df: pd.DataFrame) -> dict[str, Any]:
    perdidas_etapa = (
        df[df["tipo"].isin(TIPOS_PERDIDA)]
        .groupby("etapa")["valor"]
        .sum()
        .round(2)
        .to_dict()
    )
    consumo_etapa = (
        df[df["tipo"].isin(TIPOS_SALIDA)]
        .groupby("etapa")["valor"]
        .sum()
        .round(2)
        .to_dict()
    )
    return {"perdidas": perdidas_etapa, "consumo": consumo_etapa}