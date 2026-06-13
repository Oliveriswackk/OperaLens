import { useQuery } from '@tanstack/react-query'
import { getAnalisis } from '@/lib/api/analysis'

/** GET /historial/{id} — análisis completo para la vista de detalle. */
export function useAnalisisDetalle(id: number | undefined) {
  return useQuery({
    queryKey: ['analisis', id],
    queryFn: () => getAnalisis(id as number),
    enabled: id != null && !Number.isNaN(id),
  })
}
