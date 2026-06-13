import { Badge } from '@/components/ui/badge'
import type { Severidad } from '@/types'

const config: Record<Severidad, { label: string; variant: 'danger' | 'warning' | 'info' }> = {
  alta: { label: 'ALTA', variant: 'danger' },
  media: { label: 'MEDIA', variant: 'warning' },
  baja: { label: 'BAJA', variant: 'info' },
}

export function SeverityBadge({ severidad }: { severidad: Severidad }) {
  const { label, variant } = config[severidad]
  return <Badge variant={variant}>{label}</Badge>
}
