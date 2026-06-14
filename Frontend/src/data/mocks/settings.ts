import type { AuditEntry, OrgUser } from '@/types'

export const orgUsers: OrgUser[] = [
  { id: 'u1', nombre: 'Juan Dávila', email: 'juan.davila@operalens.com', rol: 'Gerente de Operaciones', estado: 'activo', ultimoAcceso: 'hace 5 min' },
  { id: 'u2', nombre: 'María Ortega', email: 'maria.ortega@operalens.com', rol: 'Analista Senior', estado: 'activo', ultimoAcceso: 'hace 1 hora' },
  { id: 'u3', nombre: 'Carlos Ruiz', email: 'carlos.ruiz@operalens.com', rol: 'Director General', estado: 'activo', ultimoAcceso: 'ayer' },
  { id: 'u4', nombre: 'Sofía Vargas', email: 'sofia.vargas@operalens.com', rol: 'Supervisora de Calidad', estado: 'activo', ultimoAcceso: 'hace 3 horas' },
  { id: 'u5', nombre: 'Pedro Núñez', email: 'pedro.nunez@operalens.com', rol: 'Analista', estado: 'invitado', ultimoAcceso: '—' },
]

export const roles = [
  { id: 'admin', nombre: 'Administrador', usuarios: 1, permisos: ['Todo el sistema'] },
  { id: 'manager', nombre: 'Gerente', usuarios: 2, permisos: ['Dashboard', 'Alertas', 'Historial', 'Insights IA'] },
  { id: 'analyst', nombre: 'Analista', usuarios: 2, permisos: ['Dashboard', 'Análisis', 'Historial'] },
  { id: 'viewer', nombre: 'Visor', usuarios: 0, permisos: ['Dashboard (solo lectura)'] },
]

export const auditLog: AuditEntry[] = [
  { id: 'au1', usuario: 'Juan Dávila', accion: 'Resolvió incidente', recurso: 'INC-1035', fecha: 'Hoy 08:42' },
  { id: 'au2', usuario: 'María Ortega', accion: 'Generó reporte', recurso: 'Resumen Ejecutivo Semanal', fecha: 'Hoy 08:10' },
  { id: 'au3', usuario: 'Sistema', accion: 'Sincronización automática', recurso: 'SAP ERP', fecha: 'Hoy 07:55' },
  { id: 'au4', usuario: 'Carlos Ruiz', accion: 'Modificó umbral de IA', recurso: 'Configuración IA', fecha: 'Ayer 17:20' },
  { id: 'au5', usuario: 'Juan Dávila', accion: 'Invitó usuario', recurso: 'pedro.nunez@operalens.com', fecha: 'Ayer 11:03' },
]
