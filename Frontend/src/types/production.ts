import type { Severidad } from './analysis'

/** Respuesta de GET /produccion/eficiencia */
export interface CambioEficiencia {
  etapa: string
  material: string
  participacion_historica_pct: number
  participacion_actual_pct: number
  delta_pp: number
  tendencia: 'sube' | 'baja'
  severidad: Severidad
  descripcion: string
}

export interface EficienciaProduccion {
  periodo_base?: { desde: string; hasta: string }
  periodo_actual?: { desde: string; hasta: string }
  participacion_historica?: Record<string, Record<string, number>>
  participacion_actual?: Record<string, Record<string, number>>
  cambios_detectados?: CambioEficiencia[]
  explicacion?: { texto: string; fuente: string }
  error?: string
}
