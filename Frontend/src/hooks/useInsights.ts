import { useQuery } from '@tanstack/react-query'
import { mockFetch } from '@/lib/api/client'
import { insights } from '@/data/mocks/insights'

export function useInsights() {
  return useQuery({
    queryKey: ['insights'],
    queryFn: () => mockFetch(insights),
  })
}
