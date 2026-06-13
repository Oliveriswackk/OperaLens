import {
  AlertTriangle,
  DollarSign,
  Package,
  ShieldAlert,
  ShoppingCart,
  TrendingDown,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Sparkline } from '@/components/charts/Sparkline'
import { TrendBadge } from './TrendBadge'
import type { DashboardKpi } from '@/types/dashboard'

const iconMap = {
  inventory: { Icon: Package, bg: 'bg-primary/10', fg: 'text-primary' },
  sales: { Icon: ShoppingCart, bg: 'bg-secondary/10', fg: 'text-secondary' },
  capital: { Icon: DollarSign, bg: 'bg-amber-100', fg: 'text-amber-600' },
  anomaly: { Icon: AlertTriangle, bg: 'bg-red-100', fg: 'text-red-600' },
  risk: { Icon: ShieldAlert, bg: 'bg-orange-100', fg: 'text-orange-600' },
  loss: { Icon: TrendingDown, bg: 'bg-emerald-100', fg: 'text-emerald-600' },
}

export function KpiCard({ kpi }: { kpi: DashboardKpi }) {
  const { Icon, bg, fg } = iconMap[kpi.icon]

  return (
    <Card className="flex flex-col gap-3 p-5 transition-shadow hover:shadow-soft">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
          {kpi.label}
        </span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
          <Icon className={`h-4 w-4 ${fg}`} />
        </span>
      </div>
      <div className="text-2xl font-bold tracking-tight text-zinc-900">{kpi.value}</div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <TrendBadge {...kpi.trend} />
          <span>vs mes anterior</span>
        </div>
      </div>
      <div className="mt-1 -mx-1">
        <Sparkline data={kpi.sparkline} height={36} />
      </div>
    </Card>
  )
}
