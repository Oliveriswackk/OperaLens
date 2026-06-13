import type { Incident } from '@/types'

export const alertStats = {
  activas: 7,
  criticas: 2,
  resueltas: 34,
  mttr: '18 min',
}

export const incidents: Incident[] = [
  {
    id: 'INC-1042',
    titulo: 'Consumo anormal de acero inoxidable (+52%)',
    area: 'Producción',
    severidad: 'alta',
    estado: 'activo',
    riesgo: 'Sobrecosto estimado de $6,200/semana',
    detectadoPorIA: true,
    hora: 'hace 22 min',
    causasRaiz: [
      'Calibración desviada en la línea de corte 3',
      'Lote de materia prima con espesor fuera de especificación',
    ],
    accionesRecomendadas: [
      'Recalibrar la línea de corte 3 antes del siguiente turno',
      'Auditar el lote MP-2291 con el proveedor',
    ],
    timeline: [
      { hora: '09:14', evento: 'Anomalía detectada por el motor de IA' },
      { hora: '09:16', evento: 'Alerta escalada a severidad alta' },
      { hora: '09:30', evento: 'Asignada al equipo de Producción' },
    ],
  },
  {
    id: 'INC-1041',
    titulo: 'Capital inmovilizado: pintura epoxi ($8,000)',
    area: 'Almacén',
    severidad: 'media',
    estado: 'investigando',
    riesgo: '30 días sin rotación de inventario',
    detectadoPorIA: true,
    hora: 'hace 1 hora',
    causasRaiz: ['Cambio de especificación en órdenes recientes', 'Sobrecompra en Q1'],
    accionesRecomendadas: [
      'Evaluar devolución parcial al proveedor',
      'Ofrecer el excedente a la línea de productos B',
    ],
    timeline: [
      { hora: '08:02', evento: 'Detección de stock sin rotación (30 días)' },
      { hora: '08:45', evento: 'Revisión iniciada por el analista de inventario' },
    ],
  },
  {
    id: 'INC-1040',
    titulo: 'Pico de desperdicio en etapa de ensamblaje',
    area: 'Ensamblaje',
    severidad: 'alta',
    estado: 'activo',
    riesgo: 'Pérdida operativa de $2,000 esta semana',
    detectadoPorIA: true,
    hora: 'hace 3 horas',
    causasRaiz: ['Outlier IQR detectado: z-score 2.4σ sobre el umbral histórico'],
    accionesRecomendadas: [
      'Inspeccionar herramental de la estación 5',
      'Reforzar capacitación del turno vespertino',
    ],
    timeline: [
      { hora: '06:30', evento: 'Detección estadística de pérdida atípica (IQR)' },
      { hora: '07:00', evento: 'Notificación enviada al supervisor de área' },
    ],
  },
  {
    id: 'INC-1038',
    titulo: 'Costo unitario atípico: resina industrial (+31%)',
    area: 'Compras',
    severidad: 'media',
    estado: 'investigando',
    riesgo: 'Desviación vs distribución histórica (z-score 2.1)',
    detectadoPorIA: true,
    hora: 'hace 6 horas',
    causasRaiz: ['Incremento de precio del proveedor principal sin notificación'],
    accionesRecomendadas: ['Solicitar cotización a proveedores alternos'],
    timeline: [{ hora: '03:20', evento: 'Comparación contra histórico de 90 días' }],
  },
  {
    id: 'INC-1035',
    titulo: 'Latencia elevada en sincronización de datos',
    area: 'Sistemas',
    severidad: 'baja',
    estado: 'resuelto',
    riesgo: 'Retraso de 12 min en actualización de métricas',
    detectadoPorIA: false,
    hora: 'ayer',
    causasRaiz: ['Ventana de mantenimiento del conector ERP'],
    accionesRecomendadas: ['Sin acción requerida; monitorear próxima sincronización'],
    timeline: [
      { hora: 'Ayer 22:10', evento: 'Latencia detectada' },
      { hora: 'Ayer 23:05', evento: 'Resuelto automáticamente' },
    ],
  },
]
