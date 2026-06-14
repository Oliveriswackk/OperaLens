import { create } from 'zustand'

const STORAGE_KEY = 'operalens-lupin-guide'

interface LastViewed {
  tourId: string
  stepIndex: number
}

interface PersistedState {
  completedTours: Record<string, boolean>
  skippedTours: Record<string, boolean>
  lastViewed: LastViewed | null
}

interface LupinStore extends PersistedState {
  isGuidedMode: boolean
  activeTourId: string | null
  currentStepIndex: number
  startTour: (tourId: string, stepIndex?: number) => void
  nextStep: (totalSteps: number) => void
  prevStep: () => void
  finishTour: () => void
  skipTour: () => void
  closeGuide: () => void
  restartTour: (tourId: string) => void
  resetAllProgress: () => void
  getTourStatus: (tourId: string) => 'completed' | 'skipped' | 'pending'
}

function loadPersisted(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>
      return {
        completedTours: parsed.completedTours ?? {},
        skippedTours: parsed.skippedTours ?? {},
        lastViewed: parsed.lastViewed ?? null,
      }
    }
  } catch {
    /* ignore */
  }
  return { completedTours: {}, skippedTours: {}, lastViewed: null }
}

function persist(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

const persisted = loadPersisted()

export const useLupinStore = create<LupinStore>((set, get) => ({
  isGuidedMode: false,
  activeTourId: null,
  currentStepIndex: 0,
  completedTours: persisted.completedTours,
  skippedTours: persisted.skippedTours,
  lastViewed: persisted.lastViewed,

  startTour: (tourId, stepIndex = 0) => {
    set({
      isGuidedMode: true,
      activeTourId: tourId,
      currentStepIndex: stepIndex,
    })
    const { completedTours, skippedTours } = get()
    persist({ completedTours, skippedTours, lastViewed: { tourId, stepIndex } })
  },

  nextStep: (totalSteps) => {
    const { currentStepIndex, activeTourId, completedTours, skippedTours } = get()
    if (!activeTourId) return

    const next = currentStepIndex + 1
    if (next >= totalSteps) {
      const updated = { ...completedTours, [activeTourId]: true }
      set({
        isGuidedMode: false,
        activeTourId: null,
        currentStepIndex: 0,
        completedTours: updated,
        lastViewed: { tourId: activeTourId, stepIndex: totalSteps - 1 },
      })
      persist({ completedTours: updated, skippedTours, lastViewed: { tourId: activeTourId, stepIndex: totalSteps - 1 } })
      return
    }

    set({ currentStepIndex: next, lastViewed: { tourId: activeTourId, stepIndex: next } })
    persist({
      completedTours,
      skippedTours,
      lastViewed: { tourId: activeTourId, stepIndex: next },
    })
  },

  prevStep: () => {
    const { currentStepIndex, activeTourId, completedTours, skippedTours } = get()
    if (!activeTourId || currentStepIndex <= 0) return

    const prev = currentStepIndex - 1
    set({ currentStepIndex: prev, lastViewed: { tourId: activeTourId, stepIndex: prev } })
    persist({
      completedTours,
      skippedTours,
      lastViewed: { tourId: activeTourId, stepIndex: prev },
    })
  },

  finishTour: () => {
    const { activeTourId, completedTours, skippedTours, currentStepIndex } = get()
    if (!activeTourId) return

    const updated = { ...completedTours, [activeTourId]: true }
    set({
      isGuidedMode: false,
      activeTourId: null,
      currentStepIndex: 0,
      completedTours: updated,
      lastViewed: { tourId: activeTourId, stepIndex: currentStepIndex },
    })
    persist({
      completedTours: updated,
      skippedTours,
      lastViewed: { tourId: activeTourId, stepIndex: currentStepIndex },
    })
  },

  skipTour: () => {
    const { activeTourId, completedTours, skippedTours, currentStepIndex } = get()
    if (!activeTourId) return

    const updated = { ...skippedTours, [activeTourId]: true }
    set({
      isGuidedMode: false,
      activeTourId: null,
      currentStepIndex: 0,
      skippedTours: updated,
      lastViewed: { tourId: activeTourId, stepIndex: currentStepIndex },
    })
    persist({
      completedTours,
      skippedTours: updated,
      lastViewed: { tourId: activeTourId, stepIndex: currentStepIndex },
    })
  },

  closeGuide: () => {
    set({ isGuidedMode: false, activeTourId: null, currentStepIndex: 0 })
  },

  restartTour: (tourId) => {
    get().startTour(tourId, 0)
  },

  resetAllProgress: () => {
    set({
      completedTours: {},
      skippedTours: {},
      lastViewed: null,
      isGuidedMode: false,
      activeTourId: null,
      currentStepIndex: 0,
    })
    persist({ completedTours: {}, skippedTours: {}, lastViewed: null })
  },

  getTourStatus: (tourId) => {
    const { completedTours, skippedTours } = get()
    if (completedTours[tourId]) return 'completed'
    if (skippedTours[tourId]) return 'skipped'
    return 'pending'
  },
}))
