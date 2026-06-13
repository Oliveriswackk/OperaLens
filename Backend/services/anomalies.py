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

def _anomalias_consumo(param):
    pass


def _anomalias_capital_inmovilizado(param):
    pass


def _anomalias_perdidas(param):
    pass

def _anomalias_vs_historico(analisis, df_historico):
    pass


def _peso_severidad(param):
    pass