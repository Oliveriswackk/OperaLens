#Emmanuel Gonzalez Hernandez
import numpy as np
import pandas as pd
from typing import Any

ZSCORE_UMBRAL = 2.0          # desviaciones estándar para z-score
IQR_FACTOR = 1.5             # factor IQR estándar
DESVIACION_CONSUMO_PCT = 20  # % de desviación en consumo para alertar
DIAS_INMOVILIZADO_ALERTA = 30
VALOR_MINIMO_ALERTA = 100    # no generar alertas por montos insignificantes





def detect_anomalies(analisis: dict[str, Any], df_historico: pd.DataFrame | None = None) -> list[dict[str, Any]]:
    anomalias: list[dict[str, Any]] = []

    anomalias += _anomalias_consumo(analisis.get("consumo", {}))
    anomalias += _anomalias_capital_inmovilizado(analisis.get("capital_inmovilizado", {}))
    anomalias += _anomalias_perdidas(analisis.get("perdidas_operativas", {}))

    if df_historico is not None and not df_historico.empty:
        anomalias += _anomalias_vs_historico(analisis, df_historico)

    anomalias.sort(key=lambda a: _peso_severidad(a["severidad"]), reverse=True)
    return anomalias

def _anomalias_consumo(consumo: dict[str, Any]) -> list[dict[str, Any]]:
    por_material = consumo.get("por_material", {})
    if not por_material:
        return []

    # Mediana de desviaciones de todos los materiales del lote.
    # Actúa como proxy de volumen de producción: si todos subieron ~30%,
    # es que hubo más producción ese periodo, no un problema específico.
    desviaciones_lote = [d.get("desviacion_pct", 0) for d in por_material.values()]
    proxy_volumen = float(np.median(desviaciones_lote))

    anomalias = []
    for mat, datos in por_material.items():
        desv = datos.get("desviacion_pct", 0)
        exceso = datos.get("exceso", 0)
        esperado = datos.get("consumo_esperado", 0)

        # Desviación ajustada: lo que no se explica por el volumen general
        desv_relativa = desv - proxy_volumen

        if abs(desv_relativa) < DESVIACION_CONSUMO_PCT:
            continue

        severidad = _severidad_por_desviacion(abs(desv_relativa))
        anomalias.append({
            "tipo": "consumo_excesivo" if desv_relativa > 0 else "consumo_bajo",
            "material": mat,
            "valor": round(exceso, 2),
            "umbral": esperado,
            "desviacion_pct": round(desv, 2),
            "desviacion_relativa_pct": round(desv_relativa, 2),
            "proxy_volumen_pct": round(proxy_volumen, 2),
            "severidad": severidad,
            "descripcion": (
                f"{mat}: consumo {'excede' if desv_relativa > 0 else 'por debajo de'} "
                f"lo esperado en {abs(desv_relativa):.1f}% "
                f"(ajustado por volumen de producción del periodo)"
            ),
        })

    return anomalias


def _anomalias_capital_inmovilizado(capital: dict[str, Any]) -> list[dict[str, Any]]:
    """Materiales con stock sin rotación y valor significativo."""
    anomalias = []

    for item in capital.get("materiales", []):
        valor = item.get("valor_inmovilizado", 0)
        dias = item.get("dias_sin_rotacion", 0)

        if valor < VALOR_MINIMO_ALERTA:
            continue

        if dias >= DIAS_INMOVILIZADO_ALERTA * 2:
            severidad = "alta"
        elif dias >= DIAS_INMOVILIZADO_ALERTA:
            severidad = "media"
        else:
            severidad = "baja"

        anomalias.append({
            "tipo": "stock_inmovilizado",
            "material": item["material"],
            "valor": round(valor, 2),
            "umbral": DIAS_INMOVILIZADO_ALERTA,
            "dias_sin_rotacion": dias,
            "severidad": severidad,
            "descripcion": (
                f"{item['material']}: ${valor:,.2f} inmovilizado "
                f"({dias} días sin rotación)"
            ),
        })

    return anomalias


def _anomalias_perdidas(perdidas: dict[str, Any]) -> list[dict[str, Any]]:
    """Materiales con pérdidas operativas (desperdicio/ajuste) significativas."""
    anomalias = []
    por_material = perdidas.get("por_material", {})

    if not por_material:
        return anomalias

    valores = np.array(list(por_material.values()), dtype=float)
    if len(valores) < 2:
        umbral = valores[0] * 0.5 if len(valores) == 1 else 0
    else:
        q1, q3 = np.percentile(valores, [25, 75])
        iqr = q3 - q1
        umbral = q3 + IQR_FACTOR * iqr

    for mat, valor in por_material.items():
        if valor < VALOR_MINIMO_ALERTA:
            continue
        if valor <= umbral and len(por_material) > 1:
            continue

        media = float(np.mean(valores))
        std = float(np.std(valores))
        zscore = abs((valor - media) / std) if std > 0 else 0

        severidad = "alta" if zscore >= ZSCORE_UMBRAL else "media"
        anomalias.append({
            "tipo": "perdida_operativa",
            "material": mat,
            "valor": round(valor, 2),
            "umbral": round(umbral, 2),
            "zscore": round(zscore, 2),
            "severidad": severidad,
            "descripcion": f"{mat}: pérdida operativa de ${valor:,.2f} (atípica)",
        })

    return anomalias


def _anomalias_vs_historico(
    analisis: dict[str, Any], df_historico: pd.DataFrame
) -> list[dict[str, Any]]:
    """
    Compara costos unitarios actuales contra distribución histórica.
    Detecta picos de precio atípicos.
    """
    anomalias = []

    if "costo_unitario" not in df_historico.columns or "material" not in df_historico.columns:
        return anomalias

    for mat, grupo in df_historico.groupby("material"):
        costos = grupo["costo_unitario"].dropna().values
        if len(costos) < 3:
            continue

        media = float(np.mean(costos))
        std = float(np.std(costos))
        if std == 0:
            continue

        # Costo actual del inventario para este material
        inv = analisis.get("inventario_valorizado", {}).get("por_material", {}).get(mat)
        if not inv:
            continue

        costo_actual = inv.get("costo_unitario_promedio", 0)
        if costo_actual == 0:
            continue

        zscore = abs((costo_actual - media) / std)
        if zscore < ZSCORE_UMBRAL:
            continue

        anomalias.append({
            "tipo": "costo_atipico",
            "material": mat,
            "valor": round(costo_actual, 2),
            "umbral": round(media + ZSCORE_UMBRAL * std, 2),
            "zscore": round(zscore, 2),
            "severidad": "alta" if zscore >= 3.0 else "media",
            "descripcion": (
                f"{mat}: costo unitario ${costo_actual:.2f} es {zscore:.1f}σ "
                f"sobre la media histórica (${media:.2f})"
            ),
        })

    return anomalias


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _severidad_por_desviacion(pct: float) -> str:
    if pct >= 50:
        return "alta"
    if pct >= 25:
        return "media"
    return "baja"


def _peso_severidad(s: str) -> int:
    return {"alta": 3, "media": 2, "baja": 1}.get(s, 0)