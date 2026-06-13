import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface TrendLineChartProps {
  data: Record<string, string | number | null>[]
  xKey: string
  series: { key: string; name: string; color: string; dashed?: boolean }[]
  height?: number
}

export function TrendLineChart({ data, xKey, series, height = 280 }: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: '#a1a1aa' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #f0f0f0',
            boxShadow: '0 4px 24px rgba(82,46,147,0.08)',
            fontSize: 12,
          }}
        />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            strokeWidth={2.5}
            strokeDasharray={s.dashed ? '6 4' : undefined}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
