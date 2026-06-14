import { useState } from 'react'
import { Bell, HelpCircle, Menu } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { useUiStore } from '@/stores/uiStore'
import { useUserStore } from '@/stores/userStore'
import { recentNotifications } from '@/data/mocks/dashboard'
import { AlertSeverityBadge } from '@/components/shared/AlertSeverityBadge'

export function TopBar() {
  const { setMobileSidebarOpen, setSupportOpen } = useUiStore()
  const { nombre, rol, iniciales } = useUserStore()
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-18 items-center gap-4 border-b border-zinc-100 bg-white/80 px-4 backdrop-blur-md md:px-6">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition-colors hover:bg-zinc-100 md:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Ayuda */}
        <button
          type="button"
          onClick={() => setSupportOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          aria-label="Ayuda"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Notificaciones */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-2 shadow-soft ring-1 ring-zinc-100">
              <p className="px-3 py-2 text-xs font-bold tracking-wide text-zinc-400 uppercase">
                Notificaciones
              </p>
              {recentNotifications.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-zinc-50"
                >
                  <AlertSeverityBadge severity={alert.severity} />
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{alert.message}</p>
                    <p className="text-xs text-zinc-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Perfil */}
        <div className="ml-2 flex items-center gap-3">
          <Avatar initials={iniciales} />
          <div className="hidden lg:block">
            <p className="text-sm leading-tight font-bold text-zinc-900">{nombre}</p>
            <p className="text-xs text-zinc-400">{rol}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
