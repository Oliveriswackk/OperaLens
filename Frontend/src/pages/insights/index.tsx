import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Lightbulb, Target, TrendingUp, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { PageLoader } from '@/components/shared/PageLoader'
import { ConfidenceIndicator } from '@/components/widgets/ConfidenceIndicator'
import { NoAnalysisState } from '@/components/shared/NoAnalysisState'
import { useInsights } from '@/hooks/useInsights'
import { cn } from '@/lib/utils'
import type { Insight } from '@/types'

const categorias: {
  id: Insight['categoria'] | 'todas'
  label: string
  icon: LucideIcon
}[] = [
  { id: 'todas', label: 'Todos', icon: Lightbulb },
  { id: 'oportunidad', label: 'Oportunidades', icon: TrendingUp },
  { id: 'cuello_de_botella', label: 'Cuellos de botella', icon: Workflow },
  { id: 'optimizacion', label: 'Optimización', icon: Target },
  { id: 'estrategico', label: 'Estratégico', icon: Lightbulb },
]

const categoriaLabel: Record<Insight['categoria'], string> = {
  oportunidad: 'Oportunidad',
  cuello_de_botella: 'Cuello de botella',
  optimizacion: 'Optimización',
  estrategico: 'Estratégico',
}

const prioridadVariant: Record<Insight['prioridad'], 'danger' | 'warning' | 'info'> = {
  P1: 'danger',
  P2: 'warning',
  P3: 'info',
}

export default function InsightsPage() {
  const { data: insights, isLoading, hasData } = useInsights()
  const [categoria, setCategoria] = useState<Insight['categoria'] | 'todas'>('todas')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!insights) return []
    return categoria === 'todas'
      ? insights
      : insights.filter((i) => i.categoria === categoria)
  }, [insights, categoria])

  if (isLoading) return <PageLoader />

  if (!hasData || !insights?.length) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Análisis de pérdidas"
          description="Hallazgos derivados del análisis de movimientos y explicación IA"
        />
        <NoAnalysisState />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div data-lupin-target="insights-header">
        <PageHeader
          title="Análisis de pérdidas"
          description="Hallazgos derivados del análisis de movimientos y explicación IA"
        />
      </div>

      {/* Filtros por categoría */}
      <div data-lupin-target="insights-filters" className="flex flex-wrap items-center gap-2">
        {categorias.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCategoria(id)}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              categoria === id
                ? 'bg-primary text-white'
                : 'bg-white text-zinc-500 ring-1 ring-zinc-200 hover:text-zinc-800',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Feed de insights */}
      <div data-lupin-target="insights-list" className="space-y-4">
        {filtered.map((insight) => {
          const isOpen = expanded === insight.id
          return (
            <Card key={insight.id} className="p-0">
              <button
                onClick={() => setExpanded(isOpen ? null : insight.id)}
                className="flex w-full items-start gap-4 p-6 text-left"
              >
                <Badge variant={prioridadVariant[insight.prioridad]} className="mt-0.5 shrink-0">
                  {insight.prioridad}
                </Badge>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-900">{insight.titulo}</h3>
                    <Badge variant="neutral">{categoriaLabel[insight.categoria]}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">{insight.hallazgo}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <Badge variant="success">{insight.impacto}</Badge>
                    <ConfidenceIndicator value={insight.confianza} />
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'mt-1 h-5 w-5 shrink-0 text-zinc-400 transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-zinc-100 px-6 py-5">
                  <div>
                    <h4 className="mb-1.5 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                      Explicación generada por IA
                    </h4>
                    <p className="rounded-xl bg-ai-banner p-4 text-sm leading-relaxed text-zinc-700">
                      {insight.explicacion}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                      Próximos pasos sugeridos
                    </h4>
                    <ul className="space-y-2">
                      {insight.pasos.map((paso, i) => (
                        <li key={paso} className="flex items-start gap-3 text-sm text-zinc-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                            {i + 1}
                          </span>
                          {paso}
                          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-zinc-300" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
