# parser.py — Oliver

import pandas as pd


def parse_excel(file, filename: str = "") -> pd.DataFrame:
    """
    Acepta archivos .xlsx, .xls o .csv.
    Detecta el formato por extensión del nombre original.
    """
    name = (filename or "").lower()
    if name.endswith(".csv"):
        return pd.read_csv(file)
    return pd.read_excel(file)
