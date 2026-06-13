import { Badge } from '@/components/ui/badge'
import type { StockLevel } from '@/types/inventory'
import { cn } from '@/lib/utils'

const config: Record<
  StockLevel,
  { label: string; variant: 'danger' | 'warning' | 'success'; className: string }
> = {
  bajo: {
    label: 'Stock Bajo',
    variant: 'danger',
    className: 'bg-red-500/15 text-red-400 ring-red-500/20',
  },
  medio: {
    label: 'Stock Medio',
    variant: 'warning',
    className: 'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  },
  alto: {
    label: 'Stock Saludable',
    variant: 'success',
    className: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
  },
}

interface StockBadgeProps {
  level: StockLevel
  stock: number
  className?: string
}

export function StockBadge({ level, stock, className }: StockBadgeProps) {
  const { label, className: levelClass } = config[level]
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-mono text-sm font-medium text-zinc-200">{stock}</span>
      <Badge className={cn('ring-1 ring-inset', levelClass)} variant="neutral">
        {label}
      </Badge>
    </div>
  )
}
