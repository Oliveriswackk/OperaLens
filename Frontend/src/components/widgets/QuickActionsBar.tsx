import type { LucideIcon } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'

export interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  onClick?: () => void
}

interface QuickActionsBarProps {
  actions: QuickAction[]
}

export function QuickActionsBar({ actions }: QuickActionsBarProps) {
  return (
    <Card>
      <CardHeader title="Acciones Rápidas" />
      <div className="flex flex-wrap gap-8">
        {actions.map(({ id, label, icon: Icon, onClick }) => (
          <button
            key={id}
            onClick={onClick}
            className="group flex w-24 flex-col items-center gap-2.5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/5 transition-colors group-hover:border-primary group-hover:bg-primary/10">
              <Icon className="h-5.5 w-5.5 text-primary" />
            </span>
            <span className="text-center text-xs font-medium text-zinc-600 group-hover:text-zinc-900">
              {label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  )
}
