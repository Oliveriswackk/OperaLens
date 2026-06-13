import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InventoryEmptyStateProps {
  variant: 'no-data' | 'no-results'
  onUpload?: () => void
  className?: string
}

export function InventoryEmptyState({ variant, onUpload, className }: InventoryEmptyStateProps) {
  const isNoData = variant === 'no-data'

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-16 text-center',
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
        <Upload className="h-6 w-6 text-primary" />
      </div>
      <p className="text-sm font-medium text-zinc-200">
        {isNoData
          ? 'No existen productos cargados actualmente.'
          : 'No se encontraron productos con ese criterio.'}
      </p>
      {isNoData && (
        <Button className="mt-4" size="sm" onClick={onUpload}>
          <Upload className="h-4 w-4" />
          Subir Archivo
        </Button>
      )}
    </div>
  )
}
