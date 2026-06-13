import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SortingState } from '@tanstack/react-table'
import { InventoryPageHeader } from '@/components/inventory/InventoryPageHeader'
import { InventoryToolbar } from '@/components/inventory/InventoryToolbar'
import { InventoryTable } from '@/components/inventory/InventoryTable'
import { Skeleton } from '@/components/ui/skeleton'
import { useInventory } from '@/hooks/useInventory'
import {
  applyInventoryFilters,
  defaultInventoryFilters,
} from '@/lib/inventory/filters'
import type { InventoryFilters } from '@/types/inventory'

function InventoryPageLoader() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <Skeleton className="mb-4 h-14 w-64 bg-zinc-800" />
      <Skeleton className="mb-4 h-10 w-full bg-zinc-800" />
      <Skeleton className="flex-1 rounded-xl bg-zinc-800" />
    </div>
  )
}

export default function InventoryPage() {
  const navigate = useNavigate()
  const { data, isLoading, refetch, isFetching } = useInventory()
  const [filters, setFilters] = useState<InventoryFilters>(defaultInventoryFilters)
  const [sorting, setSorting] = useState<SortingState>([])

  const sourceProducts = data?.products ?? []
  const hasSourceData = sourceProducts.length > 0

  const filteredProducts = useMemo(
    () => applyInventoryFilters(sourceProducts, filters),
    [sourceProducts, filters],
  )

  const externalSortActive =
    filters.priceSort !== 'none' || filters.purchaseSort !== 'none'

  const handleUpload = () => navigate('/integrations')

  if (isLoading) return <InventoryPageLoader />

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-soft">
        <InventoryPageHeader
          onExport={() => undefined}
          onRefresh={() => refetch()}
          onUpload={handleUpload}
        />

        <InventoryToolbar
          filters={filters}
          onChange={setFilters}
          resultCount={filteredProducts.length}
        />

        {isFetching && !isLoading && (
          <div className="shrink-0 border-b border-zinc-800 bg-primary/10 px-6 py-1.5 text-xs text-primary">
            Actualizando inventario...
          </div>
        )}

        <InventoryTable
          products={filteredProducts}
          hasSourceData={hasSourceData}
          sorting={sorting}
          onSortingChange={setSorting}
          onUpload={handleUpload}
          externalSortActive={externalSortActive}
        />
      </div>
    </div>
  )
}
