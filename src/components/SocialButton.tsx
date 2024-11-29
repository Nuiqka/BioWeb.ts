import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SocialButton({
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
