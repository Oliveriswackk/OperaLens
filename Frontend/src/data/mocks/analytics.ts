import type { Prediction } from '@/types'

export interface SalesData {
  mes: string;
  ingresos: number;
  objetivo: number;
}

export interface ProductSales {
  name: string;
  sales: number;
}

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
    id: 'pr4',
    nombre: 'Costos',
    valor: '-$5.1K',
    tendencia: 'down',
    confianza: 82,
    descripcion: 'Reducción proyectada del gasto operativo mensual',
  },
]

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

export const scenarioPresets = [
  { id: 'sc1', nombre: 'Turno nocturno adicional', eficiencia: '+3.2%', costo: '+$14K/mes', riesgo: 'Bajo' },
  { id: 'sc2', nombre: 'Automatización de empaque', eficiencia: '+9.1%', costo: '+$60K único', riesgo: 'Medio' },
  { id: 'sc3', nombre: 'Reducción de 1 línea', eficiencia: '-6.8%', costo: '-$22K/mes', riesgo: 'Alto' },
]

export const salesTrend: SalesData[] = [
  { mes: 'Ene', ingresos: 2000, objetivo: 3000 },
  { mes: 'Feb', ingresos: 2500, objetivo: 4000 },
  { mes: 'Mar', ingresos: 4200, objetivo: 5000 },
  { mes: 'Abr', ingresos: 5100, objetivo: 6000 },
  { mes: 'May', ingresos: 5800, objetivo: 7000 },
  { mes: 'Jun', ingresos: 7200, objetivo: 8000 },
  { mes: 'Jul', ingresos: 8900, objetivo: 9000 },
]

export const topProductsByMonth: Record<string, ProductSales[]> = {
  Ene: [
    { name: 'Laptop HP 15"', sales: 920 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 810 },
    { name: 'Mouse Logitech MX Master 3', sales: 400 },
    { name: 'Monitor Samsung 24"', sales: 310 },
    { name: 'Teclado Mecánico Redragon', sales: 150 },
  ],
  Feb: [
    { name: 'Laptop HP 15"', sales: 1050 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 900 },
    { name: 'Mouse Logitech MX Master 3', sales: 420 },
    { name: 'Monitor Samsung 24"', sales: 380 },
    { name: 'Teclado Mecánico Redragon', sales: 210 },
  ],
  Mar: [
    { name: 'Laptop HP 15"', sales: 980 },
    { name: 'Monitor Samsung 24"', sales: 870 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 530 },
    { name: 'Mouse Logitech MX Master 3', sales: 460 },
    { name: 'Webcam Logitech C920', sales: 290 },
  ],
  Abr: [
    { name: 'Laptop HP 15"', sales: 870 },
    { name: 'Monitor Samsung 24"', sales: 740 },
    { name: 'Mouse Logitech MX Master 3', sales: 510 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 430 },
    { name: 'Webcam Logitech C920', sales: 260 },
  ],
  May: [
    { name: 'Laptop Lenovo IdeaPad', sales: 1100 },
    { name: 'Laptop HP 15"', sales: 950 },
    { name: 'Monitor Samsung 24"', sales: 620 },
    { name: 'Mouse Logitech MX Master 3', sales: 480 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 310 },
  ],
  Jun: [
    { name: 'Laptop Lenovo IdeaPad', sales: 1332 },
    { name: 'Laptop HP 15"', sales: 1303 },
    { name: 'Monitor Samsung 24"', sales: 788 },
    { name: 'Mouse Logitech MX Master 3', sales: 486 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 183 },
  ],
  Jul: [
    { name: 'Laptop Lenovo IdeaPad', sales: 1420 },
    { name: 'Laptop HP 15"', sales: 1280 },
    { name: 'Monitor Samsung 27"', sales: 850 },
    { name: 'Mouse Logitech MX Master 3', sales: 530 },
    { name: 'Teclado Mecánico Redragon', sales: 310 },
  ],
  Ago: [
    { name: 'Laptop Lenovo IdeaPad', sales: 1890 },
    { name: 'Laptop HP 15"', sales: 1750 },
    { name: 'Mouse Logitech MX Master 3', sales: 940 },
    { name: 'Teclado Mecánico Redragon', sales: 780 },
    { name: 'Mochila Targus 15.6"', sales: 620 },
  ],
  Sep: [
    { name: 'Laptop Lenovo IdeaPad', sales: 1340 },
    { name: 'Laptop HP 15"', sales: 1210 },
    { name: 'Monitor Samsung 27"', sales: 730 },
    { name: 'Mouse Logitech MX Master 3', sales: 590 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 410 },
  ],
  Oct: [
    { name: 'Laptop HP 15"', sales: 1480 },
    { name: 'Monitor Samsung 27"', sales: 1150 },
    { name: 'Laptop Lenovo IdeaPad', sales: 980 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 760 },
    { name: 'Mouse Logitech MX Master 3', sales: 540 },
  ],
  Nov: [
    { name: 'Laptop HP 15"', sales: 2540 },
    { name: 'Monitor Samsung 27"', sales: 2100 },
    { name: 'Laptop Lenovo IdeaPad', sales: 1980 },
    { name: 'Audífonos Sony WH-1000XM5', sales: 1650 },
    { name: 'Mouse Logitech MX Master 3', sales: 1320 },
  ],
  Dic: [
    { name: 'Audífonos Sony WH-1000XM5', sales: 2980 },
    { name: 'Laptop HP 15"', sales: 2310 },
    { name: 'Monitor Samsung 27"', sales: 1870 },
    { name: 'Teclado Mecánico Redragon', sales: 1420 },
    { name: 'Mouse Logitech MX Master 3', sales: 1190 },
  ],
}