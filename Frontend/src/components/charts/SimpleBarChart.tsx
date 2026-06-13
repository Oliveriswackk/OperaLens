import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface SimpleBarChartProps {
  data: Record<string, string | number>[]
  xKey: string
  barKey: string
  name: string
  height?: number
}

export function SimpleBarChart({ data, xKey, barKey, name, height = 260 }: SimpleBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: '#a1a1aa' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(82,46,147,0.05)' }}
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #f0f0f0',
            boxShadow: '0 4px 24px rgba(82,46,147,0.08)',
            fontSize: 12,
          }}
        />
        <Bar dataKey={barKey} name={name} fill="#522E93" radius={[6, 6, 0, 0]} maxBarSize={42} />
      </BarChart>
    </ResponsiveContainer>
  )
}
