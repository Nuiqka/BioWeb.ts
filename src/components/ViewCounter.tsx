"use client";

import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";

interface ViewCounterProps {
  profileId: string;
  isDarkMode: boolean;
}

export default function ViewCounter({
  profileId,
  isDarkMode,
}: ViewCounterProps) {
  const { data, isLoading, isError, mutate } = useApi<{ uniqueViews: number }>(
    `/api/public/views?profileId=${profileId}`
  );

  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch("/api/public/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId }),
        });
        mutate();
      } catch (err) {
        console.error("Failed to increment view:", err);
      }
    };

    incrementView();
  }, [profileId, mutate]);

  if (isLoading) return null;
  if (isError)
    return (
      <div className="text-red-500 text-sm">Failed to load view count</div>
    );

  return (
    <div
      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
    >
      <span className="inline-flex items-center gap-1">
        <span>👁</span> {data?.uniqueViews || 0} views
      </span>
    </div>
  );
}
