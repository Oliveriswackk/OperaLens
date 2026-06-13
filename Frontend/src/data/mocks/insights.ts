import type { Insight } from '@/types'

export const insights: Insight[] = [
  {
    id: 'ins-1',
    categoria: 'cuello_de_botella',
    titulo: 'La estación de empaque limita el throughput de toda la línea',
    hallazgo:
      'La estación de empaque opera al 98% de capacidad mientras el resto de la línea promedia 74%.',
    explicacion:
      'El análisis de flujo de las últimas 4 semanas muestra que los tiempos de espera se acumulan justo antes del empaque. Cuando la demanda supera 180 unidades/hora, la cola crece de forma no lineal y arrastra la eficiencia global un 9%.',
    impacto: '+14% throughput estimado al balancear la línea',
    confianza: 92,
    prioridad: 'P1',
    pasos: [
      'Agregar un operador flotante en hora pico (11:00–15:00)',
      'Evaluar una segunda selladora semiautomática',
      'Re-balancear tareas de etiquetado hacia la estación 4',
    ],
  },
  {
    id: 'ins-2',
    categoria: 'oportunidad',
    titulo: 'Ventana de ahorro energético en turnos nocturnos',
    hallazgo:
      'El consumo energético nocturno se mantiene al 80% del diurno con solo 35% de la producción.',
    explicacion:
      'Los compresores y sistemas HVAC operan a plena capacidad fuera del horario productivo. Un apagado programado escalonado no afecta el arranque matutino según la simulación.',
    impacto: '-$3.1K/mes en costo energético',
    confianza: 88,
    prioridad: 'P2',
    pasos: [
      'Programar apagado escalonado de compresores a las 22:30',
      'Instalar sensores de presencia en zonas de baja actividad',
    ],
  },
  {
    id: 'ins-3',
    categoria: 'optimizacion',
    titulo: 'Reordenar la secuencia de lotes reduce cambios de formato',
    hallazgo: 'El 18% del tiempo productivo se pierde en cambios de formato evitables.',
    explicacion:
      'Agrupar lotes por familia de producto reduciría los cambios de formato de 14 a 6 por semana. El algoritmo de secuenciación sugiere un orden óptimo con impacto mínimo en fechas de entrega.',
    impacto: '+6.5 horas productivas/semana',
    confianza: 84,
    prioridad: 'P2',
    pasos: [
      'Adoptar la secuencia sugerida en la planeación semanal',
      'Validar con el cliente A la flexibilidad de fecha del lote 220',
    ],
  },
  {
    id: 'ins-4',
    categoria: 'estrategico',
    titulo: 'Diversificar proveedores de resina ante volatilidad de precios',
    hallazgo: 'El costo de resina industrial subió 31% con un único proveedor activo.',
    explicacion:
      'La dependencia de un solo proveedor expone la operación a picos de precio. El histórico de 12 meses muestra una volatilidad creciente; dos proveedores alternos cotizan 12–18% por debajo del precio actual.',
    impacto: '-$1.8K/mes y menor riesgo de suministro',
    confianza: 79,
    prioridad: 'P3',
    pasos: [
      'Homologar al proveedor alterno B en calidad',
      'Negociar contrato semestral con banda de precio',
    ],
  },
]
