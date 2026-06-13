import { create } from 'zustand'
import type { AnalisisCompleto } from '@/types/analysis'

const STORAGE_KEY = 'operalens-latest-analysis'

interface AnalysisState {
  latestAnalysis: AnalisisCompleto | null
  setLatestAnalysis: (analisis: AnalisisCompleto) => void
  clearAnalysis: () => void
}

function loadLatest(): AnalisisCompleto | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AnalisisCompleto
  } catch {
    /* ignore */
  }
  return null
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  latestAnalysis: loadLatest(),
  setLatestAnalysis: (analisis) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(analisis))
    } catch {
      /* ignore */
    }
    set({ latestAnalysis: analisis })
  },
  clearAnalysis: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    set({ latestAnalysis: null })
  },
}))
