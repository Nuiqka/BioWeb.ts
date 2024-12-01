import ProfileSection from "@/components/ProfileSection";
import SocialLinks from "@/components/SocialLinks";
import CustomLinks from "@/components/CustomLinks";
import MusicPlayer from "@/components/MusicPlayer";
import ViewCounter from "@/components/ViewCounter";
import DiscordCard from "@/components/DiscordCard";
import Footer from "@/components/Footer";
import { getProfile } from "@/services/profileService";
import { getSocialLinks, getCustomLinks } from "@/services/linkService";
import {
  getCurrentTrack,
  getDefaultTrack,
} from "@/services/musicPlayerService";
import { getViewStats } from "@/services/viewService";

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const [socialLinks, customLinks, viewStats] = await Promise.all([
    getSocialLinks(profile.id),
    getCustomLinks(profile.id),
    getViewStats(profile.id),
  ]);

  const currentTrack = profile.isSpotifyEnabled
    ? await getCurrentTrack(profile.id)
    : null;
  const defaultTrack = await getDefaultTrack(profile.id);

  const isDarkMode = true; // You might want to make this dynamic based on user preference

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-700 to-blue-700 flex items-center justify-center p-4 relative">
      <ViewCounter
        viewCount={viewStats.uniqueViews}
        isDarkMode={isDarkMode}
        profileId={profile.id}
      />
      <div className="max-w-md w-full space-y-6">
        <ProfileSection profile={profile} isDarkMode={isDarkMode} />
        <SocialLinks links={socialLinks} isDarkMode={isDarkMode} />
        <CustomLinks links={customLinks} isDarkMode={isDarkMode} />
        {(profile.isSpotifyEnabled || defaultTrack) && (
          <MusicPlayer
            currentTrack={currentTrack}
            defaultTrack={defaultTrack}
            isDarkMode={isDarkMode}
          />
        )}
        {profile.isDiscordEnabled && profile.discordId && (
          <DiscordCard discordId={profile.discordId} isDarkMode={isDarkMode} />
        )}
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
