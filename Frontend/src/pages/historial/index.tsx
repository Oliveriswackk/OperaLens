import { Link } from 'react-router-dom'
import { AlertTriangle, Clock, Loader2, UploadCloud } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'
import { useHistorial } from '@/hooks/useHistorial'
import { ApiError } from '@/lib/api/client'
import { formatCurrency, formatNumber } from '@/lib/utils'

function formatFechaHora(value: string) {
  if (!value) return '—'
  const fecha = new Date(value)
  if (Number.isNaN(fecha.getTime())) return value.slice(0, 10)
  return fecha.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
}

function formatRangoPeriodo(inicio?: string, fin?: string) {
  if (!inicio && !fin) return '—'
  return `${inicio?.slice(0, 10) ?? '?'} → ${fin?.slice(0, 10) ?? '?'}`
}

export default function HistorialPage() {
  const { data, isLoading, isError, error } = useHistorial(20)

  return (
    <div className="mx-auto w-full max-w-5xl p-2">
      <PageHeader
        title="Historial de análisis"
        description="Análisis previos almacenados en el servidor compartido del equipo."
        actions={
          <Link to="/cargar">
            <Button>
              <UploadCloud className="h-4 w-4" /> Cargar nuevo
            </Button>
          </Link>
        }
      />

      {isLoading && (
        <Card className="flex items-center justify-center gap-2 py-12 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Cargando historial…
        </Card>
      )}

      {isError && (
        <Card className="flex items-start gap-3 border border-danger/20 bg-danger/5 py-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
          <div>
            <p className="text-sm font-semibold text-danger">No se pudo cargar el historial</p>
            <p className="mt-0.5 text-xs text-zinc-600">
              {error instanceof ApiError ? error.message : 'Verifica la conexión con el servidor.'}
            </p>
          </div>
        </Card>
      )}

      {data && data.length === 0 && (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Clock className="h-7 w-7 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Todavía no hay análisis</p>
            <p className="mt-1 text-sm text-zinc-500">
              Sube tu primer Excel para empezar a detectar pérdidas.
            </p>
          </div>
          <Link to="/cargar">
            <Button>
              <UploadCloud className="h-4 w-4" /> Cargar Excel
            </Button>
          </Link>
        </Card>
      )}

      {data && data.length > 0 && (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-[11px] uppercase tracking-wide text-zinc-400">
                  <th className="px-4 py-3 font-semibold">Fecha de carga</th>
                  <th className="px-4 py-3 font-semibold">Periodo</th>
                  <th className="px-4 py-3 text-right font-semibold">Pérdidas</th>
                  <th className="px-4 py-3 text-right font-semibold">Capital inmov.</th>
                  <th className="px-4 py-3 text-right font-semibold">Anomalías</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-zinc-50 transition-colors last:border-0 hover:bg-zinc-50/60"
                  >
                    <td className="px-4 py-3 font-medium text-zinc-800">
                      {formatFechaHora(row.fecha_carga)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      {formatRangoPeriodo(row.periodo_inicio, row.periodo_fin)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-zinc-900">
                      {formatCurrency(row.total_perdidas)}
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-700">
                      {formatCurrency(row.capital_inmovilizado)}
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-700">
                      {formatNumber(row.anomalias_count)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.id != null && (
                        <Link to={`/historial/${row.id}`}>
                          <Button size="sm" variant="outline">
                            Ver detalle
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
