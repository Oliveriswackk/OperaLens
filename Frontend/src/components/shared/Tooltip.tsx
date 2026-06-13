import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-soft transition-opacity group-hover:opacity-100"
      >
        {content}
      </span>
    </span>
  )
}
