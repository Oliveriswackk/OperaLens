import { useSettingsEffects } from '@/hooks/useSettingsEffects'
import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { useUiStore } from '@/stores/uiStore'
import { useSettingsStore } from '@/stores/settingsStore'

export function AppShell() {
  useSettingsEffects()
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUiStore()
  const { pathname } = useLocation()
  const isFullHeight = pathname === '/'
  const reduceMotion = useSettingsStore((s) => s.reduceAnimations)
  const motionClass = reduceMotion ? 'duration-0' : 'duration-300'

  return (
    <div className="flex h-screen overflow-hidden bg-page">
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className={cn(
            'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden',
            motionClass,
          )}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 ease-in-out md:relative md:translate-x-0',
          motionClass,
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />
        <main
          className={cn(
            'app-main flex min-h-0 flex-1 flex-col p-5 lg:p-6',
            isFullHeight ? 'overflow-hidden' : 'overflow-y-auto',
          )}
        >
          <div
            className={cn(
              'mx-auto w-full max-w-[1600px]',
              isFullHeight && 'flex h-full min-h-0 flex-col',
            )}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
