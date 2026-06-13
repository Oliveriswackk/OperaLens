import { useQuery } from '@tanstack/react-query'
import { getHistorial } from '@/lib/api/analysis'

/** GET /historial — resúmenes de análisis previos. */
export function useHistorial(limite = 10) {
  return useQuery({
    queryKey: ['historial', limite],
    queryFn: () => getHistorial(limite),
  })
}
