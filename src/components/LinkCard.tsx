import Link from "next/link";
import { LinkIcon } from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
  isDarkMode: boolean;
}

export default function LinkCard({ title, url, isDarkMode }: LinkCardProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  return (
    <Link href={url} className="block">
      <div
        className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border flex items-center justify-between hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105`}
      >
        <div className="flex items-center gap-3">
          <LinkIcon
            className={`w-5 h-5 ${
              isDarkMode ? "text-purple-400" : "text-purple-600"
            }`}
          />
          <span className={textColor}>{title}</span>
        </div>
        <span className={isDarkMode ? "text-purple-400" : "text-purple-600"}>
          →
        </span>
      </div>
    </Link>
  );
}
