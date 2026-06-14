export interface TourStepConfig {
  id: string
  target: string
  title: string
  description: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
}

export interface TourConfig {
  id: string
  route: string
  title: string
  steps: TourStepConfig[]
}

export const LUPIN_TOURS: TourConfig[] = [
  {
    id: 'home',
    route: '/',
    title: 'Inicio',
    steps: [
      {
        id: 'sidebar',
        target: 'sidebar',
        title: 'Menú principal de navegación',
        description:
          'Este es el menú principal de navegación. Desde aquí puedes acceder a todas las herramientas de análisis de OperaLens.',
        placement: 'right',
      },
      {
        id: 'quick-actions',
        target: 'quick-actions',
        title: 'Acciones rápidas',
        description:
          'Estos accesos directos te permiten llegar de inmediato a las funciones más importantes de la plataforma.',
        placement: 'bottom',
      },
      {
        id: 'sales-chart',
        target: 'sales-chart',
        title: 'Tendencia de ventas',
        description:
          'Este gráfico muestra el comportamiento histórico y proyectado de las ventas y pérdidas de tu operación.',
        placement: 'right',
      },
      {
        id: 'behavior-patterns',
        target: 'behavior-patterns',
        title: 'Patrones de conducta',
        description:
          'La IA identifica tendencias, oportunidades y comportamientos inusuales en tus movimientos de materiales.',
        placement: 'left',
      },
      {
        id: 'alerts-panel',
        target: 'alerts-panel',
        title: 'Alertas y anomalías',
        description:
          'Esta sección muestra las anomalías detectadas y los riesgos operativos que requieren tu atención.',
        placement: 'left',
      },
      {
        id: 'ai-summary',
        target: 'ai-summary',
        title: 'Resumen inteligente',
        description:
          'Este resumen ejecutivo explica la situación actual del negocio usando inteligencia artificial.',
        placement: 'top',
      },
    ],
  },
  {
    id: 'alerts',
    route: '/alerts',
    title: 'Anomalías',
    steps: [
      {
        id: 'alerts-header',
        target: 'alerts-header',
        title: 'Anomalías detectadas',
        description:
          'Aquí la IA detecta patrones inusuales que pueden indicar problemas operativos en tus movimientos de materiales.',
        placement: 'bottom',
      },
      {
        id: 'alerts-stats',
        target: 'alerts-stats',
        title: 'Resumen de severidad',
        description:
          'Estas métricas te muestran de un vistazo cuántas anomalías hay por nivel de severidad: alta, media y baja.',
        placement: 'bottom',
      },
      {
        id: 'alerts-table',
        target: 'alerts-table',
        title: 'Riesgos operativos',
        description:
          'Este módulo evalúa los riesgos potenciales que afectan inventario, ventas y rentabilidad. Filtra y revisa cada incidente.',
        placement: 'top',
      },
    ],
  },
  {
    id: 'insights',
    route: '/insights',
    title: 'Análisis',
    steps: [
      {
        id: 'insights-header',
        target: 'insights-header',
        title: 'Análisis de pérdidas',
        description:
          'Esta sección presenta hallazgos derivados del análisis de movimientos con explicaciones generadas por IA.',
        placement: 'bottom',
      },
      {
        id: 'insights-filters',
        target: 'insights-filters',
        title: 'Filtros por categoría',
        description:
          'Filtra los insights por oportunidades, cuellos de botella, optimización o hallazgos estratégicos.',
        placement: 'bottom',
      },
      {
        id: 'insights-list',
        target: 'insights-list',
        title: 'Hallazgos de IA',
        description:
          'Cada tarjeta detalla un hallazgo con prioridad, confianza y recomendaciones accionables para tu operación.',
        placement: 'top',
      },
    ],
  },
  {
    id: 'cargar',
    route: '/cargar',
    title: 'Cargar Excel',
    steps: [
      {
        id: 'upload-zone',
        target: 'upload-zone',
        title: 'Cargar análisis',
        description:
          'Arrastra o selecciona tu archivo Excel de movimientos de materiales para iniciar el análisis de pérdidas operativas.',
        placement: 'bottom',
      },
      {
        id: 'upload-columns',
        target: 'upload-columns',
        title: 'Columnas esperadas',
        description:
          'Tu archivo debe incluir las columnas requeridas: fecha, tipo, material, cantidad, costo unitario y etapa.',
        placement: 'top',
      },
    ],
  },
  {
    id: 'historial',
    route: '/historial',
    title: 'Historial',
    steps: [
      {
        id: 'historial-header',
        target: 'historial-header',
        title: 'Historial de análisis',
        description:
          'Consulta todos los análisis previos almacenados en el servidor compartido de tu equipo.',
        placement: 'bottom',
      },
      {
        id: 'historial-list',
        target: 'historial-list',
        title: 'Análisis anteriores',
        description:
          'Cada entrada muestra el periodo analizado, métricas clave y un enlace para revisar el detalle completo.',
        placement: 'top',
      },
    ],
  },
  {
    id: 'settings',
    route: '/settings',
    title: 'Configuración',
    steps: [
      {
        id: 'settings-nav',
        target: 'settings-nav',
        title: 'Panel de configuración',
        description:
          'Navega entre las secciones de apariencia, accesibilidad, notificaciones, experiencia y seguridad.',
        placement: 'right',
      },
      {
        id: 'settings-content',
        target: 'settings-content',
        title: 'Preferencias',
        description:
          'Personaliza la plataforma según tus necesidades. Aquí puedes ajustar tema, densidad, idioma y más.',
        placement: 'left',
      },
    ],
  },
]

export function normalizeRoute(pathname: string): string {
  if (pathname.startsWith('/settings')) return '/settings'
  if (pathname.startsWith('/historial/')) return '/historial'
  return pathname
}

export function getTourForRoute(pathname: string): TourConfig | undefined {
  const route = normalizeRoute(pathname)
  return LUPIN_TOURS.find((t) => t.route === route)
}

export function getTourById(tourId: string): TourConfig | undefined {
  return LUPIN_TOURS.find((t) => t.id === tourId)
}
