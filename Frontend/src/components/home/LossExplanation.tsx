import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { etiquetaFuente } from '@/lib/api/adapters'
import type { Explicacion } from '@/types/analysis'

interface LossExplanationProps {
  explicacion: Explicacion
  periodo: { inicio: string; fin: string }
}

function formatFecha(value: string) {
  if (!value) return '—'
  return value.slice(0, 10)
}

export function LossExplanation({ explicacion, periodo }: LossExplanationProps) {
  return (
    <div className="relative flex shrink-0 gap-4 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-r from-[#f3eefa] via-white to-white px-5 py-4 shadow-soft">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
        <Sparkles className="h-5 w-5 text-white" />
      </span>
      <div className="relative min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-bold tracking-tight text-zinc-900">Explicación del análisis</h2>
          <Badge variant="primary">{etiquetaFuente(explicacion.fuente)}</Badge>
          <span className="text-[11px] text-zinc-500">
            Periodo {formatFecha(periodo.inicio)} → {formatFecha(periodo.fin)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{explicacion.texto}</p>
      </div>
    </div>
  )
}
