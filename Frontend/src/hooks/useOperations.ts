import { useQuery } from '@tanstack/react-query'
import { mockFetch } from '@/lib/api/client'
import {
  areaPerformance,
  bottlenecks,
  criticalTasks,
  processes,
  resources,
} from '@/data/mocks/operations'

export function useOperations() {
  return useQuery({
    queryKey: ['operations'],
    queryFn: () =>
      mockFetch({ processes, resources, bottlenecks, areaPerformance, criticalTasks }),
  })
}
