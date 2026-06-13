/**
 * Tipos alineados con el contrato del backend FastAPI
 * (Backend/services/analyzer.py, anomalies.py, ai/explainer.py)
 */

export type Severidad = 'baja' | 'media' | 'alta'

export interface MaterialInmovilizado {
  material: string
  valor: number
  dias_sin_rotacion: number
}

export interface ConsumoMaterial {
  real: number
  esperado: number
  desviacion_pct: number
}

export interface Analisis {
  inventario_valorizado: { total: number; por_material: Record<string, number> }
  capital_inmovilizado: { total: number; materiales: MaterialInmovilizado[] }
  consumo: { por_material: Record<string, ConsumoMaterial> }
  perdidas_operativas: { total: number; por_tipo: Record<string, number> }
}

export interface Anomalia {
  tipo: 'consumo_anormal' | 'stock_inmovilizado' | 'perdidas_atipicas' | 'costos_atipicos'
  material: string
  valor?: number
  dias_sin_rotacion?: number
  severidad: Severidad
  descripcion: string
}

/** Respuesta completa del endpoint de análisis del backend */
export interface AnalysisResponse {
  analisis: Analisis
  anomalias: Anomalia[]
  explicacion: string
}

export interface TendenciaPunto {
  fecha: string
  perdidas: number
}
