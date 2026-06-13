import { Filter } from 'lucide-react'
import { Tabs, type TabItem } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface FilterBarProps {
  tabs: TabItem[]
  value: string
  onChange: (id: string) => void
  label?: string
  className?: string
}

export function FilterBar({ tabs, value, onChange, label = 'Filtrar', className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
        <Filter className="h-3.5 w-3.5" />
        {label}
      </span>
      <Tabs tabs={tabs} value={value} onChange={onChange} />
    </div>
  )
}
