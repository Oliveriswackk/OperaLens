import { useAnalysisStore } from '@/stores/analysisStore'

/** El dashboard muestra el análisis activo (último upload o uno reabierto desde historial). */
export function useDashboardData() {
  return useAnalysisStore((s) => s.latestAnalysis)
}
