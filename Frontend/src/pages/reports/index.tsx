import { useState } from 'react'
import { Download, FileSpreadsheet, FileText, Plus, Sparkles } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { Sparkline } from '@/components/charts/Sparkline'
import { reportGallery, scheduledReports } from '@/data/mocks/reports'
import type { ScheduledReport } from '@/types'

const tabs = [
  { id: 'galeria', label: 'Galería' },
  { id: 'programados', label: 'Programados' },
]

const ejecucionBadge: Record<ScheduledReport['ultimaEjecucion'], { label: string; variant: 'success' | 'danger' | 'neutral' }> = {
  exitosa: { label: 'Exitosa', variant: 'success' },
  fallida: { label: 'Fallida', variant: 'danger' },
  pendiente: { label: 'Pendiente', variant: 'neutral' },
}

const sparkData = [4, 6, 5, 8, 7, 9, 8, 11, 10, 12]

export default function ReportsPage() {
  const [tab, setTab] = useState('galeria')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reportes"
        description="Generación, programación y exportación de reportes operacionales"
        actions={
          <>
            <Button variant="secondary" size="md">
              <Sparkles className="h-4 w-4" /> Resumen ejecutivo IA
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" /> Nuevo reporte
            </Button>
          </>
        }
      />

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'galeria' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reportGallery.map((reporte) => (
            <Card key={reporte.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </span>
                <Badge variant={reporte.tipo.includes('IA') ? 'primary' : 'neutral'}>
                  {reporte.tipo}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{reporte.nombre}</h3>
                <p className="mt-1 text-xs text-zinc-500">{reporte.descripcion}</p>
              </div>
              <Sparkline data={sparkData} />
              <div className="mt-auto flex items-center justify-between border-t border-zinc-50 pt-3">
                <span className="text-[11px] text-zinc-400">
                  Última generación: {reporte.ultimaGeneracion}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" aria-label="Exportar PDF">
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Exportar Excel">
                    <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'programados' && (
        <Card className="p-0">
          <CardHeader
            className="px-6 pt-6"
            title="Reportes Programados"
            subtitle="Ejecuciones automáticas y su estado"
          />
          <Table>
            <THead>
              <Tr>
                <Th>Reporte</Th>
                <Th>Frecuencia</Th>
                <Th>Próxima ejecución</Th>
                <Th>Estado</Th>
                <Th>Última ejecución</Th>
              </Tr>
            </THead>
            <TBody>
              {scheduledReports.map((rep) => (
                <Tr key={rep.id}>
                  <Td className="font-semibold text-zinc-900">{rep.nombre}</Td>
                  <Td className="text-zinc-500">{rep.frecuencia}</Td>
                  <Td className="text-zinc-500">{rep.proximaEjecucion}</Td>
                  <Td>
                    <Badge variant={rep.estado === 'activo' ? 'success' : 'neutral'}>
                      {rep.estado === 'activo' ? 'Activo' : 'Pausado'}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge variant={ejecucionBadge[rep.ultimaEjecucion].variant}>
                      {ejecucionBadge[rep.ultimaEjecucion].label}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
