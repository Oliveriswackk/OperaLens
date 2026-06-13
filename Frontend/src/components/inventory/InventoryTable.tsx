import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { StockBadge } from '@/components/inventory/StockBadge'
import { InventoryEmptyState } from '@/components/inventory/InventoryEmptyState'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/inventory/filters'
import type { InventoryProduct } from '@/types/inventory'
import { cn } from '@/lib/utils'

interface InventoryTableProps {
  products: InventoryProduct[]
  hasSourceData: boolean
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
  onUpload?: () => void
  externalSortActive: boolean
}

const columns: ColumnDef<InventoryProduct>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-zinc-400">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre del Producto',
    cell: ({ getValue }) => (
      <span className="font-medium text-zinc-100">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción Breve',
    cell: ({ getValue }) => (
      <span className="line-clamp-1 text-zinc-400">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <StockBadge level={row.original.nivelStock} stock={row.original.stock} />
    ),
  },
  {
    accessorKey: 'precioUnitario',
    header: 'Precio por Unidad',
    cell: ({ getValue }) => (
      <span className="font-mono text-sm text-zinc-200">
        {formatCurrency(getValue<number>())}
      </span>
    ),
  },
]

export function InventoryTable({
  products,
  hasSourceData,
  sorting,
  onSortingChange,
  onUpload,
  externalSortActive,
}: InventoryTableProps) {
  const table = useReactTable({
    data: products,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater
      onSortingChange(next)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: externalSortActive,
    initialState: { pagination: { pageSize: 10 } },
  })

  const emptyVariant = !hasSourceData ? 'no-data' : 'no-results'

  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <InventoryEmptyState variant={emptyVariant} onUpload={onUpload} />
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-950">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-zinc-800">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={externalSortActive}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            'inline-flex items-center gap-1.5 transition-colors',
                            externalSortActive
                              ? 'cursor-default opacity-60'
                              : 'hover:text-zinc-200',
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {!externalSortActive && (
                            sorted === 'asc' ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : sorted === 'desc' ? (
                              <ArrowDown className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                            )
                          )}
                        </button>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-zinc-900/80"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex shrink-0 items-center justify-between border-t border-zinc-800 px-6 py-3">
        <p className="text-xs text-zinc-500">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
