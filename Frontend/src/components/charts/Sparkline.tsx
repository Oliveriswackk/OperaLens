import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface SparklineProps {
  data: number[]
  height?: number
}

export function Sparkline({ data, height = 40 }: SparklineProps) {
  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#522E93" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#522E93" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="#522E93"
          strokeWidth={2}
          fill="url(#sparkGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
