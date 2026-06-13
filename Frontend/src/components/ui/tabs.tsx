import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabItem[]
  value: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex items-center gap-1 rounded-xl bg-zinc-100 p-1', className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
            value === tab.id
              ? 'bg-white text-primary shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
