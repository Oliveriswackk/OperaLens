import { cn } from '@/lib/utils'

export type DotStatus = 'success' | 'info' | 'warning' | 'danger' | 'neutral'

const colors: Record<DotStatus, string> = {
  success: 'bg-emerald-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  neutral: 'bg-zinc-300',
}

interface StatusDotProps {
  status: DotStatus
  pulse?: boolean
  className?: string
}

export function StatusDot({ status, pulse, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        'inline-block h-2 w-2 shrink-0 rounded-full',
        colors[status],
        pulse && 'animate-pulse',
        className,
      )}
    />
  )
}
