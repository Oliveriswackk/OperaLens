import { Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ExecutiveSummary } from '@/types/dashboard'

interface AiExecutiveSummaryProps {
  summary: ExecutiveSummary
}

const statusStyles = {
  good: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  warning: 'bg-amber-50 text-amber-700 ring-amber-100',
  critical: 'bg-red-50 text-red-700 ring-red-100',
}

export function AiExecutiveSummary({ summary }: AiExecutiveSummaryProps) {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#f3eefa] via-white to-white p-8 shadow-soft">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                Análisis Inteligente
              </p>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                Resumen Ejecutivo Inteligente
              </h2>
            </div>
          </div>
          <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline">
            Actualizado hace 8 min
          </span>
        </div>

        <p className="max-w-4xl text-base leading-relaxed text-zinc-700 [&>strong]:font-semibold [&>strong]:text-zinc-900">
          {summary.highlights.map((part, i) =>
            part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>,
          )}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summary.insights.map((insight) => (
            <div
              key={insight.label}
              className={cn(
                'rounded-2xl px-4 py-3 ring-1 ring-inset',
                statusStyles[insight.status],
              )}
            >
              <p className="text-[11px] font-semibold tracking-wide uppercase opacity-70">
                {insight.label}
              </p>
              <p className="mt-0.5 text-sm font-bold">{insight.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
