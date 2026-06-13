import {
  AlertTriangle,
  ArrowUpRight,
  Brain,
  Minus,
  Package,
  TrendingDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BehaviorInsight } from '@/types/dashboard'

const sentimentConfig = {
  positive: {
    icon: ArrowUpRight,
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50/80',
    text: 'text-emerald-700',
  },
  negative: {
    icon: TrendingDown,
    dot: 'bg-red-500',
    bg: 'bg-red-50/80',
    text: 'text-red-700',
  },
  warning: {
    icon: AlertTriangle,
    dot: 'bg-amber-500',
    bg: 'bg-amber-50/80',
    text: 'text-amber-700',
  },
  neutral: {
    icon: Minus,
    dot: 'bg-zinc-400',
    bg: 'bg-zinc-50',
    text: 'text-zinc-600',
  },
}

interface BehaviorPatternPanelProps {
  insights: BehaviorInsight[]
}

export function BehaviorPatternPanel({ insights }: BehaviorPatternPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/10">
          <Brain className="h-4 w-4 text-secondary" />
        </span>
        <div>
          <h3 className="text-xs font-bold tracking-wide text-zinc-900 uppercase">
            Patrones de Conducta
          </h3>
          <p className="text-[11px] text-zinc-500">Análisis generado por IA</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
        {insights.map((insight) => {
          const config = sentimentConfig[insight.sentiment]
          const Icon = config.icon
          return (
            <div
              key={insight.id}
              className={cn('flex gap-2.5 rounded-xl px-3 py-2', config.bg)}
            >
              <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', config.dot)} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Icon className={cn('h-3 w-3 shrink-0', config.text)} />
                  <p className={cn('text-[11px] font-bold', config.text)}>{insight.label}</p>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-600">
                  {insight.detail}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/5 px-3 py-2">
        <Package className="h-3.5 w-3.5 text-primary" />
        <p className="text-[10px] text-zinc-600">
          <span className="font-semibold text-primary">IA:</span> 6 patrones analizados en los
          últimos 30 días
        </p>
      </div>
    </div>
  )
}
