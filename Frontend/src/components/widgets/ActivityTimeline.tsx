import {
  AlertTriangle,
  Lightbulb,
  Package,
  ShieldAlert,
  ShoppingCart,
} from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { TimelineEvent, TimelineEventType } from '@/types/dashboard'

interface ActivityTimelineProps {
  events: TimelineEvent[]
}

const typeConfig: Record<
  TimelineEventType,
  { icon: typeof AlertTriangle; color: string; bg: string }
> = {
  anomaly: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
  inventory: { icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
  risk: { icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-100' },
  recommendation: { icon: Lightbulb, color: 'text-secondary', bg: 'bg-secondary/10' },
  sales: { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-100' },
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  return (
    <Card>
      <CardHeader
        title="Actividad Reciente"
        subtitle="Línea de tiempo de anomalías, eventos de inventario, alertas y recomendaciones"
      />
      <div className="relative space-y-0">
        {events.map((event, index) => {
          const config = typeConfig[event.type]
          const Icon = config.icon
          const isLast = index === events.length - 1

          return (
            <div key={event.id} className="relative flex gap-4 pb-6">
              {!isLast && (
                <span className="absolute top-10 left-5 h-full w-px bg-zinc-200" />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  config.bg,
                )}
              >
                <Icon className={cn('h-4.5 w-4.5', config.color)} />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-zinc-900">{event.title}</p>
                  <span className="text-xs text-zinc-400">{event.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-zinc-500">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
