# parser.py — Oliver

import pandas as pd


def parse_excel(file, filename: str = "") -> pd.DataFrame:
    """
    Acepta .xlsx/.xls (una o varias hojas) o .csv.
    Para Excel con múltiples hojas, concatena todas las hojas que tengan
    al menos 2 columnas y más de 0 filas de datos — descarta hojas vacías
    o de resumen. La normalización posterior filtrará las que no encajen.
    """
    name = (filename or "").lower()

    if name.endswith(".csv"):
        return pd.read_csv(file)

    hojas: dict[str, pd.DataFrame] = pd.read_excel(file, sheet_name=None)

    utiles = [
        df.assign(_hoja=nombre)
        for nombre, df in hojas.items()
        if not df.empty and df.shape[1] >= 2
    ]

    if not utiles:
        raise ValueError("El archivo Excel no contiene hojas con datos.")

    return pd.concat(utiles, ignore_index=True).drop(columns=["_hoja"])
