import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Card, CardHeader } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import type { RiskScoreItem } from '@/types/dashboard'

interface RiskGaugeProps {
  label: string
  score: RiskScoreItem
  color: string
}

function RiskGauge({ label, score, color }: RiskGaugeProps) {
  const gaugeData = [
    { name: 'score', value: score.score },
    { name: 'rest', value: 100 - score.score },
  ]

  const riskLabel =
    score.score >= 75 ? 'Alto' : score.score >= 50 ? 'Moderado' : 'Bajo'

  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4">
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{label}</p>
      <div className="relative mx-auto mt-2 h-28 w-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gaugeData}
              dataKey="value"
              cx="50%"
              cy="50%"
              startAngle={220}
              endAngle={-40}
              innerRadius={36}
              outerRadius={52}
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="#f4f4f5" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-xl font-bold text-zinc-900">{score.score}</span>
          <span className="text-[10px] font-medium text-zinc-400">/ 100</span>
        </div>
      </div>
      <p className="mt-1 text-center text-xs font-bold" style={{ color }}>
        {riskLabel}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{score.explanation}</p>
    </div>
  )
}

interface RiskAnalysisPanelProps {
  scores: {
    financial: RiskScoreItem
    inventory: RiskScoreItem
    sales: RiskScoreItem
    operational: RiskScoreItem
  }
}

export function RiskAnalysisPanel({ scores }: RiskAnalysisPanelProps) {
  return (
    <Card>
      <CardHeader
        title="Análisis de Riesgos"
        subtitle="Scores de riesgo calculados por IA con explicaciones contextuales"
        actions={
          <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Score global: {scores.operational.score}/100
          </span>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RiskGauge label="Riesgo financiero" score={scores.financial} color="#ef4444" />
        <RiskGauge label="Riesgo de inventario" score={scores.inventory} color="#f59e0b" />
        <RiskGauge label="Riesgo de ventas" score={scores.sales} color="#522E93" />
        <RiskGauge label="Riesgo operativo global" score={scores.operational} color="#673AB7" />
      </div>
    </Card>
  )
}
