"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Twitch,
  Youtube,
  Gamepad2Icon as GamepadTwo,
  LinkIcon,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TypewriterEffect from "@/components/TypewriterEffect";

export default function BioLinks({
  initialViewCount,
}: {
  initialViewCount: number;
}) {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [isPlaying, setIsPlaying] = useState(false);
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
      const response = await fetch("/api/increment-view-count", {
        method: "POST",
      });
      if (response.ok) {
        const { count } = await response.json();
        setViewCount(count);
      }
    };
    incrementCount();
  }, []);

  const bgColor = isDarkMode ? "bg-[#0a0014]" : "bg-[#f0f0f5]";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

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
        {/* Profile Section */}
        <div
          className={`${cardBg} backdrop-blur-xl rounded-3xl p-8 ${cardBorder} border transition-colors duration-300`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-70 animate-pulse`}
              ></div>
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  alt="Nuiqka"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center">
              <h1
                className={`text-2xl font-bold ${textColor} mb-2 transition-colors duration-300`}
              >
                Nuiqka
              </h1>
              <TypewriterEffect
                text="Hello i'm your futur babe, or just Nuiqka."
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } text-sm transition-colors duration-300`}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <SocialButton
                href="#"
                icon={<Twitch className="w-5 h-5" />}
                isDarkMode={isDarkMode}
              />
              <SocialButton
                href="#"
                icon={<Youtube className="w-5 h-5" />}
                isDarkMode={isDarkMode}
              />
              <SocialButton
                href="#"
                icon={<GamepadTwo className="w-5 h-5" />}
                isDarkMode={isDarkMode}
              />
              <SocialButton
                href="#"
                icon={<GamepadTwo className="w-5 h-5" />}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>

        {/* Discord Card */}
        <div
          className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border transition-colors duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Discord Avatar"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={textColor}>@nuiqka</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                    ✓
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Nothing is the real Truth.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className={`${
                isDarkMode
                  ? "bg-purple-500/10 border-purple-500/20 text-white hover:bg-purple-500/20"
                  : "bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200"
              } transition-colors duration-300`}
            >
              Add on Discord
            </Button>
          </div>
        </div>

        {/* Links Section */}
        <Link href="#" className="block">
          <div
            className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border flex items-center justify-between hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center gap-3">
              <LinkIcon
                className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <span className={textColor}>My AI artworks</span>
            </div>
            <span
              className={isDarkMode ? "text-purple-400" : "text-purple-600"}
            >
              →
            </span>
          </div>
        </Link>

        {/* Music Player */}
        <div
          className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border transition-colors duration-300`}
        >
          <div className={`${textColor} mb-4`}>Boom Boom &lt;3</div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=64&width=64"
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

        {/* View Counter */}
        <div
          className={`text-center text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <span>👁</span> {viewCount} views
          </span>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  href,
  icon,
  isDarkMode,
}: {
  href: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
}) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="icon"
        className={`w-10 h-10 rounded-xl ${
          isDarkMode
            ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
            : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-800"
        } transition-colors duration-300`}
      >
        {icon}
      </Button>
    </Link>
  );
}
