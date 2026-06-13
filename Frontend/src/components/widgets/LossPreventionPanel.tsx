import { ShieldCheck, ShieldOff, PiggyBank, TrendingUp } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { TrendBadge } from './TrendBadge'
import type { LossPreventionMetrics } from '@/types/dashboard'

interface LossPreventionPanelProps {
  metrics: LossPreventionMetrics
}

const cards = [
  { key: 'lossesAvoided' as const, label: 'Pérdidas evitadas', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { key: 'potentialLossesDetected' as const, label: 'Pérdidas potenciales detectadas', icon: ShieldOff, color: 'text-red-600', bg: 'bg-red-100' },
  { key: 'savingsOpportunities' as const, label: 'Oportunidades de ahorro', icon: PiggyBank, color: 'text-primary', bg: 'bg-primary/10' },
]

export function LossPreventionPanel({ metrics }: LossPreventionPanelProps) {
  return (
    <Card>
      <CardHeader
        title="Prevención de Pérdidas"
        subtitle="Impacto estimado de la detección temprana y recomendaciones de IA"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ key, label, icon: Icon, color, bg }) => {
          const metric = metrics[key]
          return (
            <div key={key} className="rounded-2xl border border-zinc-100 p-5">
              <div className="flex items-start justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </span>
                <TrendBadge
                  direction={metric.positive ? 'up' : 'down'}
                  value={metric.change}
                  positive={metric.positive}
                />
              </div>
              <p className="mt-4 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                {label}
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{metric.value}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
          <TrendingUp className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
            Impacto estimado en el negocio
          </p>
          <p className="text-3xl font-bold">{metrics.businessImpact.value}</p>
          <p className="mt-1 text-sm opacity-90">{metrics.businessImpact.description}</p>
        </div>
      </div>
    </Card>
  )
}
