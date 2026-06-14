import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLupinGuide } from '@/hooks/useLupinGuide'
import { resolveTarget } from '@/components/lupin/TourStep'
import { SpotlightOverlay } from '@/components/lupin/SpotlightOverlay'
import { HelpCard } from '@/components/lupin/HelpCard'
import { useLupinStore } from '@/stores/lupinStore'
import { useSettingsStore } from '@/stores/settingsStore'

export function GuidedTour() {
  const { pathname } = useLocation()
  const showOnboardingTips = useSettingsStore((s) => s.showOnboardingTips)
  const reduceAnimations = useSettingsStore((s) => s.reduceAnimations)
  const startTour = useLupinStore((s) => s.startTour)
  const getTourStatus = useLupinStore((s) => s.getTourStatus)
  const autoStarted = useRef(false)

  const {
    tour,
    step,
    currentStepIndex,
    totalSteps,
    isGuidedMode,
    targetRect,
    nextStep,
    prevStep,
    finishTour,
    skipTour,
  } = useLupinGuide()

  const liveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showOnboardingTips || pathname !== '/' || autoStarted.current) return
    if (getTourStatus('home') !== 'pending') return
    if (useLupinStore.getState().isGuidedMode) return

    const timer = setTimeout(() => {
      const firstTarget = resolveTarget('sidebar')
      if (firstTarget && !useLupinStore.getState().isGuidedMode) {
        startTour('home')
        autoStarted.current = true
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [showOnboardingTips, pathname, getTourStatus, startTour])

  useEffect(() => {
    if (!isGuidedMode) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'

      if (e.key === 'Escape') {
        e.preventDefault()
        skipTour()
        document.querySelector<HTMLElement>('[data-lupin-button]')?.focus()
        return
      }

      if (isInput) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (currentStepIndex < totalSteps - 1) nextStep()
        else finishTour()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevStep()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isGuidedMode, currentStepIndex, totalSteps, nextStep, prevStep, finishTour, skipTour])

  useEffect(() => {
    if (!isGuidedMode || !step || !liveRef.current) return
    liveRef.current.textContent = `Paso ${currentStepIndex + 1} de ${totalSteps}: ${step.title}. ${step.description}`
  }, [isGuidedMode, step, currentStepIndex, totalSteps])

  const handleFinish = () => {
    finishTour()
    document.querySelector<HTMLElement>('[data-lupin-button]')?.focus()
  }

  const handleSkip = () => {
    skipTour()
    document.querySelector<HTMLElement>('[data-lupin-button]')?.focus()
  }

  if (!isGuidedMode || !tour || !step) return null

  return (
    <>
      <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />
      <SpotlightOverlay targetRect={targetRect} reduceAnimations={reduceAnimations} />
      <AnimatePresence mode="wait">
        <HelpCard
          key={step.id}
          step={step}
          stepIndex={currentStepIndex}
          totalSteps={totalSteps}
          targetRect={targetRect}
          reduceAnimations={reduceAnimations}
          onPrev={prevStep}
          onNext={nextStep}
          onFinish={handleFinish}
          onSkip={handleSkip}
        />
      </AnimatePresence>
    </>
  )
}
