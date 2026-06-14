/**
 * Funciones de API del flujo de análisis de pérdidas operativas.
 * Consumen los endpoints del backend FastAPI tal cual (sin reestructurar el contrato).
 */
import type { AnalisisCompleto, AnalisisResumen } from '@/types/analysis'
import { apiFetch, apiUpload } from './client'

/** POST /upload — sube un Excel/CSV de movimientos y devuelve el análisis completo. */
export function uploadFile(file: File): Promise<AnalisisCompleto> {
  const formData = new FormData()
  formData.append('file', file)
  return apiUpload<AnalisisCompleto>('/upload', formData)
}

/** GET /historial — lista de resúmenes de análisis previos (más reciente primero). */
export function getHistorial(limite = 10): Promise<AnalisisResumen[]> {
  return apiFetch<AnalisisResumen[]>(`/historial?limite=${limite}`)
}

/** GET /historial/{id} — análisis completo persistido (mismo shape que /upload). */
export function getAnalisis(id: number): Promise<AnalisisCompleto> {
  return apiFetch<AnalisisCompleto>(`/historial/${id}`)
}

/** GET /tendencia — serie cronológica de pérdidas (más antiguo primero). */
export function getTendencia(ultimos = 6): Promise<AnalisisResumen[]> {
  return apiFetch<AnalisisResumen[]>(`/tendencia?ultimos=${ultimos}`)
}
