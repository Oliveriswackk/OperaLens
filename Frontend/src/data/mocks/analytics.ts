import type { Prediction } from '@/types'

export const predictions: Prediction[] = [
  {
    id: 'pr1',
    nombre: 'Rendimiento',
    valor: '96.2%',
    tendencia: 'up',
    confianza: 91,
    descripcion: 'Proyección de eficiencia para los próximos 7 días',
  },
  {
    id: 'pr2',
    nombre: 'Riesgo Operativo',
    valor: 'Moderado',
    tendencia: 'down',
    confianza: 86,
    descripcion: 'Probabilidad de incidente crítico: 4.2%',
  },
  {
    id: 'pr3',
    nombre: 'Productividad',
    valor: '+8.4%',
    tendencia: 'up',
    confianza: 89,
    descripcion: 'Incremento esperado vs promedio mensual',
  },
  {
    id: 'pr4',
    nombre: 'Costos',
    valor: '-$5.1K',
    tendencia: 'down',
    confianza: 82,
    descripcion: 'Reducción proyectada del gasto operativo mensual',
  },
]

/** Serie histórica + forecast (alineable con tendencia_perdidas del backend) */
export const lossTrend = [
  { mes: 'Ene', perdidas: 4200, forecast: null as number | null },
  { mes: 'Feb', perdidas: 3800, forecast: null },
  { mes: 'Mar', perdidas: 4500, forecast: null },
  { mes: 'Abr', perdidas: 3100, forecast: null },
  { mes: 'May', perdidas: 2600, forecast: null },
  { mes: 'Jun', perdidas: 2000, forecast: 2000 },
  { mes: 'Jul', perdidas: null as number | null, forecast: 1750 },
  { mes: 'Ago', perdidas: null, forecast: 1520 },
]

export const whatIfBaseline = {
  eficiencia: 94.8,
  costoMensual: 128000,
  throughput: 168,
}

export const scenarioPresets = [
  { id: 'sc1', nombre: 'Turno nocturno adicional', eficiencia: '+3.2%', costo: '+$14K/mes', riesgo: 'Bajo' },
  { id: 'sc2', nombre: 'Automatización de empaque', eficiencia: '+9.1%', costo: '+$60K único', riesgo: 'Medio' },
  { id: 'sc3', nombre: 'Reducción de 1 línea', eficiencia: '-6.8%', costo: '-$22K/mes', riesgo: 'Alto' },
]

export const trendHeatmap = [
  { etapa: 'Recepción', lun: 88, mar: 91, mie: 90, jue: 93, vie: 89 },
  { etapa: 'Corte', lun: 72, mar: 68, mie: 74, jue: 70, vie: 65 },
  { etapa: 'Ensamblaje', lun: 84, mar: 86, mie: 81, jue: 85, vie: 83 },
  { etapa: 'Calidad', lun: 90, mar: 88, mie: 92, jue: 91, vie: 87 },
  { etapa: 'Empaque', lun: 62, mar: 60, mie: 66, jue: 58, vie: 61 },
]
