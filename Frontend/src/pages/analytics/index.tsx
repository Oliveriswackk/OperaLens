import { useState } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { PageLoader } from '@/components/shared/PageLoader'
import { AiSummaryBanner } from '@/components/widgets/AiSummaryBanner'
import { ConfidenceIndicator } from '@/components/widgets/ConfidenceIndicator'
import { TrendLineChart } from '@/components/charts/TrendLineChart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { cn } from '@/lib/utils'

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics() as { data: any; isLoading: boolean }
  const [selectedMonth, setSelectedMonth] = useState('Jun')

  const mesesLista = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  if (isLoading || !data) return <PageLoader />

  const currentProducts = data.topProductsByMonth[selectedMonth] || data.topProductsByMonth['Jun'] || []

  return (
    <div className="space-y-6 w-full max-w-[1600px] mx-auto p-2">
      <PageHeader
        title="Analítica e Inteligencia Predictiva"
        description="Predicciones, simulación de escenarios y tendencias impulsadas por IA"
      />

      <div className="w-full">
        <AiSummaryBanner title="Resumen de Inteligencia Operacional">
          Los modelos predicen una <strong className="text-primary">mejora del 8.4% en productividad</strong> para los
          próximos 7 días. El principal riesgo identificado es la{' '}
          <strong>saturación de la estación de empaque</strong>. Las pérdidas operativas
          mantienen tendencia descendente con proyección de <strong>$1,520 para agosto</strong>.
        </AiSummaryBanner>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {data.predictions.map((pred: any) => {
          const Icon = pred.tendencia === 'up' ? TrendingUp : TrendingDown
          return (
            <Card key={pred.id} className="flex flex-col justify-between gap-2 bg-white p-5 shadow-card rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
                  Predicción · {pred.nombre}
                </span>
                <Icon
                  className={cn(
                    'h-4 w-4 flex-shrink-0',
                    pred.tendencia === 'up' ? 'text-emerald-500' : 'text-primary'
                  )}
                />
              </div>
              <div className="my-1">
                <div className="text-2xl font-bold text-zinc-900 tracking-tight">{pred.valor}</div>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{pred.descripcion}</p>
              </div>
              <div className="mt-auto pt-1">
                <ConfidenceIndicator value={pred.confianza} />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
        <Card className="bg-white p-6 shadow-card rounded-xl xl:col-span-2 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
              Panel de Análisis de Ventas
            </h3>
            <p className="text-xs text-zinc-400">Tendencia de Ingresos Mensuales vs. Objetivo</p>
          </div>
          <div className="h-64 w-full relative">
            <TrendLineChart
              data={data.salesTrend}
              xKey="mes"
              series={[
                { key: 'ingresos', name: 'Ingresos', color: '#522E93' },
                { key: 'objetivo', name: 'Objetivo', color: '#673AB7', dashed: true },
              ]}
            />
          </div>
        </Card>

        <Card className="bg-white p-6 shadow-card rounded-xl flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
              Top 5 Productos Más Vendidos
            </h3>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mt-1">Mes</span>
            
            <div className="flex flex-wrap gap-1 border-b border-zinc-100 pb-2 mt-2">
              {mesesLista.map((mes) => (
                <button
                  key={mes}
                  onClick={() => setSelectedMonth(mes)}
                  className={cn(
                    'px-2 py-1 text-[11px] font-medium rounded-md transition-colors',
                    selectedMonth === mes
                      ? 'bg-primary text-white font-bold'
                      : 'text-zinc-500 hover:bg-zinc-100'
                  )}
                  disabled={!data.topProductsByMonth[mes]}
                  style={{ opacity: data.topProductsByMonth[mes] ? 1 : 0.3 }}
                >
                  {mes}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3.5 flex-grow justify-center flex flex-col">
            {currentProducts.map((product: any, idx: number) => {
              const maxSales = currentProducts[0]?.sales || 1;
              const widthPercent = Math.max(10, (product.sales / maxSales) * 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-zinc-700">
                    <span>{product.name}</span>
                    <span className="font-bold text-zinc-900">{product.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-3">
                    <div 
                      className="bg-[#522E93] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 w-full">
        <Card className="bg-white p-0 shadow-card rounded-xl xl:col-span-3 overflow-hidden border border-zinc-100">
          <div className="p-6 pb-3">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
              Simulación de Escenarios
            </h3>
            <p className="text-xs text-zinc-400">Impacto estimado de decisiones estratégicas</p>
          </div>
          <div className="overflow-x-auto">
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
                {data.scenarioPresets.map((sc: any) => (
                  <Tr key={sc.id}>
                    <Td className="font-semibold text-zinc-900 text-xs py-3.5">{sc.nombre}</Td>
                    <Td className="py-3.5">
                      <Badge variant={sc.eficiencia.startsWith('+') ? 'success' : 'danger'}>
                        {sc.eficiencia}
                      </Badge>
                    </Td>
                    <Td className="text-zinc-600 text-xs py-3.5">{sc.costo}</Td>
                    <Td className="py-3.5">
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
          </div>
        </Card>

        <Card className="bg-[#f3eefa] p-6 shadow-card rounded-xl border border-[#e1d5f2] flex flex-col justify-between xl:col-span-2">
          <div className="mb-2">
            <h3 className="text-sm font-semibold tracking-wide text-[#522E93] uppercase">
              Tendencia de Pérdidas Operativas
            </h3>
            <p className="text-xs text-zinc-500 leading-snug">Histórico de 6 meses + proyección del modelo (línea punteada)</p>
          </div>
          
          <div className="h-56 w-full relative pt-2 pb-8 px-2">
            <TrendLineChart
              data={data.lossTrend}
              xKey="mes"
              series={[
                { key: 'perdidas', name: 'Pérdidas', color: '#000000' },
                { key: 'forecast', name: 'Proyección IA', color: '#ffffff', dashed: true },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}