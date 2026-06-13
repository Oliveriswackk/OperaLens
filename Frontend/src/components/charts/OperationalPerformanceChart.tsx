import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PerformancePoint } from '@/types'

interface ChartProps {
  data: PerformancePoint[]
}

interface TooltipProps {
  active?: boolean
  label?: string
  payload?: { name: string; value: number; color: string }[]
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-soft ring-1 ring-zinc-100">
      <p className="mb-1 text-xs font-bold text-zinc-900">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs">
          <span className="text-secondary">{entry.name} : </span>
          <span className="font-semibold text-primary">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export function OperationalPerformanceChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="gradEficiencia" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#522E93" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#522E93" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradProcesos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#673AB7" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#673AB7" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: '#a1a1aa' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="eficiencia"
          name="Eficiencia"
          stroke="#522E93"
          strokeWidth={2.5}
          fill="url(#gradEficiencia)"
          dot={false}
          activeDot={{ r: 4, fill: '#522E93' }}
        />
        <Area
          type="monotone"
          dataKey="procesos"
          name="Procesos"
          stroke="#673AB7"
          strokeWidth={2}
          fill="url(#gradProcesos)"
          dot={false}
          activeDot={{ r: 4, fill: '#673AB7' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
