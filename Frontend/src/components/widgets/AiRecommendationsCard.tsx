import { Badge } from '@/components/ui/badge'
import { Card, CardHeader } from '@/components/ui/card'
import { SeverityBadge } from './SeverityBadge'
import type { Recommendation } from '@/types'

interface AiRecommendationsCardProps {
  recommendations: Recommendation[]
}

export function AiRecommendationsCard({ recommendations }: AiRecommendationsCardProps) {
  const newCount = recommendations.filter((r) => r.isNew).length
  return (
    <Card>
      <CardHeader
        title="Recomendaciones IA"
        subtitle="Insights inteligentes para optimizar tus operaciones"
        actions={newCount > 0 && <Badge variant="primary">{newCount} Nuevas</Badge>}
      />
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="rounded-[20px] border border-zinc-100 p-4 transition-colors hover:border-primary/30"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-zinc-900">{rec.title}</h4>
              <div className="flex items-center gap-2">
                <SeverityBadge severidad={rec.priority} />
                <Badge variant="success">{rec.impact}</Badge>
              </div>
            </div>
            <p className="mt-1.5 text-sm text-zinc-500">{rec.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
