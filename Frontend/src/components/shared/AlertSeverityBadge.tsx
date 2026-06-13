import { Badge } from '@/components/ui/badge'
import type { AlertSeverity } from '@/types/dashboard'

const config: Record<AlertSeverity, { label: string; variant: 'danger' | 'warning' | 'info' | 'neutral' }> = {
  critical: { label: 'Crítica', variant: 'danger' },
  high: { label: 'Alta', variant: 'warning' },
  medium: { label: 'Media', variant: 'info' },
  low: { label: 'Baja', variant: 'neutral' },
}

export function AlertSeverityBadge({ severity }: { severity: AlertSeverity }) {
  const { label, variant } = config[severity]
  return <Badge variant={variant}>{label}</Badge>
}
