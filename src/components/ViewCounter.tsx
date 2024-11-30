interface ViewCounterProps {
  viewCount: number;
  isDarkMode: boolean;
}

export default function ViewCounter({
  viewCount,
  isDarkMode,
}: ViewCounterProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`absolute top-4 right-4 ${textColor} text-sm`}>
      <span className="inline-flex items-center gap-1">
        <span>👁</span> {viewCount} views
      </span>
    </div>
  );
}
