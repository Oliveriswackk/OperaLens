import { Link } from 'react-router-dom'
import { FileText, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { useReports } from '@/hooks/useReports'
import { formatCurrency } from '@/lib/utils'

function formatFecha(value: string) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value.slice(0, 10)
  return d.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function ReportsPage() {
  const { data, isLoading, isError } = useReports(20)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-2">
      <PageHeader
        title="Reportes de análisis"
        description="Historial de análisis procesados por OperaLens desde el servidor compartido"
      />

      {isLoading && (
        <Card className="flex items-center justify-center gap-2 py-12 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Cargando reportes…
        </Card>
      )}

      {isError && (
        <EmptyState
          title="No se pudieron cargar los reportes"
          description="Verifica la conexión con el backend del equipo."
        />
      )}

      {data && data.length === 0 && (
        <EmptyState
          title="No hay reportes disponibles"
          description="Sube un Excel en Cargar Excel para generar el primer análisis."
          action={
            <Link to="/cargar">
              <Button>Cargar Excel</Button>
            </Link>
          }
        />
      )}

      {data && data.length > 0 && (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <THead>
                <Tr>
                  <Th>Reporte</Th>
                  <Th>Fecha</Th>
                  <Th>Periodo</Th>
                  <Th>Pérdidas</Th>
                  <Th>Anomalías</Th>
                  <Th />
                </Tr>
              </THead>
              <TBody>
                {data.map((rep) => (
                  <Tr key={rep.id} className="hover:bg-zinc-50/60">
                    <Td>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-semibold text-zinc-900">{rep.nombre}</p>
                          <p className="text-xs text-zinc-500">{rep.descripcion}</p>
                        </div>
                      </div>
                    </Td>
                    <Td className="text-zinc-600">{formatFecha(rep.fecha)}</Td>
                    <Td className="text-zinc-500">{rep.periodo}</Td>
                    <Td className="font-semibold">{formatCurrency(rep.perdidas)}</Td>
                    <Td>{rep.anomalias}</Td>
                    <Td className="text-right">
                      <Link to={`/historial/${rep.id}`}>
                        <Button size="sm" variant="outline">
                          Ver análisis
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  )
}
