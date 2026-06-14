import { useQuery } from '@tanstack/react-query'
import { getHistorial } from '@/lib/api/analysis'
import { mapHistorialToReports } from '@/lib/api/adapters'

export function useReports(limite = 20) {
  return useQuery({
    queryKey: ['reports', limite],
    queryFn: async () => {
      const rows = await getHistorial(limite)
      return mapHistorialToReports(rows)
    },
  })
}
