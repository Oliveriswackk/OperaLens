import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEficienciaProduccion } from '@/lib/api/analysis'
import { mapOperations } from '@/lib/api/adapters'
import { useActiveAnalysis } from '@/hooks/useActiveAnalysis'

export function useOperations() {
  const { analysis, isLoading: loadingAnalysis, refetch, hasData } = useActiveAnalysis()

  const { data: eficiencia, isLoading: loadingEficiencia } = useQuery({
    queryKey: ['produccion-eficiencia'],
    queryFn: () => getEficienciaProduccion(30),
    enabled: hasData,
    staleTime: 120_000,
  })

  const data = useMemo(() => {
    if (!analysis) return undefined
    return mapOperations(analysis, eficiencia ?? null)
  }, [analysis, eficiencia])

  return {
    data,
    isLoading: loadingAnalysis || (hasData && loadingEficiencia),
    refetch,
    hasData,
  }
}
