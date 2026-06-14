import type { Severidad } from './analysis'
import type { DotStatus } from '@/components/shared/StatusDot'

export type { Severidad }

export type TrendDirection = 'up' | 'down'

export interface Kpi {
  id: string
  label: string
  value: string
  trend?: { direction: TrendDirection; value: string; positive: boolean }
  caption?: string
  icon: 'target' | 'users' | 'alert' | 'dollar'
}

export interface PerformancePoint {
  time: string
  eficiencia: number
  procesos: number
}

export interface ActivityEvent {
  id: string
  title: string
  source: string
  time: string
  status: DotStatus
}

export interface Recommendation {
  id: string
  title: string
  description: string
  priority: Severidad
  impact: string
  isNew?: boolean
}

export interface AlertSummaryItem {
  id: string
  message: string
  time: string
  status: DotStatus
}

export interface Incident {
  id: string
  titulo: string
  area: string
  severidad: Severidad
  estado: 'activo' | 'investigando' | 'resuelto'
  riesgo: string
  detectadoPorIA: boolean
  hora: string
  causasRaiz: string[]
  accionesRecomendadas: string[]
  timeline: { hora: string; evento: string }[]
}

export interface Insight {
  id: string
  categoria: 'oportunidad' | 'cuello_de_botella' | 'optimizacion' | 'estrategico'
  titulo: string
  hallazgo: string
  explicacion: string
  impacto: string
  confianza: number
  prioridad: 'P1' | 'P2' | 'P3'
  pasos: string[]
}

export interface Prediction {
  id: string
  nombre: string
  valor: string
  tendencia: TrendDirection
  confianza: number
  descripcion: string
}

export interface ReportCard {
  id: string
  nombre: string
  tipo: string
  descripcion: string
  ultimaGeneracion: string
}

export interface ScheduledReport {
  id: string
  nombre: string
  frecuencia: string
  proximaEjecucion: string
  estado: 'activo' | 'pausado'
  ultimaEjecucion: 'exitosa' | 'fallida' | 'pendiente'
}

export interface Integration {
  id: string
  nombre: string
  categoria: string
  estado: 'conectado' | 'error' | 'sincronizando'
  ultimaSync: string
  descripcion: string
}

export interface OrgUser {
  id: string
  nombre: string
  email: string
  rol: string
  estado: 'activo' | 'invitado' | 'suspendido'
  ultimoAcceso: string
}

export interface AuditEntry {
  id: string
  usuario: string
  accion: string
  recurso: string
  fecha: string
}
