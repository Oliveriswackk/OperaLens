/**
 * Adaptadores: transforman el contrato del backend a props de UI por vista.
 */
import { formatCurrency } from '@/lib/utils'
import type { AnalisisCompleto, AnalisisResumen, Anomalia, Severidad } from '@/types/analysis'
import type { AnomaliaTipo } from '@/types/analysis'
import type {
  Bottleneck,
  Incident,
  Insight,
  ProcessItem,
  ResourceUtilization,
} from '@/types'
import type { InventoryProduct, StockLevel } from '@/types/inventory'
import type { CambioEficiencia, EficienciaProduccion } from '@/types/production'
import type {
  BehaviorInsight,
  HomeAlert,
  HomeDashboardData,
  HomeExecutiveSummary,
  SalesTrendPoint,
  TopProduct,
} from '@/types/dashboard'

const PESO_SEVERIDAD: Record<Severidad, number> = {
  alta: 3,
  media: 2,
  baja: 1,
}

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

function calcularNivelesStock(cantidades: number[]): (stock: number) => StockLevel {
  if (cantidades.length === 0) return () => 'medio'
  const sorted = [...cantidades].sort((a, b) => a - b)
  const p33 = sorted[Math.floor(sorted.length * 0.33)] ?? 0
  const p66 = sorted[Math.floor(sorted.length * 0.66)] ?? p33
  return (stock) => {
    if (stock <= p33) return 'bajo'
    if (stock <= p66) return 'medio'
    return 'alto'
  }
}

/** inventario_valorizado.por_material → filas de tabla Inventario */
export function mapInventario(analisis: AnalisisCompleto): InventoryProduct[] {
  const porMaterial = analisis.inventario_valorizado.por_material
  const consumo = analisis.consumo.por_material
  const cantidades = Object.values(porMaterial).map((m) => m.cantidad)
  const nivelDe = calcularNivelesStock(cantidades)

  return Object.entries(porMaterial).map(([nombre, mat], i) => {
    const cons = consumo[nombre]
    const descripcion = cons
      ? `Valor ${formatCurrency(mat.valor)} · consumo real ${cons.consumo_real}`
      : `Valor ${formatCurrency(mat.valor)}`
    return {
      id: `MAT-${String(i + 1).padStart(3, '0')}`,
      nombre,
      descripcion,
      stock: mat.cantidad,
      precioUnitario: mat.costo_unitario_promedio,
      volumenCompras: cons?.consumo_real ?? 0,
      nivelStock: nivelDe(mat.cantidad),
    }
  })
}

export interface AlertsData {
  stats: { activas: number; altas: number; medias: number; bajas: number }
  incidents: Incident[]
}

function mapAnomaliaToIncident(anomalia: Anomalia, index: number): Incident {
  return {
    id: `ANM-${String(index + 1).padStart(3, '0')}`,
    titulo: anomalia.descripcion,
    area: anomalia.material,
    severidad: anomalia.severidad,
    estado: 'activo',
    riesgo: `${etiquetaTipoAnomalia(anomalia.tipo)} · ${formatCurrency(anomalia.valor)}`,
    detectadoPorIA: true,
    hora: 'Análisis actual',
    causasRaiz: [
      anomalia.descripcion,
      anomalia.desviacion_pct != null
        ? `Desviación: ${anomalia.desviacion_pct.toFixed(1)}%`
        : '',
    ].filter(Boolean),
    accionesRecomendadas: [
      `Revisar movimientos de ${anomalia.material}`,
      `Validar umbral (${anomalia.umbral})`,
    ],
    timeline: [{ hora: 'Detección', evento: anomalia.descripcion }],
  }
}

export function mapAnomaliasToAlerts(analisis: AnalisisCompleto): AlertsData {
  const anomalias = ordenarPorSeveridad(analisis.anomalias)
  return {
    stats: {
      activas: anomalias.length,
      altas: anomalias.filter((a) => a.severidad === 'alta').length,
      medias: anomalias.filter((a) => a.severidad === 'media').length,
      bajas: anomalias.filter((a) => a.severidad === 'baja').length,
    },
    incidents: anomalias.map(mapAnomaliaToIncident),
  }
}

export interface OperationsData {
  processes: ProcessItem[]
  resources: ResourceUtilization[]
  bottlenecks: Bottleneck[]
  areaPerformance: { area: string; rendimiento: number }[]
  criticalTasks: { id: string; tarea: string; vence: string; estado: string }[]
  eficienciaError?: string
}

