import type { Integration } from '@/types'

export const integrations: Integration[] = [
  {
    id: 'int1',
    nombre: 'SAP ERP',
    categoria: 'ERP',
    estado: 'conectado',
    ultimaSync: 'hace 4 min',
    descripcion: 'Órdenes de producción, inventario y costos',
  },
  {
    id: 'int2',
    nombre: 'Salesforce',
    categoria: 'CRM',
    estado: 'sincronizando',
    ultimaSync: 'en curso',
    descripcion: 'Pipeline comercial y órdenes de clientes',
  },
  {
    id: 'int3',
    nombre: 'API de Sensores IoT',
    categoria: 'Fuente de datos',
    estado: 'conectado',
    ultimaSync: 'hace 1 min',
    descripcion: 'Telemetría de líneas de producción en tiempo real',
  },
  {
    id: 'int4',
    nombre: 'Power BI',
    categoria: 'BI',
    estado: 'conectado',
    ultimaSync: 'hace 30 min',
    descripcion: 'Exportación de datasets para reportes corporativos',
  },
  {
    id: 'int5',
    nombre: 'Slack',
    categoria: 'Notificaciones',
    estado: 'error',
    ultimaSync: 'hace 2 horas',
    descripcion: 'Alertas y notificaciones a canales de operación',
  },
  {
    id: 'int6',
    nombre: 'Backend OperaLens (FastAPI)',
    categoria: 'API',
    estado: 'conectado',
    ultimaSync: 'hace 2 min',
    descripcion: 'Motor de análisis, anomalías y explicaciones IA',
  },
]

export const syncLog = [
  { id: 's1', integracion: 'API de Sensores IoT', evento: 'Sincronización completa (4,218 registros)', hora: 'hace 1 min', estado: 'success' as const },
  { id: 's2', integracion: 'SAP ERP', evento: 'Inventario actualizado', hora: 'hace 4 min', estado: 'success' as const },
  { id: 's3', integracion: 'Slack', evento: 'Token expirado — reautenticación requerida', hora: 'hace 2 horas', estado: 'danger' as const },
  { id: 's4', integracion: 'Power BI', evento: 'Dataset exportado (12.4 MB)', hora: 'hace 30 min', estado: 'success' as const },
]
