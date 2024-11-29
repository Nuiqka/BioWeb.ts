"use client";

import { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";
import DiscordCard from "./DiscordCard";
import LinkCard from "./LinkCard";
import MusicPlayer from "./MusicPlayer";
import ViewCounter from "./ViewCounter";

export default function BioLinks({
  initialViewCount,
}: {
  initialViewCount: number;
}) {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const incrementCount = async () => {
      const response = await fetch("/api/views", { method: "POST" });
      if (response.ok) {
        const { count } = await response.json();
        setViewCount(count);
      }
    };
    incrementCount();
  }, []);

  const bgColor = isDarkMode ? "bg-[#0a0014]" : "bg-[#f0f0f5]";

  return (
    <div
      className={`min-h-screen ${bgColor} flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-64 ${
            isDarkMode
              ? "bg-gradient-to-b from-blue-500/20 to-transparent"
              : "bg-gradient-to-b from-blue-200/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-full h-64 ${
            isDarkMode
              ? "bg-gradient-to-t from-purple-500/20 to-transparent"
              : "bg-gradient-to-t from-purple-200/20 to-transparent"
          }`}
        ></div>
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        <ProfileSection isDarkMode={isDarkMode} />
        <DiscordCard isDarkMode={isDarkMode} />
        <LinkCard isDarkMode={isDarkMode} />
        <MusicPlayer isDarkMode={isDarkMode} />
        <ViewCounter viewCount={viewCount} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
