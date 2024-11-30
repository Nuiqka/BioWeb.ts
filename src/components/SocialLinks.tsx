import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SocialLink {
  id: number;
  platform: string;
  icon: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  isDarkMode: boolean;
}

export default function SocialLinks({ links, isDarkMode }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {links.map((link) => (
        <Link key={link.id} href={link.url} passHref>
          <Button
            variant="outline"
            size="icon"
            className={`w-10 h-10 rounded-xl ${
              isDarkMode
                ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-800"
            } transition-colors duration-300`}
          >
            <span className="sr-only">{link.platform}</span>
            <i className={link.icon} aria-hidden="true"></i>
          </Button>
        </Link>
      ))}
    </div>
  );
}
