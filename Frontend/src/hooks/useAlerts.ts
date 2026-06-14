import { useMemo } from 'react'
import { mapAnomaliasToAlerts } from '@/lib/api/adapters'
import { useActiveAnalysis } from '@/hooks/useActiveAnalysis'

export function useAlerts() {
  const { analysis, isLoading, refetch, hasData } = useActiveAnalysis()

  const data = useMemo(() => {
    if (!analysis) return undefined
    return mapAnomaliasToAlerts(analysis)
  }, [analysis])

  return { data, isLoading, refetch, hasData }
}
