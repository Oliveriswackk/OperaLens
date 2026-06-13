import { Download, RefreshCw, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InventoryPageHeaderProps {
  onExport?: () => void
  onRefresh?: () => void
  onUpload?: () => void
}

export function InventoryPageHeader({ onExport, onRefresh, onUpload }: InventoryPageHeaderProps) {
  return (
    <div className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-zinc-800 px-6 py-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Inventario</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Consulta y administra los productos procesados por OperaLens.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          Exportar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          Actualizar
        </Button>
        <Button size="sm" onClick={onUpload}>
          <Upload className="h-4 w-4" />
          Subir Archivo
        </Button>
      </div>
    </div>
  )
}
