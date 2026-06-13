import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { InventoryDistributionItem } from '@/types/dashboard'

interface InventoryDistributionChartProps {
  data: InventoryDistributionItem[]
}

function formatCurrency(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export function InventoryDistributionChart({ data }: InventoryDistributionChartProps) {
  const total = data.reduce((sum, d) => sum + d.valor, 0)

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
      <div className="relative mx-auto h-64 w-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.categoria} fill={entry.color} />
              ))}
            </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(Number(value) || 0)}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #f0f0f0',
                boxShadow: '0 4px 24px rgba(82,46,147,0.08)',
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-zinc-400">Total</p>
          <p className="text-xl font-bold text-zinc-900">{formatCurrency(total)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.categoria}>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-zinc-700">{item.categoria}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-zinc-900">{formatCurrency(item.valor)}</span>
                <span className="ml-2 text-xs text-zinc-400">{item.porcentaje}%</span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.porcentaje}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
