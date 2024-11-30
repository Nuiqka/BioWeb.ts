import { LinkIcon } from "lucide-react";
import Link from "next/link";

interface CustomLink {
  id: number;
  title: string;
  url: string;
}

interface CustomLinksProps {
  links: CustomLink[];
  isDarkMode: boolean;
}

export default function CustomLinks({ links, isDarkMode }: CustomLinksProps) {
  const linkClass = isDarkMode
    ? "bg-white/10 hover:bg-white/20 text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-800";

  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener"
          className="block"
        >
          <div
            className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border flex items-center justify-between hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center gap-3">
              <LinkIcon
                className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <span className={textColor}>{link.title}</span>
            </div>
            <span
              className={isDarkMode ? "text-purple-400" : "text-purple-600"}
            >
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
