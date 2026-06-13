import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import type { SalesTrendPoint } from '@/types/dashboard'

interface SalesTrendChartProps {
  data: SalesTrendPoint[]
  height?: number
}

function formatCurrency(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export function SalesTrendChart({ data, height = 400 }: SalesTrendChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    ventasDisplay: d.ventas || null,
    forecastDisplay: d.forecast,
  }))

  const lastActual = data.filter((d) => d.ventas > 0).at(-1)
  const growth =
    lastActual && data[0].ventas
      ? (((lastActual.ventas - data[0].ventas) / data[0].ventas) * 100).toFixed(1)
      : '0'

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          <TrendingUp className="h-4 w-4" />
          +{growth}% crecimiento anual
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Ventas actuales
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gray" /> Año anterior
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-dashed border-secondary bg-transparent" />{' '}
            Proyección IA
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#a1a1aa' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12, fill: '#a1a1aa' }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(value) => (value != null ? formatCurrency(Number(value)) : '—')}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 24px rgba(82,46,147,0.08)',
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Line
            type="monotone"
            dataKey="ventasDisplay"
            name="Ventas actuales"
            stroke="#522E93"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#522E93' }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="historico"
            name="Año anterior"
            stroke="#CDCDCD"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="forecastDisplay"
            name="Proyección IA"
            stroke="#673AB7"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
