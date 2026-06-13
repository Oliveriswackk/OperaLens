import { useQuery } from '@tanstack/react-query'
import { getTendencia } from '@/lib/api/analysis'

/** GET /tendencia — serie cronológica de pérdidas para la gráfica del dashboard. */
export function useTendencia(ultimos = 6) {
  return useQuery({
    queryKey: ['tendencia', ultimos],
    queryFn: () => getTendencia(ultimos),
  })
}
