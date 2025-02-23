import Image from "next/image";
import TypewriterEffect from "./TypewriterEffect";
import SocialButton from "./SocialButton";

export default function ProfileSection({
  isDarkMode,
  profile,
}: {
  isDarkMode: boolean;
  profile: any;
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
            <Image
              src={profile.avatar || "/placeholder.svg?height=96&width=96"}
              alt={profile.user.username}
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
            {profile.user.username}
          </h1>
          <TypewriterEffect
            text={profile.bio || "Hello, I'm a bio links user!"}
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } text-sm transition-colors duration-300`}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          {profile.socialLinks.map((link: any) => (
            <SocialButton
              key={link.id}
              href={link.url}
              platform={link.platform}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
