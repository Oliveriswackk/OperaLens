import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFile } from '@/lib/api/analysis'
import { useAnalysisStore } from '@/stores/analysisStore'
import type { AnalisisCompleto } from '@/types/analysis'

/** Mutation para POST /upload. Guarda el resultado como análisis activo. */
export function useUpload() {
  const queryClient = useQueryClient()
  const setLatestAnalysis = useAnalysisStore((s) => s.setLatestAnalysis)

  return useMutation<AnalisisCompleto, Error, File>({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      setLatestAnalysis(data)
      queryClient.invalidateQueries({ queryKey: ['historial'] })
      queryClient.invalidateQueries({ queryKey: ['tendencia'] })
    },
  })
}
