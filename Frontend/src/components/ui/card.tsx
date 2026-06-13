import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl bg-white p-6 shadow-card', className)}
      {...props}
    />
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}

/** Header de card estilo mockup: título uppercase bold + subtítulo gris */
export function CardHeader({ title, subtitle, actions, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-5 flex items-start justify-between gap-4', className)}>
      <div>
        <h3 className="text-sm font-bold tracking-wide text-zinc-900 uppercase">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
