import { useMemo } from 'react'
import { mapInventario } from '@/lib/api/adapters'
import { useActiveAnalysis } from '@/hooks/useActiveAnalysis'
import type { InventoryListResponse } from '@/types/inventory'

export function useInventory() {
  const { analysis, isLoading, refetch, hasData } = useActiveAnalysis()

  const data = useMemo<InventoryListResponse | undefined>(() => {
    if (!analysis) return undefined
    const products = mapInventario(analysis)
    return { products, total: products.length }
  }, [analysis])

  return {
    data,
    isLoading,
    isFetching: isLoading,
    refetch,
    hasData,
  }
}
