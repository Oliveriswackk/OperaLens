import { useState } from 'react'
import { AlertOctagon, CalendarClock } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { PageLoader } from '@/components/shared/PageLoader'
import { SeverityBadge } from '@/components/widgets/SeverityBadge'
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { useOperations } from '@/hooks/useOperations'
import { cn } from '@/lib/utils'
import type { ProcessItem } from '@/types'

const estadoProceso: Record<ProcessItem['estado'], { label: string; variant: 'success' | 'danger' | 'neutral' }> = {
  activo: { label: 'Activo', variant: 'success' },
  critico: { label: 'Crítico', variant: 'danger' },
  pausado: { label: 'Pausado', variant: 'neutral' },
}

const tabs = [
  { id: 'procesos', label: 'Procesos' },
  { id: 'recursos', label: 'Recursos' },
  { id: 'areas', label: 'Por Área' },
]

export default function OperationsPage() {
  const { data, isLoading } = useOperations()
  const [tab, setTab] = useState('procesos')

  if (isLoading || !data) return <PageLoader />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Centro de Operaciones"
        description="Monitoreo en tiempo real de procesos, flujos de trabajo y recursos"
        actions={<Tabs tabs={tabs} value={tab} onChange={setTab} />}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Panel principal */}
        <div className="space-y-6 xl:col-span-2">
          {tab === 'procesos' && (
            <Card>
              <CardHeader
                title="Estado de Procesos"
                subtitle="Flujos de trabajo activos y su progreso actual"
              />
              <div className="space-y-5">
                {data.processes.map((proceso) => (
                  <div key={proceso.id}>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold text-zinc-900">
                          {proceso.nombre}
                        </span>
                        <Badge variant={estadoProceso[proceso.estado].variant}>
                          {estadoProceso[proceso.estado].label}
                        </Badge>
                      </div>
                      <span className="text-xs text-zinc-400">
                        {proceso.area} · {proceso.responsable}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={proceso.progreso}
                        barClassName={cn(proceso.estado === 'critico' && 'bg-red-500')}
                      />
                      <span className="w-10 text-right text-xs font-bold text-zinc-600">
                        {proceso.progreso}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'recursos' && (
            <Card>
              <CardHeader
                title="Utilización de Recursos"
                subtitle="Capacidad instalada vs uso actual por equipo"
              />
              <Table>
                <THead>
                  <Tr>
                    <Th>Recurso</Th>
                    <Th>Capacidad</Th>
                    <Th className="w-1/3">Utilización</Th>
                  </Tr>
                </THead>
                <TBody>
                  {data.resources.map((recurso) => (
                    <Tr key={recurso.id}>
                      <Td className="font-semibold text-zinc-900">{recurso.recurso}</Td>
                      <Td className="text-zinc-500">{recurso.capacidad}</Td>
                      <Td>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={recurso.utilizacion}
                            barClassName={cn(
                              recurso.utilizacion >= 95
                                ? 'bg-red-500'
                                : recurso.utilizacion >= 85
                                  ? 'bg-amber-500'
                                  : 'bg-primary',
                            )}
                          />
                          <span className="w-10 text-right text-xs font-bold text-zinc-600">
                            {recurso.utilizacion}%
                          </span>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </Card>
          )}

          {tab === 'areas' && (
            <Card>
              <CardHeader
                title="Rendimiento por Área"
                subtitle="Índice de desempeño operativo por departamento"
              />
              <SimpleBarChart
                data={data.areaPerformance}
                xKey="area"
                barKey="rendimiento"
                name="Rendimiento"
              />
            </Card>
          )}
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Cuellos de Botella"
              subtitle="Detectados automáticamente por IA"
            />
            <div className="space-y-3">
              {data.bottlenecks.map((b) => (
                <div key={b.id} className="rounded-[20px] border border-zinc-100 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="h-4 w-4 shrink-0 text-red-500" />
                      <p className="text-sm font-bold text-zinc-900">{b.proceso}</p>
                    </div>
                    <SeverityBadge severidad={b.severidad} />
                  </div>
                  <p className="mt-1.5 pl-6 text-xs text-zinc-500">{b.impacto}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Tareas Críticas" subtitle="Pendientes con vencimiento próximo" />
            <ul className="space-y-4">
              {data.criticalTasks.map((t) => (
                <li key={t.id} className="flex items-start gap-3">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{t.tarea}</p>
                    <p className="text-xs text-zinc-400">
                      {t.vence} · {t.estado}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
