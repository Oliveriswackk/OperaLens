# api.py — Oliver + Emmanuel + Jaime (integración)

import hashlib
import io

from fastapi import APIRouter, File, HTTPException, UploadFile

from ai.parser import parse_excel
from services.normalizer import normalizar
from services import analyzer, anomalies, history, production
from ai import explainer

router = APIRouter()


@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    contenido = await file.read()
    hash_archivo = hashlib.sha256(contenido).hexdigest()

    # --- Detectar archivo duplicado exacto ---
    if history.archivo_ya_cargado(hash_archivo):
        raise HTTPException(
            status_code=409,
            detail="Este archivo ya fue cargado anteriormente. Los datos no se duplicaron.",
        )

    # --- Capa 1: parsear y normalizar ---
    try:
        df = parse_excel(io.BytesIO(contenido), filename=file.filename)
        df = normalizar(df)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al leer el archivo: {e}")

    # --- Capa 2: analizar y detectar anomalías ---
    resultado = analyzer.analyze(df)

    df_historico = history.obtener_movimientos_historicos()
    alertas = anomalies.detect_anomalies(resultado, df_historico)

    # --- Capa 3: explicación en lenguaje natural ---
    explicacion = explainer.explicar(resultado, alertas)

    # --- Persistencia con deduplicación ---
    nuevos, duplicados = history.guardar_movimientos(df)

    # Construir respuesta completa antes de persistir para que
    # GET /historial/{id} devuelva exactamente esto mismo.
    respuesta = {
        "analisis_id": None,  # se rellena tras el INSERT
        "registros": len(df),
        "registros_nuevos": nuevos,
        "registros_duplicados": duplicados,
        "periodo": resultado["periodo"],
        "inventario_valorizado": resultado["inventario_valorizado"],
        "capital_inmovilizado": resultado["capital_inmovilizado"],
        "perdidas_operativas": resultado["perdidas_operativas"],
        "consumo": resultado["consumo"],
        "resumen_etapas": resultado["resumen_etapas"],
        "anomalias": alertas,
        "explicacion": explicacion,
    }

    analisis_id = history.guardar_analisis(resultado, alertas, hash_archivo, respuesta)
    respuesta["analisis_id"] = analisis_id
    return respuesta


@router.get("/historial")
def get_historial(limite: int = 10):
    return history.obtener_historial(limite)


@router.get("/historial/{analisis_id}")
def get_analisis(analisis_id: int):
    data = history.obtener_analisis_por_id(analisis_id)
    if not data:
        raise HTTPException(status_code=404, detail="Análisis no encontrado")
    return data


@router.delete("/historial/{analisis_id}")
def delete_analisis(analisis_id: int):
    eliminado = history.eliminar_analisis(analisis_id)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Análisis no encontrado")
    return {"eliminado": True, "id": analisis_id}


@router.get("/tendencia")
def get_tendencia(ultimos: int = 6):
    return history.tendencia_perdidas(ultimos)


@router.get("/produccion/eficiencia")
def get_eficiencia_produccion(periodo_actual_dias: int = 30):
    """
    Compara la composición de costos por etapa entre el periodo actual
    (últimos N días) y el historial previo.
    Detecta materiales que suben o bajan su participación en el costo de cada etapa.
    """
    analisis = production.analizar_eficiencia_produccion(periodo_actual_dias)
    explicacion = explainer.explicar_produccion(analisis)
    return {**analisis, "explicacion": explicacion}
