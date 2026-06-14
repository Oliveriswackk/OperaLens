import { useEffect } from 'react'
import { LifeBuoy, Mail, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  SUPPORT_EMAIL,
  SUPPORT_SLA,
  supportMailtoUrl,
} from '@/lib/constants/support'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'
import { useSettingsStore } from '@/stores/settingsStore'

export function SupportModal() {
  const { supportOpen, setSupportOpen } = useUiStore()
  const reduceMotion = useSettingsStore((s) => s.reduceAnimations)
  const motionClass = reduceMotion ? 'duration-0' : 'duration-200'

  useEffect(() => {
    if (!supportOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSupportOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [supportOpen, setSupportOpen])

  if (!supportOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm',
        motionClass,
      )}
      onClick={() => setSupportOpen(false)}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="support-modal-title"
        aria-modal="true"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
              <LifeBuoy className="h-5 w-5 text-primary" />
            </span>
            <div>
              <h2 id="support-modal-title" className="text-sm font-bold text-zinc-100">
                ¿Necesitas ayuda?
              </h2>
              <p className="text-xs text-zinc-500">
                Nuestro equipo de soporte está disponible para ayudarte.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSupportOpen(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
            <p className="text-[10px] font-semibold tracking-wide text-zinc-500 uppercase">
              Correo
            </p>
            <a
              href={supportMailtoUrl()}
              className="mt-1 flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {SUPPORT_EMAIL}
            </a>
          </div>

          <p className="text-xs text-zinc-500">{SUPPORT_SLA}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                window.location.href = supportMailtoUrl()
              }}
            >
              <Mail className="h-3.5 w-3.5" />
              Enviar correo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              onClick={() => setSupportOpen(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
