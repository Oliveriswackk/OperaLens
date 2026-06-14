import { Link } from 'react-router-dom'
import { UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/EmptyState'

interface NoAnalysisStateProps {
  title?: string
}

export function NoAnalysisState({
  title = 'No hay datos procesados',
}: NoAnalysisStateProps) {
  return (
    <EmptyState
      icon={UploadCloud}
      title={title}
      description="Sube un Excel de movimientos de materiales en Cargar Excel para ver esta sección."
      action={
        <Link to="/cargar">
          <Button>
            <UploadCloud className="h-4 w-4" /> Cargar Excel
          </Button>
        </Link>
      }
    />
  )
}
