import Image from "next/image";
import TypewriterEffect from "./TypewriterEffect";
import SocialButton from "./SocialButton";
import { Twitch, Youtube, Gamepad2Icon as GamepadTwo } from "lucide-react";

export default function ProfileSection({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) {
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  return (
    <div
      className={`${cardBg} backdrop-blur-xl rounded-3xl p-8 ${cardBorder} border transition-colors duration-300`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-70 animate-pulse`}
          ></div>
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20">
            <img
              src="https://avatars.githubusercontent.com/u/169302941?v=4"
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
  );
}
