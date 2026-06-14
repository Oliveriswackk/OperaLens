import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAnalisis } from '@/lib/api/analysis'

/** DELETE /historial/{id} — elimina un análisis del historial. */
export function useDeleteAnalisis() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteAnalisis(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historial'] })
      queryClient.invalidateQueries({ queryKey: ['active-analysis-fallback'] })
      queryClient.invalidateQueries({ queryKey: ['tendencia'] })
    },
  })
}
