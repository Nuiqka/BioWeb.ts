import { useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  MoreHorizontal,
} from "lucide-react";

export default function MusicPlayer({ isDarkMode }: { isDarkMode: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  return (
    <div
      className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border transition-colors duration-300`}
    >
      <div className={`${textColor} mb-4`}>Boom Boom &lt;3</div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/169302941?v=4"
            alt="Album Cover"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className={`text-sm ${textColor} mb-1`}>
            Push Up - Main Edit - Creeds
          </div>
          <div
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            This Is The Life - LIZOT, KYANU
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
            <span
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              00:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
