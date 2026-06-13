import { useQuery } from '@tanstack/react-query'
import { mockFetch } from '@/lib/api/client'
import { homeDashboardData } from '@/data/mocks/dashboard'

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => mockFetch(homeDashboardData),
  })
}
