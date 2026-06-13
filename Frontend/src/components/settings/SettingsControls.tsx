import { cn } from '@/lib/utils'

interface OptionGroupProps<T extends string> {
  label: string
  description?: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}

export function OptionGroup<T extends string>({
  label,
  description,
  value,
  options,
  onChange,
}: OptionGroupProps<T>) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
        {description && <p className="mt-0.5 text-xs text-zinc-500">{description}</p>}
      </div>
      <div className="inline-flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
              value === opt.value
                ? 'bg-white text-primary shadow-sm dark:bg-zinc-700 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

interface SelectFieldProps {
  label: string
  description?: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function SelectField({ label, description, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
        {description && <p className="mt-0.5 text-xs text-zinc-500">{description}</p>}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface ToggleRowProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
        {description && <p className="mt-0.5 text-xs text-zinc-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200',
          checked ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-600',
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200',
            checked ? 'translate-x-5.5' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  )
}

interface SettingsCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function SettingsCard({ title, subtitle, children }: SettingsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card dark:bg-zinc-900">
      <div className="mb-2">
        <h3 className="text-sm font-bold tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      <div className="divide-y divide-zinc-50 dark:divide-zinc-800">{children}</div>
    </div>
  )
}
