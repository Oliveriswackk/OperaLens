import { Bell } from 'lucide-react'
import { AlertSeverityBadge } from '@/components/shared/AlertSeverityBadge'
import { cn } from '@/lib/utils'
import type { HomeAlert } from '@/types/dashboard'

const priorityDot: Record<HomeAlert['severity'], string> = {
  critical: 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]',
  high: 'bg-orange-500',
  medium: 'bg-amber-400',
  low: 'bg-zinc-300',
}

interface HomeAlertPanelProps {
  alerts: HomeAlert[]
}

export function HomeAlertPanel({ alerts }: HomeAlertPanelProps) {
  return (
    <div className="flex h-full w-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
            <Bell className="h-4 w-4 text-red-500" />
          </span>
          <div>
            <h3 className="text-xs font-bold tracking-wide text-zinc-900 uppercase">
              Alertas y Anomalías
            </h3>
            <p className="text-[11px] text-zinc-500">
              {alerts.filter((a) => a.severity === 'critical' || a.severity === 'high').length}{' '}
              urgentes
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex shrink-0 gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/60 px-3 py-2.5 transition-colors hover:border-primary/20 hover:bg-white"
          >
            <span
              className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', priorityDot[alert.severity])}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <AlertSeverityBadge severity={alert.severity} />
                <span className="text-[10px] text-zinc-400">{alert.time}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-snug text-zinc-800">
                {alert.description}
              </p>
              <p className="mt-0.5 text-[10px] text-zinc-400">{alert.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
