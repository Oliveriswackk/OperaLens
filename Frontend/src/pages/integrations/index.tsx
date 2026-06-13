import { Plus, RefreshCw, Settings2 } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusDot, type DotStatus } from '@/components/shared/StatusDot'
import { integrations, syncLog } from '@/data/mocks/integrations'
import type { Integration } from '@/types'

const estadoConfig: Record<
  Integration['estado'],
  { label: string; dot: DotStatus; variant: 'success' | 'danger' | 'info' }
> = {
  conectado: { label: 'Conectado', dot: 'success', variant: 'success' },
  error: { label: 'Error', dot: 'danger', variant: 'danger' },
  sincronizando: { label: 'Sincronizando', dot: 'info', variant: 'info' },
}

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integraciones"
        description="Sistemas conectados, APIs y fuentes de datos externas"
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Agregar integración
          </Button>
        }
      />

      {/* Grid de conectores */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integ) => {
          const estado = estadoConfig[integ.estado]
          return (
            <Card key={integ.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-base font-extrabold text-primary">
                  {integ.nombre.charAt(0)}
                </span>
                <Badge variant={estado.variant} className="gap-1.5">
                  <StatusDot status={estado.dot} pulse={integ.estado === 'sincronizando'} />
                  {estado.label}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{integ.nombre}</h3>
                <p className="text-xs text-zinc-400">{integ.categoria}</p>
                <p className="mt-2 text-xs text-zinc-500">{integ.descripcion}</p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-zinc-50 pt-3">
                <span className="text-[11px] text-zinc-400">
                  Última sync: {integ.ultimaSync}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" aria-label="Sincronizar">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Configurar">
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Log de sincronización */}
      <Card>
        <CardHeader
          title="Monitoreo de Sincronización"
          subtitle="Actividad reciente de los conectores"
        />
        <ul className="space-y-4">
          {syncLog.map((entry) => (
            <li key={entry.id} className="flex items-start gap-3">
              <StatusDot status={entry.estado} className="mt-1.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900">{entry.integracion}</p>
                <p className="text-xs text-zinc-500">{entry.evento}</p>
              </div>
              <span className="text-xs text-zinc-400">{entry.hora}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
