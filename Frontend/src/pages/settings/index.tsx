import { NavLink, Outlet } from 'react-router-dom'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'
import { settingsNav } from '@/pages/settings/sections'

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Configuración"
        description="Personaliza la plataforma, gestiona tu cuenta y preferencias de seguridad"
      />
      <div className="flex flex-col gap-8 lg:flex-row">
        <nav
          data-lupin-target="settings-nav"
          className="flex shrink-0 gap-1 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible"
        >
          {settingsNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-zinc-500 hover:bg-white hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div data-lupin-target="settings-content" className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
