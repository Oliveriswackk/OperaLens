import { Card, CardHeader } from '@/components/ui/card'
import { StatusDot } from '@/components/shared/StatusDot'
import type { AlertSummaryItem } from '@/types'

interface RecentAlertsCardProps {
  alerts: AlertSummaryItem[]
}

export function RecentAlertsCard({ alerts }: RecentAlertsCardProps) {
  return (
    <Card>
      <CardHeader
        title="Alertas Recientes"
        subtitle="Notificaciones y advertencias del sistema"
      />
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 rounded-[20px] border border-zinc-100 p-4"
          >
            <StatusDot status={alert.status} className="mt-1.5" />
            <div>
              <p className="text-sm font-bold text-zinc-900">{alert.message}</p>
              <p className="mt-0.5 text-xs text-zinc-400">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
