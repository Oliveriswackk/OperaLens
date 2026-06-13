import { ArrowRight, Clock, PackageX, Recycle, TrendingDown } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { CapitalImmobilizationInsight } from '@/types/dashboard'

interface CapitalImmobilizationPanelProps {
  insights: CapitalImmobilizationInsight
}

export function CapitalImmobilizationPanel({ insights }: CapitalImmobilizationPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader
        title="Capital Inmovilizado"
        subtitle="Análisis de rotación, envejecimiento y oportunidades de recuperación"
      />

      <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-5">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          Recuperación potencial
        </p>
        <p className="mt-1 text-3xl font-bold text-zinc-900">{insights.potentialRecovery}</p>
        <p className="mt-1 text-sm text-zinc-500">
          Capital recuperable mediante liquidación y optimización de inventario
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
            <TrendingDown className="h-3.5 w-3.5" />
            Baja rotación
          </h4>
          <div className="space-y-2">
            {insights.lowRotationProducts.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-800">{p.name}</p>
                  <p className="text-xs text-zinc-400">{p.days} días sin movimiento</p>
                </div>
                <span className="text-sm font-bold text-amber-600">{p.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
            <Clock className="h-3.5 w-3.5" />
            Envejecimiento de inventario
          </h4>
          <div className="space-y-3">
            {insights.agingBuckets.map((bucket) => (
              <div key={bucket.range}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-zinc-600">{bucket.range}</span>
                  <span className="font-semibold text-zinc-900">{bucket.amount}</span>
                </div>
                <Progress value={bucket.value} className="h-2" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
          <div className="flex items-start gap-3">
            <PackageX className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-zinc-900">{insights.obsoletePrediction.label}</p>
              <p className="mt-1 text-sm text-zinc-600">
                <strong>{insights.obsoletePrediction.products} productos</strong> en riesgo de obsolescencia
                — pérdida potencial de{' '}
                <strong className="text-red-600">{insights.obsoletePrediction.potentialLoss}</strong>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
            <Recycle className="h-3.5 w-3.5" />
            Oportunidades de liquidación
          </h4>
          <div className="space-y-2">
            {insights.liquidationOpportunities.map((opp) => (
              <div
                key={opp.product}
                className="flex items-center justify-between rounded-xl border border-zinc-100 px-3 py-2.5"
              >
                <span className="text-sm text-zinc-700">{opp.product}</span>
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                  {opp.recovery}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  )
}
