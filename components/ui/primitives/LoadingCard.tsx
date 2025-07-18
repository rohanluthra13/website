interface LoadingCardProps {
  className?: string;
  lines?: number;
  showHeader?: boolean;
  headerWidth?: string;
}

export default function LoadingCard({ 
  className = '', 
  lines = 3, 
  showHeader = true,
  headerWidth = 'w-32'
}: LoadingCardProps) {
  return (
    <div className={`bg-surface border border-border rounded-lg p-6 animate-pulse ${className}`}>
      {showHeader && (
        <div className={`h-6 bg-gray-200 rounded ${headerWidth} mb-4`}></div>
      )}
      <div className="space-y-3">
        {[...Array(lines)].map((_, i) => (
          <div 
            key={i} 
            className={`h-4 bg-gray-200 rounded ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
}