/**
 * Tipos canónicos alineados 1:1 con el contrato del backend FastAPI.
 * `AnalisisCompleto` es el mismo objeto que devuelven POST /upload y GET /historial/{id}.
 * `AnalisisResumen` es el shape de las filas de GET /historial y GET /tendencia.
 *
 * Backend: routers/api.py, services/analyzer.py, services/anomalies.py, ai/explainer.py
 */

export type Severidad = 'alta' | 'media' | 'baja'

export type AnomaliaTipo =
  | 'consumo_excesivo'
  | 'consumo_bajo'
  | 'stock_inmovilizado'
  | 'perdida_operativa'
  | 'costo_atipico'

export interface MaterialValorizado {
  cantidad: number
  costo_unitario_promedio: number
  valor: number
}

export interface MaterialInmovilizado {
  material: string
  dias_sin_rotacion: number
  valor_inmovilizado: number
  cantidad: number
}

export interface ConsumoMaterial {
  consumo_real: number
  consumo_esperado: number
  desviacion_pct: number
  exceso: number
}

export interface Anomalia {
  tipo: AnomaliaTipo
  material: string
  valor: number
  umbral: number
  severidad: Severidad
  descripcion: string
  desviacion_pct?: number
  zscore?: number
}

export interface Explicacion {
  texto: string
  fuente: 'bedrock' | 'ollama' | 'fallback'
}

/** Respuesta completa: POST /upload y GET /historial/{id} */
export interface AnalisisCompleto {
  analisis_id: number
  registros: number
  registros_nuevos?: number
  registros_duplicados?: number
  periodo: { inicio: string; fin: string }
  inventario_valorizado: {
    total: number
    por_material: Record<string, MaterialValorizado>
  }
  capital_inmovilizado: {
    total: number
    materiales: MaterialInmovilizado[]
  }
  perdidas_operativas: {
    total: number
    por_tipo: Record<string, number>
    por_material: Record<string, number>
  }
  consumo: {
    por_material: Record<string, ConsumoMaterial>
  }
  resumen_etapas: {
    perdidas: Record<string, number>
    consumo: Record<string, number>
  }
  anomalias: Anomalia[]
  explicacion: Explicacion
}

/** Fila de resumen: GET /historial y GET /tendencia */
export interface AnalisisResumen {
  id?: number
  fecha_carga: string
  periodo_inicio?: string
  periodo_fin?: string
  total_perdidas: number
  capital_inmovilizado: number
  inventario_valorizado: number
  anomalias_count: number
}
