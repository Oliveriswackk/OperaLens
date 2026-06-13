import type {
  InventoryFilters,
  InventoryProduct,
  PriceSort,
  PurchaseSort,
  StockFilter,
} from '@/types/inventory'

/** Búsqueda estricta: coincidencia de frase completa o presencia de todos los términos */
export function strictSearch(products: InventoryProduct[], query: string): InventoryProduct[] {
  const trimmed = query.trim()
  if (!trimmed) return products

  const lower = trimmed.toLowerCase()
  const terms = lower.split(/\s+/).filter(Boolean)

  return products.filter((product) => {
    const haystack = `${product.id} ${product.nombre} ${product.descripcion}`.toLowerCase()
    if (haystack.includes(lower)) return true
    return terms.every((term) => haystack.includes(term))
  })
}

export function filterByStock(
  products: InventoryProduct[],
  stock: StockFilter,
): InventoryProduct[] {
  if (stock === 'todos') return products
  return products.filter((p) => p.nivelStock === stock)
}

export function applyInventoryFilters(
  products: InventoryProduct[],
  filters: InventoryFilters,
): InventoryProduct[] {
  let result = strictSearch(products, filters.search)
  result = filterByStock(result, filters.stock)

  if (filters.purchaseSort === 'most') {
    result = [...result].sort((a, b) => b.volumenCompras - a.volumenCompras)
  } else if (filters.purchaseSort === 'least') {
    result = [...result].sort((a, b) => a.volumenCompras - b.volumenCompras)
  } else if (filters.priceSort === 'asc') {
    result = [...result].sort((a, b) => a.precioUnitario - b.precioUnitario)
  } else if (filters.priceSort === 'desc') {
    result = [...result].sort((a, b) => b.precioUnitario - a.precioUnitario)
  }

  return result
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(value)
}

export const defaultInventoryFilters: InventoryFilters = {
  search: '',
  stock: 'todos',
  priceSort: 'none',
  purchaseSort: 'none',
}

export function setPurchaseSort(current: PurchaseSort, next: 'most' | 'least'): PurchaseSort {
  return current === next ? 'none' : next
}

export function setPriceSort(current: PriceSort, next: PriceSort): PriceSort {
  return current === next ? 'none' : next
}
