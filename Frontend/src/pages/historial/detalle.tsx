import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react'
import { AnalysisView } from '@/components/home/AnalysisView'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAnalisisDetalle } from '@/hooks/useAnalisisDetalle'
import { ApiError } from '@/lib/api/client'

export default function HistorialDetallePage() {
  const { id } = useParams<{ id: string }>()
  const numericId = id ? Number(id) : undefined
  const { data, isLoading, isError, error } = useAnalisisDetalle(numericId)

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex shrink-0 items-center justify-between">
        <Link to="/historial">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" /> Volver al historial
          </Button>
        </Link>
        {data && (
          <span className="text-xs text-zinc-400">Análisis #{data.analisis_id}</span>
        )}
      </div>

      {isLoading && (
        <Card className="flex flex-1 items-center justify-center gap-2 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Cargando análisis…
        </Card>
      )}

      {isError && (
        <Card className="flex items-start gap-3 border border-danger/20 bg-danger/5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
          <div>
            <p className="text-sm font-semibold text-danger">No se pudo cargar el análisis</p>
            <p className="mt-0.5 text-xs text-zinc-600">
              {error instanceof ApiError ? error.message : 'Verifica la conexión con el servidor.'}
            </p>
          </div>
        </Card>
      )}

      {data && <AnalysisView data={data} />}
    </div>
  )
}
