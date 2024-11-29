export default function ViewCounter({
  viewCount,
  isDarkMode,
}: {
  viewCount: number;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`text-center text-sm ${
        isDarkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      <span className="inline-flex items-center gap-1">
        <span>👁</span> {viewCount} views
      </span>
    </div>
  );
}