export function mapOperations(
  analisis: AnalisisCompleto,
  eficiencia?: EficienciaProduccion | null,
): OperationsData {
  const perdidas = analisis.resumen_etapas.perdidas
  const consumo = analisis.resumen_etapas.consumo
  const maxPerdida = Math.max(...Object.values(perdidas), 1)
  const maxConsumo = Math.max(...Object.values(consumo), 1)

  const etapas = new Set([...Object.keys(perdidas), ...Object.keys(consumo)])
  const processes: ProcessItem[] = [...etapas].map((etapa, i) => {
    const p = perdidas[etapa] ?? 0
    const c = consumo[etapa] ?? 0
    const ratio = ((p / maxPerdida) * 50 + (c / maxConsumo) * 50)
    return {
      id: `etapa-${i}`,
      nombre: etapa,
      area: etapa,
      estado: p > maxPerdida * 0.6 ? 'critico' : 'activo',
      progreso: Math.round(Math.min(100, ratio)),
      responsable: 'Operación',
    }
  })

  const resources: ResourceUtilization[] = analisis.capital_inmovilizado.materiales.map(
    (m, i) => ({
      id: `cap-${i}`,
      recurso: m.material,
      utilizacion: Math.min(100, Math.round((m.dias_sin_rotacion / 30) * 100)),
      capacidad: formatCurrency(m.valor_inmovilizado),
    }),
  )

  const cambios = eficiencia?.cambios_detectados ?? []
  const bottlenecks: Bottleneck[] = cambios.slice(0, 5).map((c, i) => ({
    id: `bn-${i}`,
    proceso: `${c.material} · ${c.etapa}`,
    impacto: c.descripcion,
    severidad: c.severidad,
  }))

  if (bottlenecks.length === 0) {
    ordenarPorSeveridad(analisis.anomalias)
      .slice(0, 3)
      .forEach((a, i) => {
        bottlenecks.push({
          id: `an-${i}`,
          proceso: a.material,
          impacto: a.descripcion,
          severidad: a.severidad,
        })
      })
  }

  const totalPerdidas = Object.values(perdidas).reduce((s, v) => s + v, 0) || 1
  const areaPerformance = Object.entries(perdidas).map(([area, val]) => ({
    area,
    rendimiento: Math.round(100 - (val / totalPerdidas) * 100),
  }))

  const criticalTasks = ordenarPorSeveridad(analisis.anomalias)
    .slice(0, 5)
    .map((a, i) => ({
      id: `task-${i}`,
      tarea: a.descripcion,
      vence: etiquetaTipoAnomalia(a.tipo),
      estado: a.severidad === 'alta' ? 'urgente' : 'pendiente',
    }))

  return {
    processes,
    resources,
    bottlenecks,
    areaPerformance,
    criticalTasks,
    eficienciaError: eficiencia?.error,
  }
}

export function mapInsights(analisis: AnalisisCompleto): Insight[] {
  const insights: Insight[] = []

  insights.push({
    id: 'ins-explicacion',
    categoria: 'estrategico',
    titulo: 'Resumen del análisis',
    hallazgo: analisis.explicacion.texto.slice(0, 120) + (analisis.explicacion.texto.length > 120 ? '…' : ''),
    explicacion: analisis.explicacion.texto,
    impacto: formatCurrency(analisis.perdidas_operativas.total),
    confianza: analisis.explicacion.fuente === 'fallback' ? 70 : 90,
    prioridad: analisis.anomalias.some((a) => a.severidad === 'alta') ? 'P1' : 'P2',
    pasos: ['Revisar anomalías de severidad alta', 'Validar etapas con mayor pérdida'],
  })

  Object.entries(analisis.perdidas_operativas.por_material)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([material, monto], i) => {
      insights.push({
        id: `ins-perdida-${i}`,
        categoria: 'optimizacion',
        titulo: `Pérdida en ${material}`,
        hallazgo: `Pérdida operativa detectada: ${formatCurrency(monto)}`,
        explicacion: `El material ${material} concentra parte de las pérdidas del periodo analizado.`,
        impacto: formatCurrency(monto),
        confianza: 85,
        prioridad: monto > analisis.perdidas_operativas.total * 0.3 ? 'P1' : 'P2',
        pasos: [`Auditar movimientos de ${material}`, 'Revisar etapas de consumo'],
      })
    })

  analisis.capital_inmovilizado.materiales.slice(0, 2).forEach((m, i) => {
    insights.push({
      id: `ins-capital-${i}`,
      categoria: 'cuello_de_botella',
      titulo: `Capital inmovilizado: ${m.material}`,
      hallazgo: `${m.dias_sin_rotacion} días sin rotación · ${formatCurrency(m.valor_inmovilizado)}`,
      explicacion: `Stock de ${m.material} sin rotación reciente; capital inmovilizado en planta.`,
      impacto: formatCurrency(m.valor_inmovilizado),
      confianza: 80,
      prioridad: 'P2',
      pasos: ['Evaluar redistribución o devolución', 'Ajustar compras futuras'],
    })
  })

  return insights
}

