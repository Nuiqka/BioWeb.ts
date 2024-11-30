import ProfileSection from "@/components/ProfileSection";
import SocialLinks from "@/components/SocialLinks";
import CustomLinks from "@/components/CustomLinks";
import MusicPlayer from "@/components/MusicPlayer";
import ViewCounter from "@/components/ViewCounter";
import DiscordCard from "@/components/DiscordCard";
import Footer from "@/components/Footer";
import { getProfile } from "@/services/profileService";
import { getSocialLinks, getCustomLinks } from "@/services/linkService";
/*import {
  getCurrentTrack,
  getDefaultTrack,
} from "@/services/musicPlayerService";*/
import { getUniqueViewCount } from "@/services/viewService";

export default async function Home() {
  const [
    profile,
    //socialLinks,
    customLinks,
    //currentTrack,
    //defaultTrack,
    viewCount,
  ] = await Promise.all([
    getProfile(),
    //getSocialLinks(),
    getCustomLinks(),
    //getCurrentTrack(),
    //getDefaultTrack(),
    getUniqueViewCount(),
  ]);

  const isDarkMode = true;

  const bgColor = isDarkMode ? "bg-[#0a0014]" : "bg-[#f0f0f5]";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  return (
    <div
      className={`min-h-screen ${bgColor} flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300`}
    >
      <ViewCounter viewCount={viewCount} isDarkMode={isDarkMode} />
      <div className="max-w-md w-full space-y-6">
        <ProfileSection profile={profile} isDarkMode={isDarkMode} />
        {profile.discordId && (
          <DiscordCard discordId={profile.discordId} isDarkMode={isDarkMode} />
        )}
        {/**<SocialLinks links={socialLinks} isDarkMode={isDarkMode} />*/}
        <CustomLinks links={customLinks} isDarkMode={isDarkMode} />
        {/**<MusicPlayer
          currentTrack={currentTrack}
          defaultTrack={defaultTrack}
          isDarkMode={isDarkMode}
        />  */}
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
