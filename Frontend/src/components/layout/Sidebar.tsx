import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  AlertTriangle,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Clock,
  Home,
  Menu,
  Settings,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SidebarTooltip } from '@/components/shared/SidebarTooltip'
import { useUiStore } from '@/stores/uiStore'
import { useSettingsStore } from '@/stores/settingsStore'

interface NavChild {
  to: string
  label: string
}

interface NavGroup {
  id: string
  label: string
  icon: typeof Home
  to?: string
  children?: NavChild[]
}

const navigation: NavGroup[] = [
  { id: 'inicio', label: 'Inicio', icon: Home, to: '/' },
  { id: 'cargar', label: 'Cargar Excel', icon: UploadCloud, to: '/cargar' },
  { id: 'anomalias', label: 'Anomalías', icon: AlertTriangle, to: '/alerts' },
  { id: 'analisis', label: 'Análisis', icon: BarChart3, to: '/insights' },
  { id: 'historial', label: 'Historial', icon: Clock, to: '/historial' },
]

const settingsNavItem = { id: 'configuracion', label: 'Configuración', icon: Settings, to: '/settings' }

function isGroupActive(group: NavGroup, pathname: string) {
  if (group.to && (group.to === '/' ? pathname === '/' : pathname.startsWith(group.to))) {
    return true
  }
  return group.children?.some((c) => pathname.startsWith(c.to)) ?? false
}

const navLinkClass = (isActive: boolean, collapsed: boolean) =>
  cn(
    'flex items-center rounded-xl text-sm font-medium transition-all duration-300',
    collapsed ? 'mx-auto h-10 w-10 justify-center px-0' : 'gap-3 px-4 py-2.5',
    isActive
      ? 'bg-primary text-white shadow-sm'
      : 'text-zinc-400 hover:bg-white/5 hover:text-white',
  )

export function Sidebar() {
  const { pathname } = useLocation()
  const {
    sidebarCollapsed,
    toggleSidebarCollapsed,
    navExpandedGroups,
    toggleNavGroup,
    setNavExpandedGroups,
    setMobileSidebarOpen,
  } = useUiStore()
  const enableTooltips = useSettingsStore((s) => s.enableTooltips)
  const rememberNavigation = useSettingsStore((s) => s.rememberNavigationState)
  const autoCollapse = useSettingsStore((s) => s.autoCollapseSidebar)
  const reduceMotion = useSettingsStore((s) => s.reduceAnimations)
  const motion = reduceMotion ? 'duration-0' : 'duration-300'
  const [flyoutGroup, setFlyoutGroup] = useState<string | null>(null)
  const flyoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rememberNavigation) return
    const activeGroups = Object.fromEntries(
      navigation
        .filter((g) => g.children && isGroupActive(g, pathname))
        .map((g) => [g.id, true]),
    )
    setNavExpandedGroups({ ...navExpandedGroups, ...activeGroups })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (autoCollapse && window.innerWidth < 1280 && window.innerWidth >= 768) {
      useUiStore.getState().setSidebarCollapsed(true)
    }
  }, [pathname, autoCollapse])

  useEffect(() => {
    setFlyoutGroup(null)
    setMobileSidebarOpen(false)
  }, [pathname, setMobileSidebarOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setFlyoutGroup(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = () => setMobileSidebarOpen(false)

  const wrapTooltip = (label: string, node: React.ReactNode) =>
    sidebarCollapsed ? (
      <SidebarTooltip content={label} enabled={enableTooltips}>
        {node}
      </SidebarTooltip>
    ) : (
      node
    )

  return (
    <aside
      className={cn(
        'flex h-screen shrink-0 flex-col overflow-hidden bg-black transition-[width] ease-in-out',
        motion,
        sidebarCollapsed ? 'w-20' : 'w-[280px]',
      )}
    >
      {/* Header + hamburger */}
      <div
        className={cn(
          'flex items-center pt-6 pb-6 transition-all duration-300',
          sidebarCollapsed ? 'justify-center px-3' : 'justify-between px-5',
        )}
      >
        {!sidebarCollapsed && (
          <div className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold tracking-tight text-white">OperaLens</h1>
              <p className="truncate text-[10px] text-zinc-500">Detección de pérdidas operativas</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebarCollapsed}
          aria-label={sidebarCollapsed ? 'Expandir menú' : 'Contraer menú'}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-white',
            sidebarCollapsed && 'mx-auto',
          )}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3">
        {navigation.map((group) => {
          const Icon = group.icon
          const active = isGroupActive(group, pathname)
          const isOpen = navExpandedGroups[group.id] ?? active

          if (!group.children) {
            const link = (
              <NavLink
                key={group.id}
                to={group.to!}
                end={group.to === '/'}
                onClick={handleNavClick}
                className={({ isActive }) => navLinkClass(isActive, sidebarCollapsed)}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{group.label}</span>}
              </NavLink>
            )
            return (
              <div key={group.id}>{wrapTooltip(group.label, link)}</div>
            )
          }

          if (sidebarCollapsed) {
            return (
              <div key={group.id} className="relative" ref={flyoutGroup === group.id ? flyoutRef : undefined}>
                {wrapTooltip(
                  group.label,
                  <button
                    type="button"
                    onClick={() => setFlyoutGroup(flyoutGroup === group.id ? null : group.id)}
                    className={cn(
                      'mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300',
                      active
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                    )}
                    aria-label={group.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </button>,
                )}
                {flyoutGroup === group.id && (
                  <div className="absolute top-0 left-[calc(100%+8px)] z-[60] min-w-[200px] rounded-2xl border border-zinc-800 bg-zinc-950 py-2 shadow-xl">
                    <p className="px-4 py-2 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
                      {group.label}
                    </p>
                    {group.children.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.to}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-2 px-4 py-2 text-[13px] transition-colors duration-200',
                            isActive
                              ? 'bg-primary font-semibold text-white'
                              : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                          )
                        }
                      >
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <div key={group.id}>
              <button
                type="button"
                onClick={() => toggleNavGroup(group.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
                  active && !isOpen
                    ? 'text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="flex-1 truncate text-left">{group.label}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  isOpen ? 'mt-1 max-h-96 opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                <div className="ml-4 space-y-0.5 border-l border-zinc-800 pl-3">
                  {group.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.to}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] transition-all duration-300',
                          isActive
                            ? 'bg-primary font-semibold text-white'
                            : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300',
                        )
                      }
                    >
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                      <span className="truncate">{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Configuración — footer */}
      <div className={cn('px-3 pb-3', sidebarCollapsed && 'flex justify-center')}>
        {wrapTooltip(
          settingsNavItem.label,
          <NavLink
            to={settingsNavItem.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-white/8',
                sidebarCollapsed ? 'mx-auto h-10 w-10 justify-center px-0' : 'gap-3 px-4 py-3',
                isActive ? 'bg-primary text-white shadow-sm hover:bg-primary' : 'text-zinc-400 hover:text-white',
              )
            }
          >
            <Settings className="h-4.5 w-4.5 shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">{settingsNavItem.label}</span>
            )}
          </NavLink>,
        )}
      </div>

      {/* Version footer */}
      {!sidebarCollapsed && (
        <div className="flex items-center gap-2 px-6 py-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <p className="text-[11px] text-zinc-600">v2.5.0 · © 2026 OperaLens</p>
        </div>
      )}
    </aside>
  )
}
