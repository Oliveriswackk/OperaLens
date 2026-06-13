import { useState } from 'react'
import { Download, FileSpreadsheet, FileText, Plus, Sparkles, PlayCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { Sparkline } from '@/components/charts/Sparkline'
import { reportGallery, scheduledReports } from '@/data/mocks/reports'
import type { ScheduledReport } from '@/types'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'galeria', label: 'Galería' },
  { id: 'programados', label: 'Programados' },
]

const ejecucionBadge: Record<ScheduledReport['ultimaEjecucion'], { label: string; variant: 'success' | 'danger' | 'neutral' }> = {
  exitosa: { label: 'Exitosa', variant: 'success' },
  fallida: { label: 'Fallida', variant: 'danger' },
  pendiente: { label: 'Pendiente', variant: 'neutral' },
}

const sparklineVariaciones: Record<string, number[]> = {
  rep1: [4, 5, 5, 6, 5, 7, 6, 8, 7, 9],
  rep2: [10, 9, 11, 8, 10, 9, 11, 12, 10, 13],
  rep3: [2, 4, 3, 6, 5, 8, 7, 10, 9, 12],
  rep4: [8, 8, 7, 9, 8, 10, 9, 11, 10, 11],
  rep5: [12, 11, 10, 8, 7, 6, 5, 4, 3, 2],
  rep6: [5, 6, 5, 7, 6, 8, 7, 9, 8, 10],
}

export default function ReportsPage() {
  const [tab, setTab] = useState('galeria')

  const handleExecuteNow = (nombreReporte: string) => {
    alert(`⚡ Generando ejecución inmediata para: ${nombreReporte}`)
  }

  return (
    <div className="space-y-6 w-full max-w-[1600px] mx-auto p-2">
      <PageHeader
        title="Reportes"
        description="Generación, programación y exportación de reportes operacionales"
        actions={
          <>
            <Button variant="secondary" size="md" className="hover:bg-zinc-100 transition-colors">
              <Sparkles className="h-4 w-4 text-primary" /> Resumen ejecutivo IA
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
          {reportGallery.map((reporte) => {
            const isAiReport = reporte.tipo.includes('IA')
            const currentSparkData = sparklineVariaciones[reporte.id] || [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

            return (
              <Card 
                key={reporte.id} 
                className={cn(
                  "flex flex-col gap-4 p-5 rounded-xl border bg-white border-zinc-100 shadow-card",
                  "transition-all duration-300 ease-out cursor-pointer group",
                  "hover:-translate-y-1 hover:scale-[1.01]",
                  "hover:border-[#522E93] hover:shadow-[0_12px_24px_rgba(82,46,147,0.06)]"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    isAiReport ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <FileText className="h-5 w-5 text-primary" />
                  </span>
                  
                  <Badge variant={isAiReport ? 'success' : 'neutral'}>
                    {reporte.tipo}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-zinc-900 tracking-tight">{reporte.nombre}</h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{reporte.descripcion}</p>
                </div>

                <div className="py-2 opacity-85 hover:opacity-100 transition-opacity">
                  <Sparkline data={currentSparkData} />
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
                  <span className="text-[11px] text-zinc-400 font-medium">
                    Última generación: {reporte.ultimaGeneracion}
                  </span>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-zinc-400 transition-colors duration-200 group-hover:text-[#522E93] hover:text-[#522E93] hover:bg-zinc-50" 
                      aria-label="Exportar PDF"
                    >
                      <Download className="h-3.5 w-3.5 mr-1 text-zinc-400 transition-colors duration-200 group-hover:text-[#522E93] hover:text-[#522E93]" /> PDF
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-zinc-400 transition-colors duration-200 group-hover:text-[#522E93] hover:text-[#522E93] hover:bg-zinc-50" 
                      aria-label="Exportar Excel"
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5 mr-1 text-zinc-400 transition-colors duration-200 group-hover:text-[#522E93] hover:text-[#522E93]" /> Excel
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {tab === 'programados' && (
        <Card className="p-0 bg-white shadow-card rounded-xl overflow-hidden border border-zinc-100">
          <div className="p-6 pb-4 border-b border-zinc-100 bg-white">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
              Reportes Programados
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Ejecuciones automáticas y su estado actual</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <THead>
                <Tr>
                  <Th className="text-xs py-3.5">Reporte</Th>
                  <Th className="text-xs py-3.5">Frecuencia</Th>
                  <Th className="text-xs py-3.5">Próxima ejecución</Th>
                  <Th className="text-xs py-3.5">Estado</Th>
                  <Th className="text-xs py-3.5">Última ejecución</Th>
                  <Th className="text-xs py-3.5 text-center">Acciones</Th>
                </Tr>
              </THead>
              <TBody>
                {scheduledReports.map((rep) => (
                  <Tr key={rep.id} className="hover:bg-zinc-50/40 transition-colors">
                    <Td className="font-semibold text-zinc-900 text-xs py-4">{rep.nombre}</Td>
                    <Td className="text-zinc-500 text-xs py-4">{rep.frecuencia}</Td>
                    <Td className="text-zinc-500 text-xs py-4">{rep.proximaEjecucion}</Td>
                    <Td className="py-4">
                      <Badge variant={rep.estado === 'activo' ? 'success' : 'neutral'}>
                        {rep.estado === 'activo' ? 'Activo' : 'Pausado'}
                      </Badge>
                    </Td>
                    <Td className="py-4">
                      <Badge variant={ejecucionBadge[rep.ultimaEjecucion].variant}>
                        {ejecucionBadge[rep.ultimaEjecucion].label}
                      </Badge>
                    </Td>
                    <Td className="py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "p-1 h-auto transition-colors",
                          rep.estado === 'activo' 
                            ? "text-primary hover:text-secondary hover:bg-primary/5" 
                            : "text-zinc-300 cursor-not-allowed"
                        )}
                        onClick={() => rep.estado === 'activo' && handleExecuteNow(rep.nombre)}
                        disabled={rep.estado !== 'activo'}
                        title={rep.estado === 'activo' ? "Ejecutar ahora" : "Reporte deshabilitado"}
                      >
                        <PlayCircle className="h-4.5 w-4.5" />
                      </Button>
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