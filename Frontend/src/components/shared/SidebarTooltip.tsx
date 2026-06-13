import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SidebarTooltipProps {
  content: string
  children: ReactNode
  enabled?: boolean
  className?: string
}

export function SidebarTooltip({ content, children, enabled = true, className }: SidebarTooltipProps) {
  if (!enabled) return <>{children}</>

  return (
    <span className={cn('group/tooltip relative flex w-full', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-1/2 left-[calc(100%+12px)] z-[70] -translate-y-1/2 whitespace-nowrap rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/tooltip:opacity-100"
      >
        {content}
      </span>
    </span>
  )
}