export interface AnalysisReportRow {
  id: number
  nombre: string
  descripcion: string
  fecha: string
  periodo: string
  perdidas: number
  anomalias: number
}

export function mapHistorialToReports(rows: AnalisisResumen[]): AnalysisReportRow[] {
  return rows
    .filter((r) => r.id != null)
    .map((r) => ({
      id: r.id!,
      nombre: `Análisis #${r.id}`,
      descripcion: `Pérdidas ${formatCurrency(r.total_perdidas)} · capital inmov. ${formatCurrency(r.capital_inmovilizado)}`,
      fecha: r.fecha_carga,
      periodo: `${r.periodo_inicio?.slice(0, 10) ?? '?'} → ${r.periodo_fin?.slice(0, 10) ?? '?'}`,
      perdidas: r.total_perdidas,
      anomalias: r.anomalias_count,
    }))
}

export type { CambioEficiencia }

/* ── Home / Executive Summary ── */

function mapSeveridadToHomeAlert(severidad: string, index: number): HomeAlert['severity'] {
  if (severidad === 'alta') return index === 0 ? 'critical' : 'high'
  if (severidad === 'media') return 'medium'
  return 'low'
}

function formatShortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
  } catch {
    return iso.slice(0, 10)
  }
}

function formatRelativeTime(iso: string): string {
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60_000)
    if (mins < 60) return `Hace ${mins} min`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `Hace ${hrs} h`
    return formatShortDate(iso)
  } catch {
    return 'Reciente'
  }
}

export function mapHomeExecutiveSummary(analisis: AnalisisCompleto): HomeExecutiveSummary {
  const texto = analisis.explicacion?.texto?.trim()
  const periodo = analisis.periodo
  const updatedAt = periodo?.fin
    ? `Periodo ${formatShortDate(periodo.inicio)} – ${formatShortDate(periodo.fin)}`
    : 'Análisis actual'

  if (texto) {
    return { narrative: [{ text: texto }], updatedAt }
  }

  const perdidas = analisis.perdidas_operativas?.total ?? 0
  const anomalias = analisis.anomalias?.length ?? 0
  const capital = analisis.capital_inmovilizado?.total ?? 0
  const fallback = `Se detectaron pérdidas operativas de ${formatCurrency(perdidas)} en el periodo analizado. ${anomalias > 0 ? `${anomalias} anomalía${anomalias > 1 ? 's' : ''} requieren atención.` : 'Sin anomalías críticas registradas.'} Capital inmovilizado: ${formatCurrency(capital)}.`

  return { narrative: [{ text: fallback }], updatedAt }
}

export function mapTendenciaToSalesTrend(
  rows: AnalisisResumen[],
  analisis?: AnalisisCompleto,
): SalesTrendPoint[] {
  if (rows.length === 0) {
    if (!analisis) return []
    const total = analisis.perdidas_operativas.total
    return [
      {
        month: 'Actual',
        ventas: total,
        historico: total,
        forecast: total * 1.05,
      },
    ]
  }

  const sorted = [...rows].sort(
    (a, b) => new Date(a.fecha_carga).getTime() - new Date(b.fecha_carga).getTime(),
  )

  return sorted.map((row, i) => {
    const prev = i > 0 ? sorted[i - 1].total_perdidas : row.total_perdidas
    return {
      month: formatShortDate(row.fecha_carga),
      ventas: row.total_perdidas,
      historico: prev,
      forecast: i === sorted.length - 1 ? row.total_perdidas * 1.05 : null,
    }
  })
}

export function mapTopMaterials(analisis: AnalisisCompleto): TopProduct[] {
  const total = analisis.perdidas_operativas.total || 1

  return Object.entries(analisis.perdidas_operativas.por_material)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([material, perdida]) => ({
      name: material,
      sales: formatCurrency(perdida),
      trend: perdida > total * 0.2 ? 'down' : 'up',
      change: `${((perdida / total) * 100).toFixed(1)}%`,
    }))
}

