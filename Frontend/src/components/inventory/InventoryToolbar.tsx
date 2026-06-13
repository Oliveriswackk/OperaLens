import { Search, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { InventoryFilters, PriceSort, StockFilter } from '@/types/inventory'
import { setPurchaseSort } from '@/lib/inventory/filters'

interface InventoryToolbarProps {
  filters: InventoryFilters
  onChange: (filters: InventoryFilters) => void
  resultCount: number
}

const stockOptions: { value: StockFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'bajo', label: 'Stock Bajo' },
  { value: 'medio', label: 'Stock Medio' },
  { value: 'alto', label: 'Stock Alto' },
]

const priceOptions: { value: PriceSort; label: string }[] = [
  { value: 'none', label: 'Precio' },
  { value: 'asc', label: 'Menor a Mayor' },
  { value: 'desc', label: 'Mayor a Menor' },
]

export function InventoryToolbar({ filters, onChange, resultCount }: InventoryToolbarProps) {
  const update = (patch: Partial<InventoryFilters>) => onChange({ ...filters, ...patch })

  const handlePriceSort = (value: PriceSort) => {
    onChange({ ...filters, priceSort: value, purchaseSort: 'none' })
  }

  const handlePurchaseMost = () => {
    onChange({
      ...filters,
      purchaseSort: setPurchaseSort(filters.purchaseSort, 'most'),
      priceSort: 'none',
    })
  }

  const handlePurchaseLeast = () => {
    onChange({
      ...filters,
      purchaseSort: setPurchaseSort(filters.purchaseSort, 'least'),
      priceSort: 'none',
    })
  }

  return (
    <div className="shrink-0 space-y-3 border-b border-zinc-800 px-6 py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
            Filtros
          </span>

          {/* Stock filter */}
          <div className="inline-flex rounded-lg bg-zinc-900 p-0.5 ring-1 ring-zinc-800">
            {stockOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update({ stock: opt.value })}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                  filters.stock === opt.value
                    ? 'bg-primary text-white'
                    : 'text-zinc-400 hover:text-zinc-200',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mx-1 hidden h-5 w-px bg-zinc-800 sm:block" />

          {/* Price sort */}
          <select
            value={filters.priceSort}
            onChange={(e) => handlePriceSort(e.target.value as PriceSort)}
            className="h-8 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 text-xs text-zinc-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
          >
            {priceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Purchase toggles */}
          <button
            type="button"
            onClick={handlePurchaseMost}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition-colors',
              filters.purchaseSort === 'most'
                ? 'bg-primary/20 text-primary ring-primary/40'
                : 'bg-zinc-900 text-zinc-400 ring-zinc-700 hover:text-zinc-200',
            )}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Más Comprados
          </button>
          <button
            type="button"
            onClick={handlePurchaseLeast}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition-colors',
              filters.purchaseSort === 'least'
                ? 'bg-primary/20 text-primary ring-primary/40'
                : 'bg-zinc-900 text-zinc-400 ring-zinc-700 hover:text-zinc-200',
            )}
          >
            <TrendingDown className="h-3.5 w-3.5" />
            Menos Comprados
          </button>
        </div>

        {/* Search — upper right */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Buscar por ID, nombre o descripción..."
            className="h-9 w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        {resultCount} producto{resultCount !== 1 ? 's' : ''} encontrado{resultCount !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
