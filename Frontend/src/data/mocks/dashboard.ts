import type { HomeDashboardData } from '@/types/dashboard'

export const homeDashboardData: HomeDashboardData = {
  summary: {
    narrative: [
      { text: 'Durante los últimos 30 días se detectó un ' },
      { text: 'incremento del 12% en las ventas generales', bold: true },
      { text: '. El producto ' },
      { text: '"Laptop HP ProBook"', bold: true },
      { text: ' mantiene una tendencia positiva de crecimiento sostenido. Se identificó ' },
      { text: 'bajo movimiento en "Mouse Gamer RGB"', bold: true },
      { text: ', generando riesgo de capital inmovilizado estimado en ' },
      { text: '$34K', bold: true },
      { text: '. La IA detectó ' },
      { text: '3 anomalías de consumo', bold: true },
      { text: ' y un patrón de caída regional en Línea Industrial. ' },
      { text: 'Se recomienda revisar niveles de inventario para evitar sobrestock', bold: true },
      { text: ' y activar liquidación escalonada en productos de baja rotación.' },
    ],
    updatedAt: 'Actualizado hace 6 min',
  },

  salesTrend: [
    { month: 'Ene', ventas: 820000, historico: 780000, forecast: null },
    { month: 'Feb', ventas: 910000, historico: 850000, forecast: null },
    { month: 'Mar', ventas: 880000, historico: 870000, forecast: null },
    { month: 'Abr', ventas: 960000, historico: 900000, forecast: null },
    { month: 'May', ventas: 1020000, historico: 940000, forecast: null },
    { month: 'Jun', ventas: 980000, historico: 960000, forecast: null },
    { month: 'Jul', ventas: 1080000, historico: 990000, forecast: null },
    { month: 'Ago', ventas: 1120000, historico: 1020000, forecast: null },
    { month: 'Sep', ventas: 1050000, historico: 1040000, forecast: null },
    { month: 'Oct', ventas: 1180000, historico: 1080000, forecast: null },
    { month: 'Nov', ventas: 1220000, historico: 1120000, forecast: null },
    { month: 'Dic', ventas: 1240000, historico: 1150000, forecast: null },
    { month: 'Ene*', ventas: 0, historico: 1180000, forecast: 1290000 },
    { month: 'Feb*', ventas: 0, historico: 1200000, forecast: 1340000 },
  ],

  topProducts: [
    { name: 'Laptop HP ProBook', sales: '$284K', trend: 'up', change: '+18%' },
    { name: 'Monitor Dell 27"', sales: '$156K', trend: 'up', change: '+11%' },
    { name: 'Teclado Mecánico RGB', sales: '$92K', trend: 'up', change: '+7%' },
    { name: 'Mouse Gamer RGB', sales: '$18K', trend: 'down', change: '-34%' },
  ],

  behaviorInsights: [
    {
      id: 'b1',
      label: 'Producto más vendido',
      detail: 'Laptop HP ProBook — 342 unidades en 30 días (+18% vs. periodo anterior)',
      sentiment: 'positive',
    },
    {
      id: 'b2',
      label: 'Producto menos vendido',
      detail: 'Mouse Gamer RGB — 47 unidades, 247 días sin rotación significativa',
      sentiment: 'negative',
    },
    {
      id: 'b3',
      label: 'Demanda en aumento',
      detail: 'Monitores y laptops corporativas muestran aceleración sostenida',
      sentiment: 'positive',
    },
    {
      id: 'b4',
      label: 'Demanda en descenso',
      detail: 'Periféricos gaming caen 22% respecto al trimestre previo',
      sentiment: 'warning',
    },
    {
      id: 'b5',
      label: 'Comportamiento anómalo',
      detail: 'Pico atípico de devoluciones en Teclado Mecánico RGB (+340%)',
      sentiment: 'warning',
    },
    {
      id: 'b6',
      label: 'Riesgo de quiebre de stock',
      detail: 'Laptop HP ProBook — inventario cubre solo 8 días de demanda proyectada',
      sentiment: 'negative' as const,
    },
  ],

  alerts: [
    {
      id: 'a1',
      severity: 'critical',
      category: 'Alerta crítica',
      description: 'Quiebre inminente: Laptop HP ProBook — 8 días de stock',
      time: 'hace 8 min',
    },
    {
      id: 'a2',
      severity: 'high',
      category: 'Alto riesgo',
      description: 'Capital inmovilizado: Mouse Gamer RGB sin movimiento 247 días',
      time: 'hace 22 min',
    },
    {
      id: 'a3',
      severity: 'high',
      category: 'Anomalía de inventario',
      description: 'Merma atípica del 8.2% en Polímero PX-400',
      time: 'hace 1 h',
    },
    {
      id: 'a4',
      severity: 'medium',
      category: 'Anomalía de ventas',
      description: 'Caída del 22% en Línea Industrial — región Centro',
      time: 'hace 2 h',
    },
    {
      id: 'a5',
      severity: 'medium',
      category: 'Stock bajo',
      description: 'Teclado Mecánico RGB bajo umbral mínimo de reabastecimiento',
      time: 'hace 3 h',
    },
    {
      id: 'a6',
      severity: 'low',
      category: 'Comportamiento inusual',
      description: 'Incremento gradual en días de inventario — Consumibles (+8 días)',
      time: 'hace 5 h',
    },
  ],
}

/** Notificaciones del TopBar */
export const recentNotifications = homeDashboardData.alerts.slice(0, 3).map((a) => ({
  id: a.id,
  message: a.description,
  time: a.time,
  severity: a.severity,
}))
