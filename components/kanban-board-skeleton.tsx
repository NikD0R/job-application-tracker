import { Card, CardContent, CardHeader } from "./ui/card";

function SkeletonCard() {
  return (
    <Card className="shadow-sm animate-pulse">
      <CardContent className="p-4 space-y-2">
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="flex gap-1 mt-2">
          <div className="h-4 w-12 rounded-full bg-muted" />
          <div className="h-4 w-16 rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonColumn({ cardCount = 3 }: { cardCount?: number }) {
  return (
    <Card className="min-w-75 shrink-0 shadow-md p-0">
      <CardHeader className="rounded-t-lg pb-3 pt-3 bg-muted animate-pulse">
        <div className="h-4 w-24 rounded bg-muted-foreground/20" />
      </CardHeader>
      <CardContent className="space-y-2 pt-4 bg-gray-50/50 dark:bg-muted/10 min-h-100 rounded-b-lg">
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </CardContent>
    </Card>
  );
}

export default function KanbanBoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      <SkeletonColumn cardCount={4} />
      <SkeletonColumn cardCount={2} />
      <SkeletonColumn cardCount={3} />
      <SkeletonColumn cardCount={1} />
      <SkeletonColumn cardCount={2} />
    </div>
  );
}
