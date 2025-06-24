
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ContentSkeletonProps {
  type?: 'card' | 'list' | 'player' | 'tabs';
  count?: number;
}

export const ContentSkeleton = ({ type = 'card', count = 3 }: ContentSkeletonProps) => {
  const renderCardSkeleton = () => (
    <Card className="border-border/40">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="flex space-x-2 mt-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderListSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border border-border/40">
          <Skeleton className="w-10 h-10 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      ))}
    </div>
  );

  const renderPlayerSkeleton = () => (
    <div className="bg-card/50 backdrop-blur border-t border-border/40 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-20 h-2 rounded-full" />
        </div>
      </div>
    </div>
  );

  const renderTabsSkeleton = () => (
    <div className="space-y-6">
      {/* Tabs skeleton */}
      <div className="flex flex-wrap gap-2 p-1 bg-card/50 rounded-lg border border-border/40">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-md" />
        ))}
      </div>
      {/* Content skeleton */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );

  switch (type) {
    case 'card':
      return (
        <div className="space-y-6">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i}>{renderCardSkeleton()}</div>
          ))}
        </div>
      );
    case 'list':
      return renderListSkeleton();
    case 'player':
      return renderPlayerSkeleton();
    case 'tabs':
      return renderTabsSkeleton();
    default:
      return renderCardSkeleton();
  }
};
