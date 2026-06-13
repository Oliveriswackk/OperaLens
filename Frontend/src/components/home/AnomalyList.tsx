import { Bell } from 'lucide-react'
import { SeverityBadge } from '@/components/widgets/SeverityBadge'
import { etiquetaTipoAnomalia, ordenarPorSeveridad } from '@/lib/api/adapters'
import type { Anomalia } from '@/types/analysis'

interface AnomalyListProps {
  anomalias: Anomalia[]
}

export function AnomalyList({ anomalias }: AnomalyListProps) {
  const ordenadas = ordenarPorSeveridad(anomalias)
  const urgentes = anomalias.filter((a) => a.severidad === 'alta').length

  return (
    <div className="flex h-full w-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
          <Bell className="h-4 w-4 text-red-500" />
        </span>
        <div>
          <h3 className="text-xs font-bold tracking-wide text-zinc-900 uppercase">
            Anomalías detectadas
          </h3>
          <p className="text-[11px] text-zinc-500">
            {anomalias.length} en total · {urgentes} de severidad alta
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {ordenadas.length === 0 && (
          <p className="rounded-xl bg-zinc-50 px-3 py-4 text-center text-xs text-zinc-500">
            No se detectaron anomalías en este periodo.
          </p>
        )}
        {ordenadas.map((anomalia, i) => (
          <div
            key={`${anomalia.tipo}-${anomalia.material}-${i}`}
            className="shrink-0 rounded-xl border border-zinc-100 bg-zinc-50/60 px-3 py-2.5 transition-colors hover:border-primary/20 hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <SeverityBadge severidad={anomalia.severidad} />
              <span className="text-[10px] font-medium text-zinc-400">
                {etiquetaTipoAnomalia(anomalia.tipo)}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-medium leading-snug text-zinc-800">
              {anomalia.descripcion}
            </p>
            <p className="mt-0.5 text-[10px] text-zinc-400">{anomalia.material}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
