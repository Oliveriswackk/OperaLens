import { cn } from '@/lib/utils'

interface AvatarProps {
  initials: string
  className?: string
}

export function Avatar({ initials, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white',
        className,
      )}
    >
      {initials}
    </div>
  )
}
