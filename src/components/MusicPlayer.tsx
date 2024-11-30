"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  MoreHorizontal,
} from "lucide-react";

interface Track {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  isCurrentlyPlaying: boolean;
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  defaultTrack: Track | null;
  isDarkMode: boolean;
}

export default function MusicPlayer({
  currentTrack,
  defaultTrack,
  isDarkMode,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const track = currentTrack || defaultTrack;

  useEffect(() => {
    setIsPlaying(currentTrack?.isCurrentlyPlaying || false);
  }, [currentTrack]);

  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  if (!track) return null;

  return (
    <div
      className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border transition-colors duration-300`}
    >
      <div className={`${textColor} mb-4`}>
        {currentTrack ? "Now Playing" : "Featured Track"}
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <Image
            src={track.albumArt}
            alt={`${track.album} cover`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className={`text-sm ${textColor} mb-1`}>{track.name}</div>
          <div
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {track.artist}
          </div>
          <div className="mt-2 flex items-center gap-4">
            <SkipBack
              className={`w-4 h-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-8 h-8 rounded-full ${
                isDarkMode ? "bg-white" : "bg-gray-800"
              } flex items-center justify-center transition-colors duration-300`}
            >
              {isPlaying ? (
                <Pause
                  className={`w-4 h-4 ${
                    isDarkMode ? "text-black" : "text-white"
                  }`}
                />
              ) : (
                <Play
                  className={`w-4 h-4 ${
                    isDarkMode ? "text-black" : "text-white"
                  }`}
                  fill={isDarkMode ? "black" : "white"}
                />
              )}
            </button>
            <SkipForward
              className={`w-4 h-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <Volume2
              className={`w-4 h-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <MoreHorizontal
              className={`w-4 h-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
