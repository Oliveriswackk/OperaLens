import { TrendingDown } from 'lucide-react'
import { TrendLineChart } from '@/components/charts/TrendLineChart'
import { useTendencia } from '@/hooks/useTendencia'

function formatFecha(value: string) {
  if (!value) return ''
  const fecha = new Date(value)
  if (Number.isNaN(fecha.getTime())) return value.slice(0, 10)
  return fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
}

export function LossTrendPanel() {
  const { data, isLoading } = useTendencia(6)

  const chartData = (data ?? []).map((p) => ({
    fecha: formatFecha(p.fecha_carga),
    perdidas: p.total_perdidas,
  }))

  return (
    <div className="flex h-full w-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
          <TrendingDown className="h-4 w-4 text-emerald-600" />
        </span>
        <h3 className="text-xs font-bold tracking-wide text-zinc-900 uppercase">
          Tendencia de pérdidas
        </h3>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        {isLoading ? (
          <p className="text-xs text-zinc-400">Cargando tendencia…</p>
        ) : chartData.length < 2 ? (
          <p className="px-4 text-center text-xs text-zinc-400">
            Se necesitan al menos dos análisis para mostrar la tendencia.
          </p>
        ) : (
          <TrendLineChart
            data={chartData}
            xKey="fecha"
            series={[{ key: 'perdidas', name: 'Pérdidas', color: '#522E93' }]}
            height={200}
          />
        )}
      </div>
    </div>
  )
}
