import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number // 0-100
  className?: string
  barClassName?: string
}

export function Progress({ value, className, barClassName }: ProgressProps) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-zinc-100', className)}>
      <div
        className={cn('h-full rounded-full bg-primary transition-all', barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
