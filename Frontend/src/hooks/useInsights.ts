import { useMemo } from 'react'
import { mapInsights } from '@/lib/api/adapters'
import { useActiveAnalysis } from '@/hooks/useActiveAnalysis'

export function useInsights() {
  const { analysis, isLoading, refetch, hasData } = useActiveAnalysis()

  const data = useMemo(() => {
    if (!analysis) return undefined
    return mapInsights(analysis)
  }, [analysis])

  return { data, isLoading, refetch, hasData }
}
