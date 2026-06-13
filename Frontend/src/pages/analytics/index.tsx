import { useState } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { PageLoader } from '@/components/shared/PageLoader'
import { AiSummaryBanner } from '@/components/widgets/AiSummaryBanner'
import { ConfidenceIndicator } from '@/components/widgets/ConfidenceIndicator'
import { TrendLineChart } from '@/components/charts/TrendLineChart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

function heatColor(value: number) {
  if (value >= 85) return 'bg-primary text-white'
  if (value >= 75) return 'bg-primary/60 text-white'
  if (value >= 65) return 'bg-primary/30 text-primary'
  return 'bg-primary/10 text-primary'
}

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics()
  const [personal, setPersonal] = useState(0) // -20..20 (%)
  const [automatizacion, setAutomatizacion] = useState(0) // 0..30 (%)

  if (isLoading || !data) return <PageLoader />

  // Modelo simple de What-If sobre la línea base
  const base = data.whatIfBaseline
  const eficienciaSim = Math.min(99, base.eficiencia + personal * 0.15 + automatizacion * 0.22)
  const costoSim = base.costoMensual * (1 + personal * 0.004 - automatizacion * 0.006)
  const throughputSim = Math.round(base.throughput * (1 + personal * 0.005 + automatizacion * 0.009))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analítica e Inteligencia Predictiva"
        description="Predicciones, simulación de escenarios y tendencias impulsadas por IA"
      />

      <AiSummaryBanner title="Resumen de Inteligencia Operacional">
        Los modelos predicen una <strong>mejora del 8.4% en productividad</strong> para los
        próximos 7 días. El principal riesgo identificado es la{' '}
        <strong>saturación de la estación de empaque</strong>. Las pérdidas operativas
        mantienen tendencia descendente con proyección de <strong>$1,520 para agosto</strong>.
      </AiSummaryBanner>

      {/* Predicciones */}
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {data.predictions.map((pred) => {
          const Icon = pred.tendencia === 'up' ? TrendingUp : TrendingDown
          return (
            <Card key={pred.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                  Predicción · {pred.nombre}
                </span>
                <Icon
                  className={cn(
                    'h-4 w-4',
                    pred.tendencia === 'up' ? 'text-emerald-500' : 'text-primary',
                  )}
                />
              </div>
              <div className="text-2xl font-bold text-zinc-900">{pred.valor}</div>
              <p className="text-xs text-zinc-500">{pred.descripcion}</p>
              <ConfidenceIndicator value={pred.confianza} />
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Forecast de pérdidas */}
        <Card>
          <CardHeader
            title="Tendencia de Pérdidas Operativas"
            subtitle="Histórico de 6 meses + proyección del modelo (línea punteada)"
          />
          <TrendLineChart
            data={data.lossTrend}
            xKey="mes"
            series={[
              { key: 'perdidas', name: 'Pérdidas', color: '#522E93' },
              { key: 'forecast', name: 'Proyección IA', color: '#673AB7', dashed: true },
            ]}
          />
        </Card>

        {/* What-If */}
        <Card>
          <CardHeader
            title='Análisis "What-If"'
            subtitle="Ajusta los parámetros y observa el impacto simulado"
          />
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700">Personal operativo</span>
                <span className="font-bold text-primary">
                  {personal > 0 ? '+' : ''}
                  {personal}%
                </span>
              </div>
              <input
                type="range"
                min={-20}
                max={20}
                value={personal}
                onChange={(e) => setPersonal(Number(e.target.value))}
                className="w-full accent-[#522E93]"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700">Nivel de automatización</span>
                <span className="font-bold text-primary">+{automatizacion}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={automatizacion}
                onChange={(e) => setAutomatizacion(Number(e.target.value))}
                className="w-full accent-[#522E93]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Eficiencia', antes: `${base.eficiencia}%`, despues: `${eficienciaSim.toFixed(1)}%` },
                { label: 'Costo mensual', antes: formatCurrency(base.costoMensual), despues: formatCurrency(Math.round(costoSim)) },
                { label: 'Throughput', antes: `${base.throughput} u/h`, despues: `${throughputSim} u/h` },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-zinc-50 p-4 text-center">
                  <p className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
                    {m.label}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400 line-through">{m.antes}</p>
                  <p className="text-lg font-bold text-primary">{m.despues}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Escenarios */}
        <Card className="p-0">
          <CardHeader
            className="px-6 pt-6"
            title="Simulación de Escenarios"
            subtitle="Impacto estimado de decisiones estratégicas"
          />
          <Table>
            <THead>
              <Tr>
                <Th>Escenario</Th>
                <Th>Eficiencia</Th>
                <Th>Costo</Th>
                <Th>Riesgo</Th>
              </Tr>
            </THead>
            <TBody>
              {data.scenarioPresets.map((sc) => (
                <Tr key={sc.id}>
                  <Td className="font-semibold text-zinc-900">{sc.nombre}</Td>
                  <Td>
                    <Badge variant={sc.eficiencia.startsWith('+') ? 'success' : 'danger'}>
                      {sc.eficiencia}
                    </Badge>
                  </Td>
                  <Td className="text-zinc-600">{sc.costo}</Td>
                  <Td>
                    <Badge
                      variant={
                        sc.riesgo === 'Alto' ? 'danger' : sc.riesgo === 'Medio' ? 'warning' : 'success'
                      }
                    >
                      {sc.riesgo}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Card>

        {/* Heatmap */}
        <Card>
          <CardHeader
            title="Mapa de Calor — Eficiencia por Etapa"
            subtitle="Desempeño semanal por etapa del proceso productivo"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-zinc-400 uppercase">
                    Etapa
                  </th>
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((d) => (
                    <th key={d} className="px-2 py-2 text-center text-xs font-semibold text-zinc-400 uppercase">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.trendHeatmap.map((row) => (
                  <tr key={row.etapa}>
                    <td className="px-2 py-1.5 font-medium text-zinc-700">{row.etapa}</td>
                    {[row.lun, row.mar, row.mie, row.jue, row.vie].map((v, i) => (
                      <td key={i} className="p-1">
                        <div
                          className={cn(
                            'rounded-lg py-2 text-center text-xs font-bold',
                            heatColor(v),
                          )}
                        >
                          {v}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
