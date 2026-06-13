import { Layers } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface LossByStageProps {
  perdidasPorEtapa: Record<string, number>
}

export function LossByStage({ perdidasPorEtapa }: LossByStageProps) {
  const entradas = Object.entries(perdidasPorEtapa).sort((a, b) => b[1] - a[1])
  const maximo = entradas.length ? Math.max(...entradas.map(([, v]) => v)) : 0

  return (
    <div className="flex h-full w-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Layers className="h-4 w-4 text-primary" />
        </span>
        <h3 className="text-xs font-bold tracking-wide text-zinc-900 uppercase">
          Pérdidas por etapa
        </h3>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {entradas.length === 0 && (
          <p className="rounded-xl bg-zinc-50 px-3 py-4 text-center text-xs text-zinc-500">
            Sin pérdidas registradas por etapa.
          </p>
        )}
        {entradas.map(([etapa, valor]) => (
          <div key={etapa}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium capitalize text-zinc-700">{etapa}</span>
              <span className="font-semibold text-zinc-900">{formatCurrency(valor)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: maximo > 0 ? `${(valor / maximo) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
