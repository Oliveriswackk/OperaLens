import { Link } from 'react-router-dom'
import { UploadCloud } from 'lucide-react'
import { AnalysisView } from '@/components/home/AnalysisView'
import { LossTrendPanel } from '@/components/home/LossTrendPanel'
import { Button } from '@/components/ui/button'
import { useDashboardData } from '@/hooks/useDashboardData'

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-zinc-200 bg-white/60 p-10 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <UploadCloud className="h-8 w-8 text-primary" />
      </span>
      <div>
        <h2 className="text-lg font-bold tracking-tight text-zinc-900">
          Aún no hay un análisis cargado
        </h2>
        <p className="mt-1 max-w-md text-sm text-zinc-500">
          Sube tu Excel de movimientos de materiales para detectar dónde podrías estar perdiendo
          dinero: desperdicio, capital inmovilizado y consumos anómalos.
        </p>
      </div>
      <Link to="/cargar">
        <Button>
          <UploadCloud className="h-4 w-4" /> Cargar Excel
        </Button>
      </Link>
    </div>
  )
}

export default function DashboardPage() {
  const data = useDashboardData()

  if (!data) return <EmptyState />

  return <AnalysisView data={data} asidePanel={<LossTrendPanel />} />
}
