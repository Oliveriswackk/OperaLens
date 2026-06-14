import { Sparkles } from 'lucide-react'
import type { HomeExecutiveSummary } from '@/types/dashboard'

interface HomeExecutiveSummaryProps {
  summary: HomeExecutiveSummary
}

export function HomeExecutiveSummary({ summary }: HomeExecutiveSummaryProps) {
  return (
    <div
      data-lupin-target="ai-summary"
      className="relative flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-r from-[#f3eefa] via-white to-white px-5 py-4 shadow-soft"
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
        <Sparkles className="h-5 w-5 text-white" />
      </span>
      <div className="relative min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-3">
          <h2 className="text-sm font-bold tracking-tight text-zinc-900">Resumen Inteligente</h2>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {summary.updatedAt}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 [&>strong]:font-semibold [&>strong]:text-zinc-900">
          {summary.narrative.map((part, i) =>
            part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>,
          )}
        </p>
      </div>
    </div>
  )
}
