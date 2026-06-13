export type StockLevel = 'bajo' | 'medio' | 'alto'

export interface InventoryProduct {
  id: string
  nombre: string
  descripcion: string
  stock: number
  precioUnitario: number
  volumenCompras: number
  nivelStock: StockLevel
}

export interface InventoryListResponse {
  products: InventoryProduct[]
  total: number
}

export type StockFilter = 'todos' | 'bajo' | 'medio' | 'alto'

export type PriceSort = 'none' | 'asc' | 'desc'

export type PurchaseSort = 'none' | 'most' | 'least'

export interface InventoryFilters {
  search: string
  stock: StockFilter
  priceSort: PriceSort
  purchaseSort: PurchaseSort
}
