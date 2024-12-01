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

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className={`block w-full py-2 px-4 rounded-lg transition-colors duration-300 ${linkClass}`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
