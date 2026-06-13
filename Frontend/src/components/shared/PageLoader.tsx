import { Skeleton } from '@/components/ui/skeleton'

export function PageLoader() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-72" />
        <Skeleton className="mt-2 h-4 w-96" />
      </div>
      <Skeleton className="h-48 w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-[440px] w-full rounded-2xl" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  )
}
