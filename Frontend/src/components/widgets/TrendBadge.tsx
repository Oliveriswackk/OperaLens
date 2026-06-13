import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TrendDirection } from '@/types'

interface TrendBadgeProps {
  direction: TrendDirection
  value: string
  positive: boolean
  className?: string
}

export function TrendBadge({ direction, value, positive, className }: TrendBadgeProps) {
  const Icon = direction === 'up' ? TrendingUp : TrendingDown
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        positive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600',
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {value}
    </span>
  )
}
