# normalizer.py - Oliver
import pandas as pd


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
        raise ValueError(
            f"Columnas faltantes: {', '.join(faltantes)}"
        )

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