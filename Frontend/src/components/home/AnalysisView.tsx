import type { ReactNode } from 'react'
import { LossExplanation } from '@/components/home/LossExplanation'
import { LossKpiCard } from '@/components/home/LossKpiCard'
import { AnomalyList } from '@/components/home/AnomalyList'
import { LossByStage } from '@/components/home/LossByStage'
import { formatCurrency, formatNumber } from '@/lib/utils'
import type { AnalisisCompleto } from '@/types/analysis'

interface AnalysisViewProps {
  data: AnalisisCompleto
  /** Panel opcional para la columna derecha (p. ej. tendencia en el dashboard principal). */
  asidePanel?: ReactNode
}

export function AnalysisView({ data, asidePanel }: AnalysisViewProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto">
      <LossExplanation explicacion={data.explicacion} periodo={data.periodo} />

      <div className="grid shrink-0 grid-cols-2 gap-3 lg:grid-cols-4">
        <LossKpiCard
          label="Pérdidas operativas"
          value={formatCurrency(data.perdidas_operativas.total)}
          icon="perdidas"
          hint="Desperdicio y ajustes"
        />
        <LossKpiCard
          label="Capital inmovilizado"
          value={formatCurrency(data.capital_inmovilizado.total)}
          icon="capital"
          hint={`${data.capital_inmovilizado.materiales.length} materiales sin rotación`}
        />
        <LossKpiCard
          label="Anomalías"
          value={formatNumber(data.anomalias.length)}
          icon="anomalias"
          hint={`${data.anomalias.filter((a) => a.severidad === 'alta').length} de severidad alta`}
        />
        <LossKpiCard
          label="Inventario valorizado"
          value={formatCurrency(data.inventario_valorizado.total)}
          icon="inventario"
          hint={`${formatNumber(data.registros)} registros analizados`}
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-3">
        <div className={asidePanel ? 'col-span-12 min-h-0 lg:col-span-5' : 'col-span-12 min-h-0 lg:col-span-7'}>
          <AnomalyList anomalias={data.anomalias} />
        </div>
        <div className={asidePanel ? 'col-span-12 min-h-0 lg:col-span-4' : 'col-span-12 min-h-0 lg:col-span-5'}>
          <LossByStage perdidasPorEtapa={data.resumen_etapas.perdidas} />
        </div>
        {asidePanel && <div className="col-span-12 min-h-0 lg:col-span-3">{asidePanel}</div>}
      </div>
    </div>
  )
}
