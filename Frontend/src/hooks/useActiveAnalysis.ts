import { useQuery } from '@tanstack/react-query'
import { getAnalisis, getHistorial } from '@/lib/api/analysis'
import { useAnalysisStore } from '@/stores/analysisStore'
import type { AnalisisCompleto } from '@/types/analysis'

async function fetchLatestAnalysis(): Promise<AnalisisCompleto | null> {
  const hist = await getHistorial(1)
  const id = hist[0]?.id
  if (id == null) return null
  return getAnalisis(id)
}

/** Análisis activo: último upload en store, o el más reciente del servidor. */
export function useActiveAnalysis() {
  const storeAnalysis = useAnalysisStore((s) => s.latestAnalysis)

  const { data: fetched, isLoading, isError, refetch } = useQuery({
    queryKey: ['active-analysis-fallback'],
    queryFn: fetchLatestAnalysis,
    enabled: storeAnalysis == null,
    staleTime: 60_000,
  })

  const analysis = storeAnalysis ?? fetched ?? null

  return {
    analysis,
    isLoading: storeAnalysis == null && isLoading,
    isError,
    refetch,
    hasData: analysis != null,
  }
}
