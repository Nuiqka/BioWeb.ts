import Link from "next/link";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const textColor = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <footer className={`mt-8 text-center ${textColor} text-sm`}>
      <p>&copy; {currentYear} Nuiqka. All rights reserved.</p>
      <p className="mt-2">
        Created with v0 | Next.js | React | Tailwind CSS | Prisma
      </p>
      <Link
        href="/admin"
        className="mt-4 inline-block opacity-50 hover:opacity-100 transition-opacity"
      >
        Dashboard
      </Link>
    </footer>
  );
}
