import { Card, CardHeader } from '@/components/ui/card'
import { StatusDot } from '@/components/shared/StatusDot'
import type { ActivityEvent } from '@/types'

interface RealTimeActivityFeedProps {
  events: ActivityEvent[]
}

export function RealTimeActivityFeed({ events }: RealTimeActivityFeedProps) {
  return (
    <Card>
      <CardHeader
        title="Actividad en Tiempo Real"
        subtitle="Últimos eventos y actualizaciones del sistema"
      />
      <ul className="space-y-5">
        {events.map((event) => (
          <li key={event.id} className="flex items-start gap-3">
            <StatusDot status={event.status} className="mt-1.5" />
            <div>
              <p className="text-sm font-bold text-zinc-900">{event.title}</p>
              <p className="mt-0.5 text-xs text-zinc-400">
                {event.source} • {event.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
