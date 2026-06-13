import { cn } from '@/lib/utils'

interface ConfidenceIndicatorProps {
  value: number // 0-100
  className?: string
}

export function ConfidenceIndicator({ value, className }: ConfidenceIndicatorProps) {
  const color =
    value >= 85 ? 'bg-emerald-500' : value >= 70 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-zinc-500">{value}% confianza</span>
    </div>
  )
}
