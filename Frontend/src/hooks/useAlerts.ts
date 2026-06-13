import { useQuery } from '@tanstack/react-query'
import { mockFetch } from '@/lib/api/client'
import { alertStats, incidents } from '@/data/mocks/alerts'

export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => mockFetch({ stats: alertStats, incidents }),
  })
}
