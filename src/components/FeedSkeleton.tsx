const FeedSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-16 rounded-lg shimmer" />
          {i === 1 && <div className="h-6 w-20 rounded-lg shimmer" />}
        </div>
        <div className="h-5 w-full rounded-md shimmer mb-2" />
        <div className="h-5 w-4/5 rounded-md shimmer mb-2" />
        <div className="h-4 w-full rounded-md shimmer mb-4" />
        <div className="h-3.5 w-24 rounded-md shimmer" />
      </div>
    ))}
  </div>
);

export default FeedSkeleton;
