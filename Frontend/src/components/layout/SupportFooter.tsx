import { LifeBuoy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SUPPORT_EMAIL } from '@/lib/constants/support'
import { useUiStore } from '@/stores/uiStore'

export function SupportFooter() {
  const setSupportOpen = useUiStore((s) => s.setSupportOpen)

  return (
    <footer className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-2.5 lg:px-6">
      <div className="flex min-h-[48px] flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-100">¿Necesitas ayuda?</p>
          <p className="text-[11px] text-zinc-500">
            Nuestro equipo de soporte está disponible para ayudarte.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-0.5 hidden text-[10px] text-zinc-600 transition-colors hover:text-zinc-400 sm:inline"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="shrink-0"
          onClick={() => setSupportOpen(true)}
        >
          <LifeBuoy className="h-3.5 w-3.5" />
          Contactar Soporte
        </Button>
      </div>
    </footer>
  )
}
