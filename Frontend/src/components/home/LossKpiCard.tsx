import { AlertTriangle, DollarSign, Lock, Package } from 'lucide-react'
import { Card } from '@/components/ui/card'

type KpiIcon = 'perdidas' | 'capital' | 'anomalias' | 'inventario'

const iconMap: Record<KpiIcon, { Icon: typeof DollarSign; bg: string; fg: string }> = {
  perdidas: { Icon: DollarSign, bg: 'bg-red-100', fg: 'text-red-600' },
  capital: { Icon: Lock, bg: 'bg-amber-100', fg: 'text-amber-600' },
  anomalias: { Icon: AlertTriangle, bg: 'bg-orange-100', fg: 'text-orange-600' },
  inventario: { Icon: Package, bg: 'bg-primary/10', fg: 'text-primary' },
}

interface LossKpiCardProps {
  label: string
  value: string
  icon: KpiIcon
  hint?: string
}

export function LossKpiCard({ label, value, icon, hint }: LossKpiCardProps) {
  const { Icon, bg, fg } = iconMap[icon]
  return (
    <Card className="flex flex-col gap-2 p-5">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
          {label}
        </span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
          <Icon className={`h-4 w-4 ${fg}`} />
        </span>
      </div>
      <div className="text-2xl font-bold tracking-tight text-zinc-900">{value}</div>
      {hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </Card>
  )
}
