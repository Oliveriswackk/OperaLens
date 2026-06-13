/**
 * Adaptadores de presentación: transforman el contrato del backend a props de UI.
 * No reestructuran datos; solo ayudan a ordenar/etiquetar para el dashboard.
 */
import type { AnomaliaTipo, Severidad } from '@/types/analysis'

const PESO_SEVERIDAD: Record<Severidad, number> = {
  alta: 3,
  media: 2,
  baja: 1,
}

/** Ordena de mayor a menor severidad (alta primero). */
export function ordenarPorSeveridad<T extends { severidad: Severidad }>(items: T[]): T[] {
  return [...items].sort((a, b) => PESO_SEVERIDAD[b.severidad] - PESO_SEVERIDAD[a.severidad])
}

const ETIQUETA_TIPO: Record<AnomaliaTipo, string> = {
  consumo_excesivo: 'Consumo excesivo',
  consumo_bajo: 'Consumo bajo',
  stock_inmovilizado: 'Stock inmovilizado',
  perdida_operativa: 'Pérdida operativa',
  costo_atipico: 'Costo atípico',
}

export function etiquetaTipoAnomalia(tipo: AnomaliaTipo): string {
  return ETIQUETA_TIPO[tipo] ?? tipo
}

const ETIQUETA_FUENTE: Record<string, string> = {
  bedrock: 'IA · Bedrock',
  ollama: 'IA · Ollama',
  fallback: 'Resumen automático',
}

export function etiquetaFuente(fuente: string): string {
  return ETIQUETA_FUENTE[fuente] ?? fuente
}
