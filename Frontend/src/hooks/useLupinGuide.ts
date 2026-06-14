import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getTourForRoute } from '@/lib/lupin/tours'
import { useLupinStore } from '@/stores/lupinStore'
import { measureTarget, resolveTarget } from '@/components/lupin/TourStep'
import type { TargetRect } from '@/components/lupin/TourStep'

export function useLupinGuide() {
  const { pathname } = useLocation()
  const {
    isGuidedMode,
    activeTourId,
    currentStepIndex,
    startTour,
    nextStep,
    prevStep,
    finishTour,
    skipTour,
    getTourStatus,
  } = useLupinStore()

  const tour = getTourForRoute(pathname)
  const step = tour?.steps[currentStepIndex]
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null)
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null)

  const measure = useCallback(() => {
    if (!step) {
      setTargetRect(null)
      setTargetEl(null)
      return
    }

    const el = resolveTarget(step.target)
    if (!el) {
      setTargetRect(null)
      setTargetEl(null)
      return
    }

    setTargetEl(el)
    setTargetRect(measureTarget(el))
  }, [step])

  useEffect(() => {
    if (!isGuidedMode || !step) return

    const el = resolveTarget(step.target)
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }

    measure()

    const onResize = () => measure()
    const onScroll = () => measure()

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, true)

    const observer = new ResizeObserver(() => measure())
    if (el) observer.observe(el)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll, true)
      observer.disconnect()
    }
  }, [isGuidedMode, step, measure, currentStepIndex, pathname])

  useEffect(() => {
    if (!isGuidedMode || !targetEl) return

    targetEl.setAttribute('data-lupin-highlighted', 'true')
    const prevZIndex = targetEl.style.zIndex
    const prevPosition = targetEl.style.position
    if (!prevPosition || prevPosition === 'static') {
      targetEl.style.position = 'relative'
    }
    targetEl.style.zIndex = '81'

    return () => {
      targetEl.removeAttribute('data-lupin-highlighted')
      targetEl.style.zIndex = prevZIndex
      targetEl.style.position = prevPosition
    }
  }, [isGuidedMode, targetEl])

  const handleStartForRoute = useCallback(() => {
    const routeTour = getTourForRoute(pathname)
    if (routeTour) startTour(routeTour.id)
  }, [pathname, startTour])

  return {
    tour,
    step,
    currentStepIndex,
    totalSteps: tour?.steps.length ?? 0,
    isGuidedMode,
    activeTourId,
    targetRect,
    handleStartForRoute,
    nextStep: () => tour && nextStep(tour.steps.length),
    prevStep,
    finishTour,
    skipTour,
    getTourStatus,
  }
}
