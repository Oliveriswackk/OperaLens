import { HomeExecutiveSummary } from '@/components/home/HomeExecutiveSummary'
import { BehaviorPatternPanel } from '@/components/home/BehaviorPatternPanel'
import { HomeAlertPanel } from '@/components/home/HomeAlertPanel'
import { HomeQuickActions } from '@/components/home/HomeQuickActions'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardData } from '@/hooks/useDashboardData'

function HomePageLoader() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <Skeleton className="h-[88px] shrink-0 rounded-2xl" />
      <div className="grid min-h-0 flex-1 grid-cols-12 gap-3">
        <Skeleton className="col-span-8 rounded-2xl" />
        <Skeleton className="col-span-4 rounded-2xl" />
      </div>
      <div className="grid shrink-0 grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboardData()

  if (isLoading || !data) return <HomePageLoader />

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <HomeExecutiveSummary summary={data.summary} />

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-3 overflow-hidden">
        <div className="col-span-12 min-h-0 lg:col-span-8">
          <BehaviorPatternPanel insights={data.behaviorInsights} />
        </div>
        <div className="col-span-12 min-h-0 lg:col-span-4">
          <HomeAlertPanel alerts={data.alerts} />
        </div>
      </div>

      <HomeQuickActions />
    </div>
  )
}
