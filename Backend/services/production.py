#Emmanuel Gonzalez Hernandez
# Analiza la composición de costos por etapa de producción comparando
# un periodo base contra el periodo actual para detectar cambios en los
# ratios de consumo de materiales.

import pandas as pd
from typing import Any

from services.history import obtener_movimientos_historicos

TIPOS_CONSUMO = {"salida", "produccion"}
CAMBIO_UMBRAL_PP = 10   # puntos porcentuales de cambio en participación para alertar
VALOR_MINIMO_ETAPA = 100  # ignora etapas con consumo total insignificante


def analizar_eficiencia_produccion(periodo_actual_dias: int = 30) -> dict[str, Any]:
    """
    Compara la composición de costos por etapa entre:
      - periodo base  : todo lo anterior al corte
      - periodo actual: últimos `periodo_actual_dias` días

    Devuelve participaciones (% del costo de etapa) por material y
    los cambios detectados entre periodos.
    """
    ventana = periodo_actual_dias * 4
    df = obtener_movimientos_historicos(ultimos_dias=ventana)

    if df.empty:
        return {"error": "Sin datos históricos. Carga al menos un archivo primero."}

    df["fecha"] = pd.to_datetime(df["fecha"])
    fecha_corte = df["fecha"].max() - pd.Timedelta(days=periodo_actual_dias)

    df_base = df[df["fecha"] <= fecha_corte]
    df_actual = df[df["fecha"] > fecha_corte]

    if df_base.empty or df_actual.empty:
        return {
            "error": (
                "No hay suficiente historial para comparar periodos. "
                "Necesitas cargas en al menos dos fechas distintas."
            )
        }

    participacion_base = _participacion_por_etapa(df_base)
    participacion_actual = _participacion_por_etapa(df_actual)
    cambios = _detectar_cambios(participacion_base, participacion_actual)

    return {
        "periodo_base": {
            "desde": df_base["fecha"].min().date().isoformat(),
            "hasta": df_base["fecha"].max().date().isoformat(),
        },
        "periodo_actual": {
            "desde": df_actual["fecha"].min().date().isoformat(),
            "hasta": df_actual["fecha"].max().date().isoformat(),
        },
        "participacion_historica": participacion_base,
        "participacion_actual": participacion_actual,
        "cambios_detectados": cambios,
    }


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _participacion_por_etapa(df: pd.DataFrame) -> dict[str, dict[str, float]]:
    """
    Para cada etapa calcula qué % del costo total aporta cada material.
    Ejemplo: {'Ensamble': {'Tornillos M8': 15.3, 'Acero laminado': 84.7}}
    """
    consumo = df[df["tipo"].isin(TIPOS_CONSUMO)].copy()
    consumo["valor"] = consumo["cantidad"] * consumo["costo_unitario"]

    total_por_etapa = consumo.groupby("etapa")["valor"].sum()
    por_etapa_material = consumo.groupby(["etapa", "material"])["valor"].sum()

    result: dict[str, dict[str, float]] = {}
    for etapa, total in total_por_etapa.items():
        if total < VALOR_MINIMO_ETAPA:
            continue
        if etapa not in por_etapa_material.index.get_level_values(0):
            continue
        result[etapa] = {
            material: round(valor / total * 100, 2)
            for material, valor in por_etapa_material.loc[etapa].items()
        }

    return result


def _detectar_cambios(
    base: dict[str, dict[str, float]],
    actual: dict[str, dict[str, float]],
) -> list[dict[str, Any]]:
    """
    Compara participaciones entre periodos y devuelve las desviaciones
    que superan el umbral, ordenadas de mayor a menor cambio absoluto.
    """
    cambios: list[dict[str, Any]] = []

    etapas_comunes = set(base) & set(actual)
    for etapa in etapas_comunes:
        materiales_comunes = set(base[etapa]) & set(actual[etapa])
        for material in materiales_comunes:
            pct_base = base[etapa][material]
            pct_actual = actual[etapa][material]
            delta = round(pct_actual - pct_base, 2)

            if abs(delta) < CAMBIO_UMBRAL_PP:
                continue

            severidad = "alta" if abs(delta) >= 20 else "media"
            cambios.append({
                "etapa": etapa,
                "material": material,
                "participacion_historica_pct": pct_base,
                "participacion_actual_pct": pct_actual,
                "delta_pp": delta,
                "tendencia": "sube" if delta > 0 else "baja",
                "severidad": severidad,
                "descripcion": (
                    f"{material} en {etapa}: participación en el costo "
                    f"pasó de {pct_base:.1f}% a {pct_actual:.1f}% ({delta:+.1f}pp)"
                ),
            })

    cambios.sort(key=lambda c: abs(c["delta_pp"]), reverse=True)
    return cambios
