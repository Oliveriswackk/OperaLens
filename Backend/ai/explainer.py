# explainer.py — Jaime
# Capa 3: traduce los resultados de analyzer.py y anomalies.py a lenguaje natural.

from typing import Any

from ai.client import call_llm, MODEL_SONNET


def explicar(resultado: dict[str, Any], anomalias: list[dict]) -> dict[str, str]:
    """
    Devuelve {"texto": "...", "fuente": "bedrock" | "ollama" | "fallback"}.
    """
    prompt = _construir_prompt(resultado, anomalias)

    try:
        texto, fuente = call_llm(prompt, max_tokens=500, temperature=0.3, model=MODEL_SONNET)
        return {"texto": texto, "fuente": fuente}
    except RuntimeError:
        return {"texto": _resumen_fallback(resultado, anomalias), "fuente": "fallback"}


def _construir_prompt(resultado: dict[str, Any], anomalias: list[dict]) -> str:
    perdidas     = resultado.get("perdidas_operativas", {}).get("total", 0)
    inmovilizado = resultado.get("capital_inmovilizado", {}).get("total", 0)
    inventario   = resultado.get("inventario_valorizado", {}).get("total", 0)
    periodo      = resultado.get("periodo", {})
    inicio       = periodo.get("inicio", "")[:10]
    fin          = periodo.get("fin", "")[:10]

    alertas_altas = [a for a in anomalias if a.get("severidad") == "alta"]
    alertas_texto = "\n".join(f"- {a['descripcion']}" for a in anomalias[:5]) or "- Sin anomalías detectadas"

    materiales_inmovilizados = resultado.get("capital_inmovilizado", {}).get("materiales", [])
    detalle_inmovilizado = "\n".join(
        f"- {m['material']}: ${m['valor_inmovilizado']:,.2f} ({m['dias_sin_rotacion']} días sin rotación)"
        for m in materiales_inmovilizados[:3]
    ) or "- Ninguno"

    return f"""Eres un consultor de operaciones para una PyME manufacturera mexicana.
Analiza los siguientes datos del periodo {inicio} al {fin} y explica los hallazgos
en 4 a 6 oraciones en español, como si se lo explicaras directamente al dueño de la empresa.
Sé directo, menciona los montos en pesos y señala qué acciones concretas debe tomar.
No uses tecnicismos ni bullet points, solo párrafo corrido.

DATOS DEL PERIODO:
- Inventario valorizado total: ${inventario:,.2f}
- Capital inmovilizado (sin rotación): ${inmovilizado:,.2f}
- Pérdidas operativas (desperdicio y ajustes): ${perdidas:,.2f}
- Alertas detectadas: {len(anomalias)} ({len(alertas_altas)} de severidad alta)

ALERTAS PRINCIPALES:
{alertas_texto}

MATERIALES INMOVILIZADOS:
{detalle_inmovilizado}

EXPLICACIÓN PARA EL DUEÑO:"""


def explicar_produccion(analisis: dict[str, Any]) -> dict[str, str]:
    """
    Explica los cambios en la composición de costos por etapa de producción.
    """
    if "error" in analisis:
        return {"texto": analisis["error"], "fuente": "sistema"}

    cambios = analisis.get("cambios_detectados", [])
    if not cambios:
        return {
            "texto": "No se detectaron cambios significativos en la composición de costos de producción entre los dos periodos.",
            "fuente": "sistema",
        }

    prompt = _construir_prompt_produccion(analisis)
    try:
        texto, fuente = call_llm(prompt, max_tokens=400, temperature=0.3, model=MODEL_SONNET)
        return {"texto": texto, "fuente": fuente}
    except RuntimeError:
        return {"texto": _resumen_produccion_fallback(analisis), "fuente": "fallback"}


def _construir_prompt_produccion(analisis: dict[str, Any]) -> str:
    periodo_base = analisis.get("periodo_base", {})
    periodo_actual = analisis.get("periodo_actual", {})
    cambios = analisis.get("cambios_detectados", [])

    cambios_texto = "\n".join(
        f"- {c['descripcion']} (severidad: {c['severidad']})"
        for c in cambios[:6]
    )

    return f"""Eres un consultor de operaciones para una PyME manufacturera mexicana.
Se comparó la composición de costos de producción por etapa entre dos periodos:
- Periodo base:   {periodo_base.get('desde')} al {periodo_base.get('hasta')}
- Periodo actual: {periodo_actual.get('desde')} al {periodo_actual.get('hasta')}

Cambios detectados en la participación de materiales por etapa de producción:
{cambios_texto}

Explica en 3-5 oraciones en español qué pueden significar estos cambios para el dueño.
Menciona qué materiales o etapas merecen atención y qué podría estar ocurriendo.
Sin bullet points, párrafo corrido, directo y práctico."""


def _resumen_produccion_fallback(analisis: dict[str, Any]) -> str:
    cambios = analisis.get("cambios_detectados", [])
    altas = [c for c in cambios if c["severidad"] == "alta"]
    partes = [f"Se detectaron {len(cambios)} cambio(s) en la composición de costos por etapa."]
    if altas:
        partes.append(f"{len(altas)} de ellos son de severidad alta y requieren atención.")
    return " ".join(partes)


def _resumen_fallback(resultado: dict[str, Any], anomalias: list[dict]) -> str:
    perdidas     = resultado.get("perdidas_operativas", {}).get("total", 0)
    inmovilizado = resultado.get("capital_inmovilizado", {}).get("total", 0)
    altas        = sum(1 for a in anomalias if a.get("severidad") == "alta")

    partes = [f"Se detectaron pérdidas operativas por ${perdidas:,.2f}."]
    if inmovilizado > 0:
        partes.append(f"Hay ${inmovilizado:,.2f} en capital inmovilizado sin rotación.")
    if altas > 0:
        partes.append(f"Se encontraron {altas} alerta(s) de severidad alta que requieren atención inmediata.")
    elif anomalias:
        partes.append(f"Se detectaron {len(anomalias)} anomalía(s) en el periodo analizado.")
    return " ".join(partes)
