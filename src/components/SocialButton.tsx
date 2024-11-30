import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Twitch,
  Youtube,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

const platformIcons: { [key: string]: React.ElementType } = {
  twitch: Twitch,
  youtube: Youtube,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
};

export default function SocialButton({
  href,
  platform,
  isDarkMode,
}: {
  href: string;
  platform: string;
  isDarkMode: boolean;
}) {
  const Icon = platformIcons[platform.toLowerCase()] || Github;

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
        <Icon className="w-5 h-5" />
      </Button>
    </Link>
  );
}
