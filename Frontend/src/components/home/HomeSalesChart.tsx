import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SalesTrendPoint, TopProduct } from '@/types/dashboard'

interface HomeSalesChartProps {
  data: SalesTrendPoint[]
  topProducts: TopProduct[]
}

function formatCurrency(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export function HomeSalesChart({ data, topProducts }: HomeSalesChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    ventasDisplay: d.ventas || null,
    forecastDisplay: d.forecast,
  }))

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-2 flex shrink-0 items-start justify-between gap-2">
        <div>
          <h3 className="text-xs font-bold tracking-wide text-zinc-900 uppercase">
            Tendencia de Ventas
          </h3>
          <p className="text-[11px] text-zinc-500">Comparación histórica y proyección IA</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" /> Actual
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-brand-gray" /> Histórico
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-dashed border-secondary" /> IA
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: '#a1a1aa' }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fontSize: 10, fill: '#a1a1aa' }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              formatter={(value) => (value != null ? formatCurrency(Number(value)) : '—')}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #f0f0f0',
                fontSize: 11,
                padding: '6px 10px',
              }}
            />
            <Line
              type="monotone"
              dataKey="ventasDisplay"
              stroke="#522E93"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <Line type="monotone" dataKey="historico" stroke="#CDCDCD" strokeWidth={1.5} dot={false} />
            <Line
              type="monotone"
              dataKey="forecastDisplay"
              stroke="#673AB7"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid shrink-0 grid-cols-2 gap-1.5 border-t border-zinc-100 pt-2 lg:grid-cols-4">
        {topProducts.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between rounded-lg bg-zinc-50 px-2 py-1.5"
          >
            <span className="truncate text-[10px] font-medium text-zinc-700">{product.name}</span>
            <span
              className={cn(
                'ml-1 flex shrink-0 items-center gap-0.5 text-[10px] font-bold',
                product.trend === 'up' ? 'text-emerald-600' : 'text-red-500',
              )}
            >
              {product.trend === 'up' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {product.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
