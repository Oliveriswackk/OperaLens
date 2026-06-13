import type { TrendDirection } from '@/types'

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low'

export interface HomeExecutiveSummary {
  narrative: { text: string; bold?: boolean }[]
  updatedAt: string
}

export interface SalesTrendPoint {
  month: string
  ventas: number
  historico: number
  forecast: number | null
}

export interface TopProduct {
  name: string
  sales: string
  trend: TrendDirection
  change: string
}

export interface BehaviorInsight {
  id: string
  label: string
  detail: string
  sentiment: 'positive' | 'negative' | 'warning' | 'neutral'
}

export interface HomeAlert {
  id: string
  severity: AlertSeverity
  category: string
  description: string
  time: string
}

export interface HomeDashboardData {
  summary: HomeExecutiveSummary
  salesTrend: SalesTrendPoint[]
  topProducts: TopProduct[]
  behaviorInsights: BehaviorInsight[]
  alerts: HomeAlert[]
}

/* Legacy types — used by older widget components */
export interface InventoryDistributionItem {
  categoria: string
  valor: number
  porcentaje: number
  color: string
}

export interface HighRiskProduct {
  id: string
  product: string
  sku: string
  daysWithoutMovement: number
  estimatedLoss: string
  riskScore: number
  action: string
}

export interface CapitalImmobilizationInsight {
  lowRotationProducts: { name: string; days: number; value: string }[]
  agingBuckets: { range: string; value: number; amount: string }[]
  obsoletePrediction: { label: string; products: number; potentialLoss: string }
  liquidationOpportunities: { product: string; recovery: string }[]
  potentialRecovery: string
}

export interface RiskScoreItem {
  score: number
  explanation: string
}

export interface RiskScores {
  financial: RiskScoreItem
  inventory: RiskScoreItem
  sales: RiskScoreItem
  operational: RiskScoreItem
}

export interface LossPreventionMetric {
  value: string
  change: string
  positive: boolean
}

export interface LossPreventionMetrics {
  lossesAvoided: LossPreventionMetric
  potentialLossesDetected: LossPreventionMetric
  savingsOpportunities: LossPreventionMetric
  businessImpact: { value: string; description: string }
}

export type TimelineEventType = 'anomaly' | 'inventory' | 'risk' | 'recommendation' | 'sales'

export interface TimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  description: string
  time: string
}

/** @deprecated Legacy types kept for other pages referencing mocks */
export type KpiIcon = 'inventory' | 'sales' | 'capital' | 'anomaly' | 'risk' | 'loss'

export interface DashboardKpi {
  id: string
  label: string
  value: string
  trend: { direction: TrendDirection; value: string; positive: boolean }
  sparkline: number[]
  icon: KpiIcon
}

export interface ExecutiveSummary {
  highlights: { text: string; bold?: boolean }[]
  insights: { label: string; value: string; status: 'good' | 'warning' | 'critical' }[]
}

export interface AiAlert {
  id: string
  severity: AlertSeverity
  category: string
  anomaly: string
  impact: string
  action: string
  time: string
}

export interface DashboardData extends HomeDashboardData {
  kpis?: DashboardKpi[]
}
