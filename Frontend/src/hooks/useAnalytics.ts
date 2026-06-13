import { useQuery } from '@tanstack/react-query'
import { mockFetch } from '@/lib/api/client'
import {
  lossTrend,
  predictions,
  scenarioPresets,
  trendHeatmap,
  whatIfBaseline,
} from '@/data/mocks/analytics'

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () =>
      mockFetch({ predictions, lossTrend, scenarioPresets, trendHeatmap, whatIfBaseline }),
  })
}
