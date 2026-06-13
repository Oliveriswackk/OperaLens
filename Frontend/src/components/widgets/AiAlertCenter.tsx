import { Bell, ChevronRight } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { AlertSeverityBadge } from '@/components/shared/AlertSeverityBadge'
import type { AiAlert } from '@/types/dashboard'

interface AiAlertCenterProps {
  alerts: AiAlert[]
}

export function AiAlertCenter({ alerts }: AiAlertCenterProps) {
  return (
    <Card>
      <CardHeader
        title="Centro de Alertas IA"
        subtitle="Anomalías detectadas y acciones recomendadas en tiempo real"
        actions={
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            <Bell className="h-3.5 w-3.5" />
            {alerts.filter((a) => a.severity === 'critical' || a.severity === 'high').length} urgentes
          </span>
        }
      />
      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </Card>
  )
}

function AlertCard({ alert }: { alert: AiAlert }) {
  return (
    <div className="group rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-primary/20 hover:bg-white hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <AlertSeverityBadge severity={alert.severity} />
          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-zinc-500 ring-1 ring-zinc-100">
            {alert.category}
          </span>
        </div>
        <span className="text-xs text-zinc-400">{alert.time}</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-zinc-900">{alert.anomaly}</p>
      <p className="mt-1.5 text-sm text-zinc-500">
        <span className="font-medium text-zinc-700">Impacto: </span>
        {alert.impact}
      </p>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/5 px-3 py-2">
        <p className="text-xs text-zinc-600">
          <span className="font-semibold text-primary">Acción: </span>
          {alert.action}
        </p>
        <ChevronRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  )
}
