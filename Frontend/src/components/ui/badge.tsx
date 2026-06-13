import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
  neutral: 'bg-zinc-100 text-zinc-600',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
