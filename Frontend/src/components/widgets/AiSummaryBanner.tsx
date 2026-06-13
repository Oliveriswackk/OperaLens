import { Zap } from 'lucide-react'
import type { ReactNode } from 'react'

interface AiSummaryBannerProps {
  title?: string
  children: ReactNode
}

export function AiSummaryBanner({
  title = 'Resumen Operacional Generado por IA',
  children,
}: AiSummaryBannerProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-ai-banner p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
        <Zap className="h-5 w-5 text-white" />
      </span>
      <div>
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-700 [&>strong]:font-bold [&>strong]:text-zinc-900">
          {children}
        </p>
      </div>
    </div>
  )
}
