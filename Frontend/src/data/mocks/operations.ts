import type { Bottleneck, ProcessItem, ResourceUtilization } from '@/types'

export const processes: ProcessItem[] = [
  { id: 'p1', nombre: 'Recepción de materia prima', area: 'Almacén', estado: 'activo', progreso: 92, responsable: 'L. Hernández' },
  { id: 'p2', nombre: 'Corte y conformado', area: 'Producción', estado: 'critico', progreso: 61, responsable: 'M. Ortega' },
  { id: 'p3', nombre: 'Ensamblaje principal', area: 'Ensamblaje', estado: 'activo', progreso: 78, responsable: 'A. Ríos' },
  { id: 'p4', nombre: 'Control de calidad', area: 'Calidad', estado: 'activo', progreso: 85, responsable: 'S. Vargas' },
  { id: 'p5', nombre: 'Empaque y etiquetado', area: 'Empaque', estado: 'critico', progreso: 54, responsable: 'J. Molina' },
  { id: 'p6', nombre: 'Despacho y logística', area: 'Logística', estado: 'pausado', progreso: 40, responsable: 'R. Castro' },
]

export const resources: ResourceUtilization[] = [
  { id: 'rc1', recurso: 'Línea de corte 3', utilizacion: 94, capacidad: '180 u/h' },
  { id: 'rc2', recurso: 'Estación de empaque', utilizacion: 98, capacidad: '160 u/h' },
  { id: 'rc3', recurso: 'Robot de ensamblaje', utilizacion: 71, capacidad: '210 u/h' },
  { id: 'rc4', recurso: 'Montacargas (flota)', utilizacion: 63, capacidad: '8 unidades' },
  { id: 'rc5', recurso: 'Cámara de pintura', utilizacion: 56, capacidad: '90 u/h' },
]

export const bottlenecks: Bottleneck[] = [
  { id: 'b1', proceso: 'Empaque y etiquetado', impacto: '-9% eficiencia global', severidad: 'alta' },
  { id: 'b2', proceso: 'Corte y conformado', impacto: 'Cola de 42 órdenes', severidad: 'media' },
  { id: 'b3', proceso: 'Inspección de calidad', impacto: '+12 min por lote', severidad: 'baja' },
]

export const areaPerformance = [
  { area: 'Almacén', rendimiento: 91 },
  { area: 'Producción', rendimiento: 76 },
  { area: 'Ensamblaje', rendimiento: 83 },
  { area: 'Calidad', rendimiento: 88 },
  { area: 'Empaque', rendimiento: 64 },
  { area: 'Logística', rendimiento: 79 },
]

export const criticalTasks = [
  { id: 't1', tarea: 'Recalibrar línea de corte 3', vence: 'Hoy 14:00', estado: 'en curso' },
  { id: 't2', tarea: 'Auditoría lote MP-2291', vence: 'Hoy 17:00', estado: 'pendiente' },
  { id: 't3', tarea: 'Mantenimiento selladora B', vence: 'Mañana 09:00', estado: 'programada' },
]
