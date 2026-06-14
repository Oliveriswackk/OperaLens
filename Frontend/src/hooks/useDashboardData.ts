import { useMemo } from 'react'
import { mapHomeDashboard } from '@/lib/api/adapters'
import { useActiveAnalysis } from '@/hooks/useActiveAnalysis'
import { useTendencia } from '@/hooks/useTendencia'

export function useDashboardData() {
  const { analysis, isLoading, isError } = useActiveAnalysis()
  const { data: tendencia, isLoading: tendenciaLoading } = useTendencia()

  const data = useMemo(() => {
    if (!analysis) return null
    return mapHomeDashboard(analysis, tendencia ?? [])
  }, [analysis, tendencia])

  return {
    data,
    loading: isLoading || tendenciaLoading,
    error: isError ? 'No se pudo cargar el análisis' : null,
  }
}
