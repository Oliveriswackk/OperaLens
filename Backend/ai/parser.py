# parser.py — Oliver

import pandas as pd


def parse_excel(file):
    """
    Recibe un archivo Excel y devuelve un DataFrame.
    """

    return pd.read_excel(file)