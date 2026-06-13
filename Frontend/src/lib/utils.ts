import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('es-MX').format(value)
}

export function formatPercent(value: number, decimals = 1) {
  return `${value.toFixed(decimals)}%`
}
