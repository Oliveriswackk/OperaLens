import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { TourStepConfig } from '@/lib/lupin/tours'
import { computeCardPosition } from '@/components/lupin/TourStep'
import type { TargetRect } from '@/components/lupin/TourStep'

interface HelpCardProps {
  step: TourStepConfig
  stepIndex: number
  totalSteps: number
  targetRect: TargetRect | null
  reduceAnimations: boolean
  onPrev: () => void
  onNext: () => void
  onFinish: () => void
  onSkip: () => void
}

export function HelpCard({
  step,
  stepIndex,
  totalSteps,
  targetRect,
  reduceAnimations,
  onPrev,
  onNext,
  onFinish,
  onSkip,
}: HelpCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const isFirst = stepIndex === 0
  const isLast = stepIndex === totalSteps - 1
  const titleId = 'lupin-help-title'
  const descId = 'lupin-help-desc'

  useLayoutEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current.getBoundingClientRect()
    const cardWidth = card.width || 340
    const cardHeight = card.height || 220

    if (targetRect) {
      const pos = computeCardPosition(
        targetRect,
        step.placement ?? 'auto',
        cardWidth,
        cardHeight,
      )
      setPosition({ top: pos.top, left: pos.left })
    } else {
      setPosition({
        top: window.innerHeight / 2 - cardHeight / 2,
        left: window.innerWidth / 2 - cardWidth / 2,
      })
    }
  }, [targetRect, step, stepIndex])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const focusable = card.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return

      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    card.addEventListener('keydown', handleKeyDown)
    return () => card.removeEventListener('keydown', handleKeyDown)
  }, [stepIndex])

  const transition = reduceAnimations ? { duration: 0 } : { type: 'spring' as const, stiffness: 400, damping: 30 }

  return (
    <motion.div
      ref={cardRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className={cn(
        'fixed z-[85] w-[min(340px,calc(100vw-32px))] rounded-2xl bg-white p-5 shadow-soft',
        'ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-700',
      )}
      initial={reduceAnimations ? false : { opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1, top: position.top, left: position.left }}
      exit={reduceAnimations ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
      transition={transition}
      style={{ top: position.top, left: position.left }}
    >
      <div className="mb-4 flex items-start gap-3">
        <img
          src="/lupin.png"
          alt=""
          aria-hidden="true"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">Lupin</p>
          <h2 id={titleId} className="mt-0.5 text-base font-bold text-zinc-900 dark:text-zinc-100">
            {step.title}
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {stepIndex + 1}/{totalSteps}
        </span>
      </div>

      <p id={descId} className="mb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {step.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          Omitir guía
        </button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Paso anterior"
          >
            Anterior
          </Button>
          {isLast ? (
            <Button size="sm" onClick={onFinish} aria-label="Finalizar guía">
              Finalizar
            </Button>
          ) : (
            <Button size="sm" onClick={onNext} aria-label="Siguiente paso">
              Siguiente
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
