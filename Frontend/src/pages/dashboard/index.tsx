import { Link } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { BehaviorPatternPanel } from '@/components/home/BehaviorPatternPanel'
import { HomeAlertPanel } from '@/components/home/HomeAlertPanel'
import { HomeExecutiveSummary } from '@/components/home/HomeExecutiveSummary'
import { HomeQuickActions } from '@/components/home/HomeQuickActions'
import { HomeSalesChart } from '@/components/home/HomeSalesChart'
import { useDashboardData } from '@/hooks/useDashboardData'

function DashboardPage() {
  const { data, loading, error } = useDashboardData()

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-500">Cargando resumen ejecutivo…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <Link to="/cargar" className="text-sm font-medium text-primary hover:underline">
          Ir a Cargar Excel
        </Link>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900">Sin análisis activo</h2>
          <p className="mt-1 max-w-sm text-sm text-zinc-500">
            Sube un archivo Excel para generar el resumen inteligente, tendencias y alertas de tu
            operación.
          </p>
        </div>
        <Link
          to="/cargar"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          Cargar Excel
        </Link>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
      <div className="shrink-0">
        <h1 className="text-lg font-bold tracking-tight text-zinc-900">Inicio</h1>
        <p className="text-[11px] text-zinc-500">Resumen ejecutivo de operaciones</p>
      </div>

      <HomeExecutiveSummary summary={data.summary} />

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-2 overflow-hidden">
        <div className="col-span-12 min-h-0 lg:col-span-5">
          <HomeSalesChart data={data.salesTrend} topProducts={data.topProducts} />
        </div>
        <div className="col-span-12 min-h-0 lg:col-span-4">
          <BehaviorPatternPanel
            insights={data.behaviorInsights}
            patternCount={data.behaviorInsights.length}
          />
        </div>
        <div className="col-span-12 min-h-0 lg:col-span-3">
          <HomeAlertPanel alerts={data.alerts} />
        </div>
      </div>

      <HomeQuickActions />
    </div>
  )
}

export default DashboardPage
