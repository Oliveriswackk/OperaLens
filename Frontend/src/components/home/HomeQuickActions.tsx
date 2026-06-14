import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  FileText,
  ShieldAlert,
  Upload,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: LucideIcon
  to: string
  accent: string
}

const actions: QuickAction[] = [
  {
    id: 'upload',
    title: 'Subir Archivo',
    description: 'Importar nuevo inventario o reporte.',
    icon: Upload,
    to: '/cargar',
    accent: 'from-primary/10 to-primary/5 group-hover:from-primary/15',
  },
  {
    id: 'reports',
    title: 'Ver Reportes',
    description: 'Consultar reportes históricos y exportables.',
    icon: FileText,
    to: '/reports',
    accent: 'from-secondary/10 to-secondary/5 group-hover:from-secondary/15',
  },
  {
    id: 'risks',
    title: 'Análisis de Riesgos',
    description: 'Explorar riesgos operativos detectados por IA.',
    icon: ShieldAlert,
    to: '/operations',
    accent: 'from-amber-50 to-amber-50/50 group-hover:from-amber-100/80',
  },
  {
    id: 'performance',
    title: 'Análisis de Rendimiento',
    description: 'Revisar tendencias, comportamiento y desempeño general.',
    icon: BarChart3,
    to: '/insights',
    accent: 'from-emerald-50 to-emerald-50/50 group-hover:from-emerald-100/80',
  },
]

export function HomeQuickActions() {
  const navigate = useNavigate()

  return (
    <div className="shrink-0">
      <h3 className="mb-2 text-xs font-bold tracking-wide text-zinc-900 uppercase">
        Acciones Rápidas
      </h3>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {actions.map(({ id, title, description, icon: Icon, to, accent }) => (
          <button
            key={id}
            type="button"
            onClick={() => navigate(to)}
            className={cn(
              'group flex items-center gap-3 rounded-2xl border border-zinc-100 bg-gradient-to-br p-3 text-left shadow-card transition-all duration-200',
              'hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-soft',
              accent,
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Icon className="h-4 w-4 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-zinc-900">{title}</p>
              <p className="line-clamp-1 text-[10px] text-zinc-500">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
