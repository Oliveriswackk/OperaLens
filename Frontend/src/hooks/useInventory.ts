import { useQuery } from '@tanstack/react-query'
import { mockFetch } from '@/lib/api/client'
import { inventoryProducts } from '@/data/mocks/inventory'
import type { InventoryListResponse } from '@/types/inventory'

export function useInventory() {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: () =>
      mockFetch<InventoryListResponse>({
        products: inventoryProducts,
        total: inventoryProducts.length,
      }),
  })
}
