"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await fetch("/api/private/profile");
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  const handleToggleVisibility = async () => {
    const response = await fetch("/api/private/profile/visibility", {
      method: "POST",
    });
    if (response.ok) {
      fetchProfile();
    }
  };

  const handleToggleSpotify = async () => {
    if (profile.isSpotifyEnabled) {
      const response = await fetch("/api/private/profile/spotify", {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProfile();
      }
    } else {
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
      }&response_type=code&redirect_uri=${encodeURIComponent(
        process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!
      )}&state=${profile.id}&scope=user-read-currently-playing`;
      router.push(spotifyAuthUrl);
    }
  };

  const handleToggleDiscord = async () => {
    const response = await fetch("/api/private/profile/discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isEnabled: !profile.isDiscordEnabled }),
    });
    if (response.ok) {
      fetchProfile();
    }
  };

  const handleDiscordIdChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const response = await fetch("/api/private/profile/discord", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discordId: e.target.value }),
    });
    if (response.ok) {
      fetchProfile();
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={profile.isPublic}
            onCheckedChange={handleToggleVisibility}
            id="public-mode"
          />
          <label htmlFor="public-mode">
            {profile.isPublic ? "Public Mode" : "Private Mode"}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={profile.isSpotifyEnabled}
            onCheckedChange={handleToggleSpotify}
            id="spotify-integration"
          />
          <label htmlFor="spotify-integration">
            {profile.isSpotifyEnabled
              ? "Disconnect Spotify"
              : "Connect Spotify"}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={profile.isDiscordEnabled}
            onCheckedChange={handleToggleDiscord}
            id="discord-integration"
          />
          <label htmlFor="discord-integration">
            {profile.isDiscordEnabled ? "Disable Discord" : "Enable Discord"}
          </label>
        </div>
        {profile.isDiscordEnabled && (
          <div>
            <label
              htmlFor="discord-id"
              className="block text-sm font-medium text-gray-700"
            >
              Discord ID
            </label>
            <Input
              id="discord-id"
              value={profile.discordId || ""}
              onChange={handleDiscordIdChange}
              placeholder="Enter your Discord ID"
            />
          </div>
        )}
      </div>
    </div>
  );
}
