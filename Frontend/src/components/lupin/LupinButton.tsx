import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLupinGuide } from '@/hooks/useLupinGuide'
import { useSettingsStore } from '@/stores/settingsStore'

export function LupinButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { isGuidedMode, handleStartForRoute, getTourStatus, tour } = useLupinGuide()
  const reduceAnimations = useSettingsStore((s) => s.reduceAnimations)

  const status = tour ? getTourStatus(tour.id) : 'pending'
  const showPulse = status === 'pending' && !isGuidedMode

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
      <motion.button
        ref={buttonRef}
        type="button"
        data-lupin-button
        onClick={handleStartForRoute}
        aria-label="Abrir guía de Lupin"
        className={cn(
          'group relative flex h-14 w-14 items-center justify-center rounded-full',
          'bg-white shadow-soft ring-2 ring-primary/20 transition-shadow',
          'hover:shadow-[0_0_24px_rgba(82,46,147,0.35)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          isGuidedMode && 'pointer-events-none opacity-40',
        )}
        whileHover={reduceAnimations ? undefined : { scale: 1.08 }}
        whileTap={reduceAnimations ? undefined : { scale: 0.95 }}
        animate={
          showPulse && !reduceAnimations
            ? {
                boxShadow: [
                  '0 4px 24px rgba(82,46,147,0.08)',
                  '0 0 28px rgba(82,46,147,0.4)',
                  '0 4px 24px rgba(82,46,147,0.08)',
                ],
              }
            : undefined
        }
        transition={
          showPulse && !reduceAnimations
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 400, damping: 20 }
        }
      >
        <img
          src="/lupin.png"
          alt="Lupin"
          className="h-11 w-11 rounded-full object-cover object-center"
          draggable={false}
        />
        <span
          className={cn(
            'pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl',
            'bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg',
            'opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
            'dark:bg-zinc-800',
          )}
          role="tooltip"
        >
          Lupin te puede ayudar
        </span>
      </motion.button>
    </div>
  )
}