export function mapBehaviorInsights(analisis: AnalisisCompleto): BehaviorInsight[] {
  const insights: BehaviorInsight[] = []
  let id = 0

  const total = analisis.perdidas_operativas.total || 1
  const porMaterial = Object.entries(analisis.perdidas_operativas.por_material)
  if (porMaterial.length > 0) {
    const sorted = [...porMaterial].sort((a, b) => b[1] - a[1])
    const [topMat, topVal] = sorted[0]
    insights.push({
      id: String(++id),
      label: 'Mayor pérdida por material',
      detail: `${topMat}: ${formatCurrency(topVal)} (${((topVal / total) * 100).toFixed(1)}% del total)`,
      sentiment: 'negative',
    })
    const [lowMat, lowVal] = sorted[sorted.length - 1]
    if (lowMat !== topMat) {
      insights.push({
        id: String(++id),
        label: 'Menor pérdida por material',
        detail: `${lowMat}: ${formatCurrency(lowVal)}`,
        sentiment: 'positive',
      })
    }
  }

  Object.entries(analisis.consumo.por_material)
    .filter(([, c]) => c.desviacion_pct > 0)
    .sort((a, b) => b[1].desviacion_pct - a[1].desviacion_pct)
    .slice(0, 2)
    .forEach(([material, c]) => {
      insights.push({
        id: String(++id),
        label: 'Consumo en aumento',
        detail: `${material}: +${c.desviacion_pct.toFixed(1)}% sobre lo esperado`,
        sentiment: 'warning',
      })
    })

  const inmov = analisis.capital_inmovilizado?.materiales ?? []
  inmov.slice(0, 2).forEach((m) => {
    insights.push({
      id: String(++id),
      label: 'Capital inmovilizado',
      detail: `${m.material}: ${m.dias_sin_rotacion} días sin rotación`,
      sentiment: 'warning',
    })
  })

  const etapasPerdidas = Object.entries(analisis.resumen_etapas.perdidas)
  if (etapasPerdidas.length > 0) {
    const [worstEtapa, worstVal] = [...etapasPerdidas].sort((a, b) => b[1] - a[1])[0]
    insights.push({
      id: String(++id),
      label: 'Etapa crítica',
      detail: `${worstEtapa}: ${formatCurrency(worstVal)} en pérdidas`,
      sentiment: 'negative',
    })
  }

  const anomalias = analisis.anomalias ?? []
  if (anomalias.length > 0) {
    insights.push({
      id: String(++id),
      label: 'Comportamiento anómalo',
      detail: `${anomalias.length} anomalía${anomalias.length > 1 ? 's' : ''} detectada${anomalias.length > 1 ? 's' : ''} en el periodo`,
      sentiment: 'warning',
    })
  }

  if (insights.length === 0) {
    insights.push({
      id: '1',
      label: 'Sin patrones destacados',
      detail: 'Carga un archivo Excel para generar el análisis de conducta.',
      sentiment: 'neutral',
    })
  }

  return insights.slice(0, 6)
}

export function mapAnomaliasToHomeAlerts(analisis: AnalisisCompleto): HomeAlert[] {
  const anomalias = ordenarPorSeveridad(analisis.anomalias ?? [])
  const fecha = analisis.periodo?.fin ?? analisis.periodo?.inicio ?? new Date().toISOString()

  if (anomalias.length === 0) {
    return [
      {
        id: '0',
        severity: 'low',
        category: 'Sistema',
        description: 'Sin anomalías detectadas en el periodo actual.',
        time: formatRelativeTime(fecha),
      },
    ]
  }

  return anomalias.map((a, i) => ({
    id: String(i + 1),
    severity: mapSeveridadToHomeAlert(a.severidad, i),
    category: ETIQUETA_TIPO[a.tipo] ?? a.tipo,
    description: a.descripcion,
    time: formatRelativeTime(fecha),
  }))
}

export function mapHomeDashboard(
  analisis: AnalisisCompleto,
  tendencia: AnalisisResumen[],
): HomeDashboardData {
  return {
    summary: mapHomeExecutiveSummary(analisis),
    salesTrend: mapTendenciaToSalesTrend(tendencia, analisis),
    topProducts: mapTopMaterials(analisis),
    behaviorInsights: mapBehaviorInsights(analisis),
    alerts: mapAnomaliasToHomeAlerts(analisis),
  }
}
