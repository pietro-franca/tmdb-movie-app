export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-64 bg-gray-800 animate-pulse rounded"
        />
      ))}
    </div>
  );
}
