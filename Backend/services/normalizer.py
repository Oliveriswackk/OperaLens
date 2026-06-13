# normalizer.py - Oliver
import json

import pandas as pd

from ai.client import call_llm, MODEL_HAIKU


COLUMNAS = {
    "fecha": [
        "fecha",
        "date",
        "dia",
        "día",
        "fecha_movimiento",
        "fecha movimiento",
    ],
    "tipo": [
        "tipo",
        "movimiento",
        "tipo_movimiento",
    ],
    "material": [
        "material",
        "producto",
        "insumo",
        "articulo",
        "artículo",
        "item",
    ],
    "cantidad": [
        "cantidad",
        "cant",
        "unidades",
        "qty",
    ],
    "costo_unitario": [
        "costo_unitario",
        "costo",
        "precio",
        "precio_unitario",
        "costo unitario",
        "precio unitario",
    ],
    "etapa": [
        "etapa",
        "proceso",
        "area",
        "área",
        "departamento",
    ],
}


TIPOS = {
    "entrada": "entrada",
    "ingreso": "entrada",
    "compra": "entrada",

    "salida": "salida",
    "consumo": "salida",

    "produccion": "produccion",
    "producción": "produccion",

    "desperdicio": "desperdicio",
    "merma": "desperdicio",

    "ajuste": "ajuste",
}


def _normalizar_texto(valor: str) -> str:
    return str(valor).strip().lower()


def buscar_columna(columnas, aliases):
    for columna in columnas:
        nombre = _normalizar_texto(columna)

        if nombre in aliases:
            return columna

    return None


def normalizar(df: pd.DataFrame) -> pd.DataFrame:
    """
    Excel parecido al contrato esperado por analyzer.py
    """

    df = df.copy()

    # --------------------------------------------------
    # Detectar columnas equivalentes
    # --------------------------------------------------

    mapeo = {}

    for destino, aliases in COLUMNAS.items():

        origen = buscar_columna(df.columns, aliases)

        if origen:
            mapeo[origen] = destino

    df = df.rename(columns=mapeo)

    # --------------------------------------------------
    # Validar columnas obligatorias
    # --------------------------------------------------

    faltantes = [
        columna
        for columna in COLUMNAS.keys()
        if columna not in df.columns
    ]

    if faltantes:
        mapeo_ia = _mapear_con_ia(df, faltantes)
        if mapeo_ia:
            df = df.rename(columns=mapeo_ia)
            faltantes = [c for c in COLUMNAS if c not in df.columns]

    if faltantes:
        raise ValueError(f"Columnas faltantes: {', '.join(faltantes)}")

    # --------------------------------------------------
    # Seleccionar únicamente columnas necesarias
    # --------------------------------------------------

    df = df[
        [
            "fecha",
            "tipo",
            "material",
            "cantidad",
            "costo_unitario",
            "etapa",
        ]
    ].copy()

    # --------------------------------------------------
    # Conversión de tipos
    # --------------------------------------------------

    df["fecha"] = pd.to_datetime(
        df["fecha"],
        errors="coerce"
    )

    df["cantidad"] = pd.to_numeric(
        df["cantidad"],
        errors="coerce"
    ).fillna(0)

    df["costo_unitario"] = pd.to_numeric(
        df["costo_unitario"],
        errors="coerce"
    ).fillna(0)

    df["material"] = (
        df["material"]
        .astype(str)
        .str.strip()
    )

    df["etapa"] = (
        df["etapa"]
        .astype(str)
        .str.strip()
    )

    # --------------------------------------------------
    # Normalizar tipos de movimiento
    # --------------------------------------------------

    df["tipo"] = (
        df["tipo"]
        .astype(str)
        .str.lower()
        .str.strip()
    )

    df["tipo"] = (
        df["tipo"]
        .map(TIPOS)
        .fillna("ajuste")
    )

    # --------------------------------------------------
    # Eliminar filas sin fecha válida
    # --------------------------------------------------

    df = df.dropna(subset=["fecha"])

    # --------------------------------------------------
    # Garantizar cantidades positivas
    # Emmanuel confirmó que las espera positivas
    # --------------------------------------------------

    df["cantidad"] = df["cantidad"].abs()

    return df


def _mapear_con_ia(df: pd.DataFrame, faltantes: list[str]) -> dict[str, str]:
    """
    Pide a la IA que mapee columnas no reconocidas al esquema esperado.
    Pasa una muestra aleatoria de filas por columna para que la IA pueda
    inferir el contenido real y no solo el nombre.
    Devuelve un dict {nombre_excel: nombre_destino} o {} si falla.
    """
    muestra = df.sample(min(10, len(df)), random_state=None)

    columnas_con_muestra = {
        col: muestra[col].dropna().astype(str).tolist()
        for col in df.columns
    }

    prompt = (
        f"Tienes un archivo Excel con estas columnas y muestras de sus valores:\n"
        f"{json.dumps(columnas_con_muestra, ensure_ascii=False, indent=2)}\n\n"
        f"Mapea cada columna a uno de estos campos destino: {faltantes}\n"
        "Devuelve ÚNICAMENTE un JSON válido con el mapeo, "
        'ejemplo: {"Columna Excel": "campo_destino"}.\n'
        "Solo incluye columnas que puedas mapear con certeza. Sin explicación."
    )
    try:
        texto, _ = call_llm(prompt, max_tokens=300, temperature=0.0, model=MODEL_HAIKU)
        inicio = texto.find("{")
        fin = texto.rfind("}") + 1
        if inicio == -1 or fin == 0:
            return {}
        return json.loads(texto[inicio:fin])
    except Exception:
        return {}