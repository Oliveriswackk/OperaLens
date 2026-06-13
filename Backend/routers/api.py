# api.py — Oliver + Emmanuel + Jaime (integración)

from fastapi import APIRouter, File, HTTPException, UploadFile

from ai.parser import parse_excel
from services.normalizer import normalizar
from services import analyzer, anomalies, history
from ai import explainer

router = APIRouter()


@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    # --- Capa 1: parsear y normalizar ---
    try:
        df = parse_excel(file.file, filename=file.filename)
        df = normalizar(df)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    # --- Capa 2: analizar y detectar anomalías ---
    resultado = analyzer.analyze(df)

    df_historico = history.obtener_movimientos_historicos()
    alertas = anomalies.detect_anomalies(resultado, df_historico)

    # --- Capa 3: explicación en lenguaje natural ---
    explicacion = explainer.explicar(resultado, alertas)

    # --- Persistencia ---
    analisis_id = history.guardar_analisis(resultado, alertas)
    history.guardar_movimientos(df)

    return {
        "analisis_id": analisis_id,
        "registros": len(df),
        "periodo": resultado["periodo"],
        "inventario_valorizado": resultado["inventario_valorizado"],
        "capital_inmovilizado": resultado["capital_inmovilizado"],
        "perdidas_operativas": resultado["perdidas_operativas"],
        "consumo": resultado["consumo"],
        "resumen_etapas": resultado["resumen_etapas"],
        "anomalias": alertas,
        "explicacion": explicacion,
    }


@router.get("/historial")
def get_historial(limite: int = 10):
    return history.obtener_historial(limite)


@router.get("/historial/{analisis_id}")
def get_analisis(analisis_id: int):
    data = history.obtener_analisis_por_id(analisis_id)
    if not data:
        raise HTTPException(status_code=404, detail="Análisis no encontrado")
    return data


@router.get("/tendencia")
def get_tendencia(ultimos: int = 6):
    return history.tendencia_perdidas(ultimos)
