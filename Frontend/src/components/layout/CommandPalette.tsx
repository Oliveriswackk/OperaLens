import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  Bell,
  FileText,
  LayoutDashboard,
  LineChart,
  Plug,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react'
import { useUiStore } from '@/stores/uiStore'

const commands = [
  { to: '/', label: 'Ir a Inicio', icon: LayoutDashboard, keywords: 'dashboard inicio kpi' },
  { to: '/operations', label: 'Ir a Operaciones', icon: Activity, keywords: 'procesos flujos recursos equipos' },
  { to: '/analytics', label: 'Ir a Analítica', icon: LineChart, keywords: 'predicciones what if escenarios' },
  { to: '/alerts', label: 'Ir a Alertas', icon: Bell, keywords: 'incidentes severidad anomalías' },
  { to: '/reports', label: 'Ir a Reportes', icon: FileText, keywords: 'exportar programados ejecutivos' },
  { to: '/insights', label: 'Ir a Insights IA', icon: Sparkles, keywords: 'recomendaciones oportunidades' },
  { to: '/integrations', label: 'Ir a Integraciones', icon: Plug, keywords: 'api conectores sincronización' },
  { to: '/settings', label: 'Ir a Configuración', icon: Settings, keywords: 'usuarios roles seguridad' },
]

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUiStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setCommandPaletteOpen])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q),
    )
  }, [query])

  if (!commandPaletteOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-28 backdrop-blur-sm"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-100 px-4">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en OperaLens..."
            className="h-13 w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-zinc-400">Sin resultados</p>
          )}
          {filtered.map(({ to, label, icon: Icon }) => (
            <button
              key={to}
              onClick={() => {
                navigate(to)
                setCommandPaletteOpen(false)
                setQuery('')
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-700 hover:bg-primary/5 hover:text-primary"
            >
              <Icon className="h-4 w-4 shrink-0 text-zinc-400" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
