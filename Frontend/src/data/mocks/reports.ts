import type { ReportCard, ScheduledReport } from '@/types'

export const reportGallery: ReportCard[] = [
  {
    id: 'rep1',
    nombre: 'Reporte Operacional Diario',
    tipo: 'Operacional',
    descripcion: 'Estado de procesos, incidentes y métricas clave del día',
    ultimaGeneracion: 'Hoy 06:00',
  },
  {
    id: 'rep2',
    nombre: 'Rendimiento por Área',
    tipo: 'Rendimiento',
    descripcion: 'Comparativa de eficiencia entre departamentos',
    ultimaGeneracion: 'Ayer 18:00',
  },
  {
    id: 'rep3',
    nombre: 'Resumen Ejecutivo Semanal',
    tipo: 'Ejecutivo (IA)',
    descripcion: 'Síntesis generada por IA con hallazgos y recomendaciones',
    ultimaGeneracion: 'Lunes 08:00',
  },
  {
    id: 'rep4',
    nombre: 'KPIs Mensuales',
    tipo: 'KPIs',
    descripcion: 'Tablero de indicadores con metas y desviaciones',
    ultimaGeneracion: '1 Jun 07:00',
  },
  {
    id: 'rep5',
    nombre: 'Tendencias de Pérdidas',
    tipo: 'Tendencias',
    descripcion: 'Evolución histórica de pérdidas operativas y proyección',
    ultimaGeneracion: 'Hoy 06:00',
  },
  {
    id: 'rep6',
    nombre: 'Comparativa Histórica Q1 vs Q2',
    tipo: 'Comparativo',
    descripcion: 'Análisis trimestral de costos, eficiencia y throughput',
    ultimaGeneracion: '30 May 12:00',
  },
]

export const scheduledReports: ScheduledReport[] = [
  {
    id: 'sch1',
    nombre: 'Reporte Operacional Diario',
    frecuencia: 'Diario · 06:00',
    proximaEjecucion: 'Mañana 06:00',
    estado: 'activo',
    ultimaEjecucion: 'exitosa',
  },
  {
    id: 'sch2',
    nombre: 'Resumen Ejecutivo Semanal',
    frecuencia: 'Lunes · 08:00',
    proximaEjecucion: 'Lun 16 Jun 08:00',
    estado: 'activo',
    ultimaEjecucion: 'exitosa',
  },
  {
    id: 'sch3',
    nombre: 'KPIs Mensuales',
    frecuencia: 'Día 1 · 07:00',
    proximaEjecucion: '1 Jul 07:00',
    estado: 'activo',
    ultimaEjecucion: 'pendiente',
  },
  {
    id: 'sch4',
    nombre: 'Auditoría de Inventario',
    frecuencia: 'Viernes · 17:00',
    proximaEjecucion: '—',
    estado: 'pausado',
    ultimaEjecucion: 'fallida',
  },
]
