import { motion } from 'framer-motion'
import type { TargetRect } from '@/components/lupin/TourStep'

interface SpotlightOverlayProps {
  targetRect: TargetRect | null
  reduceAnimations: boolean
}

export function SpotlightOverlay({ targetRect, reduceAnimations }: SpotlightOverlayProps) {
  const transition = reduceAnimations ? { duration: 0 } : { type: 'spring' as const, stiffness: 300, damping: 30 }

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      {targetRect ? (
        <>
          <motion.div
            className="pointer-events-auto absolute rounded-xl"
            initial={false}
            animate={{
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
            }}
            transition={transition}
            style={{
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.55)',
            }}
          />
          <motion.div
            className="pointer-events-none absolute rounded-xl border-2 border-warning"
            initial={false}
            animate={{
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
            }}
            transition={transition}
            style={{
              boxShadow:
                '0 0 0 4px rgba(245, 158, 11, 0.4), 0 8px 32px rgba(245, 158, 11, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15)',
            }}
          />
        </>
      ) : (
        <div className="pointer-events-auto absolute inset-0 bg-black/55" />
      )}
    </div>
  )
}
