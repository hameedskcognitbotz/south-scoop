import { cn } from "@/lib/utils";

const FeedSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={cn(
          "rounded-2xl border border-border bg-card/40 p-6",
          i === 1 ? "md:col-span-2 h-[300px]" : "h-[220px]"
        )}>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-16 rounded-md bg-foreground/5" />
          </div>
          <div className="h-8 w-full rounded-md bg-foreground/10 mb-3" />
          <div className="h-8 w-2/3 rounded-md bg-foreground/10 mb-6" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-foreground/5" />
            <div className="h-4 w-5/6 rounded-md bg-foreground/5" />
          </div>
        </div>
      ))}
    </div>
    <aside className="hidden lg:block w-80 space-y-12">
      <div className="h-64 rounded-2xl border border-border bg-card/40 p-8 space-y-4">
        <div className="h-6 w-32 rounded-md bg-foreground/10" />
        <div className="h-4 w-full rounded-md bg-foreground/5" />
        <div className="h-10 w-full rounded-xl bg-foreground/10" />
      </div>
    </aside>
  </div>
);

export default FeedSkeleton;
