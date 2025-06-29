export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-800 rounded-lg mb-6 w-1/3"></div>

          {/* Content Grid Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-900/50 rounded-lg p-6 border border-neutral-800"
              >
                <div className="h-4 bg-neutral-700 rounded mb-3 w-3/4"></div>
                <div className="h-3 bg-neutral-800 rounded mb-2 w-full"></div>
                <div className="h-3 bg-neutral-800 rounded mb-4 w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-neutral-700 rounded w-16"></div>
                  <div className="h-6 bg-neutral-700 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
