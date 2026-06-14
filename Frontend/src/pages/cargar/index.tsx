import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, FileSpreadsheet, Loader2, UploadCloud } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'
import { useUpload } from '@/hooks/useUpload'
import { ApiError } from '@/lib/api/client'
import { formatCurrency, formatNumber } from '@/lib/utils'

const COLUMNAS_ESPERADAS = ['fecha', 'tipo', 'material', 'cantidad', 'costo_unitario', 'etapa']

export default function CargarPage() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const upload = useUpload()

  const handleFile = (f: File | undefined) => {
    if (f) {
      setFile(f)
      upload.reset()
    }
  }

  const handleUpload = () => {
    if (!file) return
    upload.mutate(file, {
      onSuccess: (data) => {
        navigate('/', { state: { analisisId: data.analisis_id } })
      },
    })
  }

  const errorMessage =
    upload.error instanceof ApiError
      ? upload.error.status === 422
        ? `El archivo no se pudo procesar: ${upload.error.message}`
        : upload.error.status === 409
          ? 'Este archivo ya fue cargado anteriormente. Los datos no se duplicaron.'
          : upload.error.message
      : upload.error?.message

  return (
    <div className="mx-auto w-full max-w-3xl p-2">
      <PageHeader
        title="Cargar análisis"
        description="Sube tu Excel de movimientos de materiales para detectar pérdidas operativas ocultas."
      />

      <Card className="flex flex-col gap-6">
        <label
          data-lupin-target="upload-zone"
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFile(e.dataTransfer.files?.[0])
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-zinc-200 hover:border-primary/40'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <UploadCloud className="h-7 w-7 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Arrastra tu archivo aquí o haz clic para seleccionar
            </p>
            <p className="mt-1 text-xs text-zinc-500">Formatos aceptados: .xlsx, .xls, .csv</p>
          </div>
        </label>

        {file && (
          <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 px-4 py-3">
            <FileSpreadsheet className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-800">{file.name}</p>
              <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button size="sm" onClick={handleUpload} disabled={upload.isPending}>
              {upload.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analizando…
                </>
              ) : (
                'Analizar'
              )}
            </Button>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div>
              <p className="text-sm font-semibold text-danger">No se pudo completar la carga</p>
              <p className="mt-0.5 text-xs text-zinc-600">{errorMessage}</p>
            </div>
          </div>
        )}

        {upload.isSuccess && upload.data && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="text-xs text-zinc-700">
              <p className="text-sm font-semibold text-emerald-700">Análisis completado</p>
              <p className="mt-0.5">
                {formatNumber(upload.data.registros)} registros procesados · pérdidas detectadas:{' '}
                {formatCurrency(upload.data.perdidas_operativas.total)} ·{' '}
                {upload.data.anomalias.length} anomalías
              </p>
            </div>
          </div>
        )}

        <div data-lupin-target="upload-columns" className="rounded-xl bg-zinc-50 px-4 py-3">
          <p className="text-xs font-semibold text-zinc-600">Columnas esperadas en el archivo</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {COLUMNAS_ESPERADAS.map((col) => (
              <span
                key={col}
                className="rounded-md bg-white px-2 py-1 font-mono text-[11px] text-zinc-600 ring-1 ring-zinc-200"
              >
                {col}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
