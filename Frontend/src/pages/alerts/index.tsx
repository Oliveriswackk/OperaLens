import { useMemo, useState } from 'react'
import { Bot, CheckCircle2, Clock, ShieldAlert, Siren, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { PageLoader } from '@/components/shared/PageLoader'
import { EmptyState } from '@/components/shared/EmptyState'
import { SeverityBadge } from '@/components/widgets/SeverityBadge'
import { NoAnalysisState } from '@/components/shared/NoAnalysisState'
import { useAlerts } from '@/hooks/useAlerts'
import { cn } from '@/lib/utils'
import type { Incident, Severidad } from '@/types'

const estadoBadge: Record<Incident['estado'], { label: string; variant: 'danger' | 'warning' | 'success' }> = {
  activo: { label: 'Activo', variant: 'danger' },
  investigando: { label: 'Investigando', variant: 'warning' },
  resuelto: { label: 'Resuelto', variant: 'success' },
}

const severityFilters: { id: Severidad | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'alta', label: 'Alta' },
  { id: 'media', label: 'Media' },
  { id: 'baja', label: 'Baja' },
]

export default function AlertsPage() {
  const { data, isLoading, hasData } = useAlerts()
  const [severity, setSeverity] = useState<Severidad | 'todas'>('todas')
  const [selected, setSelected] = useState<Incident | null>(null)

  const filtered = useMemo(() => {
    if (!data) return []
    return severity === 'todas'
      ? data.incidents
      : data.incidents.filter((i) => i.severidad === severity)
  }, [data, severity])

  if (isLoading) return <PageLoader />

  if (!hasData || !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Anomalías detectadas"
          description="Riesgos y desviaciones en movimientos de materiales procesados por OperaLens"
        />
        <NoAnalysisState />
      </div>
    )
  }

  const stats = [
    { label: 'Total anomalías', value: data.stats.activas, icon: Siren, color: 'text-red-500 bg-red-100' },
    { label: 'Severidad alta', value: data.stats.altas, icon: ShieldAlert, color: 'text-amber-600 bg-amber-100' },
    { label: 'Severidad media', value: data.stats.medias, icon: Clock, color: 'text-primary bg-primary/10' },
    { label: 'Severidad baja', value: data.stats.bajas, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100' },
  ]

  return (
    <div className="space-y-6">
      <div data-lupin-target="alerts-header">
        <PageHeader
          title="Anomalías detectadas"
          description="Riesgos y desviaciones en movimientos de materiales procesados por OperaLens"
        />
      </div>

      {/* KPIs */}
      <div data-lupin-target="alerts-stats" className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="flex items-center gap-4">
            <span className={cn('flex h-11 w-11 items-center justify-center rounded-full', color)}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-zinc-900">{value}</p>
              <p className="text-xs text-zinc-400">{label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2">
        {severityFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSeverity(f.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              severity === f.id
                ? 'bg-primary text-white'
                : 'bg-white text-zinc-500 ring-1 ring-zinc-200 hover:text-zinc-800',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Tabla de incidentes */}
        <Card data-lupin-target="alerts-table" className={cn('flex-1 p-0 transition-all', selected && 'hidden 2xl:block')}>
          {filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="Sin incidentes con este filtro"
                description="Prueba con otra severidad o revisa los incidentes resueltos."
              />
            </div>
          ) : (
            <Table>
              <THead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Anomalía</Th>
                  <Th>Material</Th>
                  <Th>Severidad</Th>
                  <Th>Estado</Th>
                  <Th>Detección</Th>
                  <Th>Hora</Th>
                </Tr>
              </THead>
              <TBody>
                {filtered.map((incident) => (
                  <Tr
                    key={incident.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(incident)}
                  >
                    <Td className="font-mono text-xs text-zinc-400">{incident.id}</Td>
                    <Td className="max-w-xs font-semibold text-zinc-900">{incident.titulo}</Td>
                    <Td>{incident.area}</Td>
                    <Td><SeverityBadge severidad={incident.severidad} /></Td>
                    <Td>
                      <Badge variant={estadoBadge[incident.estado].variant}>
                        {estadoBadge[incident.estado].label}
                      </Badge>
                    </Td>
                    <Td>
                      {incident.detectadoPorIA ? (
                        <Badge variant="primary" className="gap-1">
                          <Bot className="h-3 w-3" /> IA
                        </Badge>
                      ) : (
                        <span className="text-xs text-zinc-400">Manual</span>
                      )}
                    </Td>
                    <Td className="text-zinc-400">{incident.hora}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          )}
        </Card>

        {/* Panel de detalle */}
        {selected && (
          <Card className="w-full shrink-0 2xl:w-105">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-zinc-400">{selected.id}</p>
                <h3 className="mt-1 text-base font-bold text-zinc-900">{selected.titulo}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <SeverityBadge severidad={selected.severidad} />
                  <Badge variant={estadoBadge[selected.estado].variant}>
                    {estadoBadge[selected.estado].label}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100"
                aria-label="Cerrar detalle"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <h4 className="mb-1 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                  Riesgo asociado
                </h4>
                <p className="text-zinc-700">{selected.riesgo}</p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                  Posibles causas raíz (IA)
                </h4>
                <ul className="space-y-1.5">
                  {selected.causasRaiz.map((causa) => (
                    <li key={causa} className="flex gap-2 text-zinc-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {causa}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                  Acciones recomendadas
                </h4>
                <ul className="space-y-1.5">
                  {selected.accionesRecomendadas.map((accion) => (
                    <li key={accion} className="flex gap-2 text-zinc-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {accion}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                  Línea de tiempo
                </h4>
                <ol className="relative space-y-3 border-l border-zinc-100 pl-4">
                  {selected.timeline.map((evento) => (
                    <li key={evento.hora} className="relative">
                      <span className="absolute top-1.5 -left-[21.5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-primary" />
                      <p className="text-xs font-semibold text-zinc-400">{evento.hora}</p>
                      <p className="text-zinc-700">{evento.evento}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <Button className="w-full">Marcar como resuelto</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
