"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [customLinks, setCustomLinks] = useState<any[]>([]);
  const [musicPlayer, setMusicPlayer] = useState<any>(null);
  const [viewStats, setViewStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [
        profileData,
        socialLinksData,
        customLinksData,
        musicPlayerData,
        viewStatsData,
      ] = await Promise.all([
        fetch("/api/admin/profile").then((res) => res.json()),
        fetch("/api/admin/social-links").then((res) => res.json()),
        fetch("/api/admin/custom-links").then((res) => res.json()),
        fetch("/api/admin/music-player").then((res) => res.json()),
        fetch("/api/admin/view-stats").then((res) => res.json()),
      ]);
      setProfile(profileData);
      setSocialLinks(socialLinksData);
      setCustomLinks(customLinksData);
      setMusicPlayer(musicPlayerData);
      setViewStats(viewStatsData);
    };
    fetchData();
  }, []);

  const onSubmitProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
    }
  };

  const onSubmitSocialLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/admin/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const newLink = await response.json();
      setSocialLinks([...socialLinks, newLink]);
    }
  };

  const onSubmitCustomLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/admin/custom-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const newLink = await response.json();
      setCustomLinks([...customLinks, newLink]);
    }
  };

  const onSubmitMusicPlayer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/admin/music-player", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const updatedMusicPlayer = await response.json();
      setMusicPlayer(updatedMusicPlayer);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <form onSubmit={onSubmitProfile} className="space-y-4">
          <Input
            name="avatar"
            defaultValue={profile.avatar}
            placeholder="Avatar URL"
          />
          <Input
            name="banner"
            defaultValue={profile.banner}
            placeholder="Banner URL"
          />
          <Textarea name="bio" defaultValue={profile.bio} placeholder="Bio" />
          <Input
            name="discordId"
            defaultValue={profile.discordId}
            placeholder="Discord ID"
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Social Links</h2>
        <ul className="mb-4">
          {socialLinks.map((link) => (
            <li key={link.id}>
              {link.platform}: {link.url}
            </li>
          ))}
        </ul>
        <form onSubmit={onSubmitSocialLink} className="space-y-4">
          <Input name="platform" placeholder="Platform" />
          <Input name="icon" placeholder="Icon" />
          <Input name="url" placeholder="URL" />
          <Button type="submit">Add Social Link</Button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Custom Links</h2>
        <ul className="mb-4">
          {customLinks.map((link) => (
            <li key={link.id}>
              {link.title}: {link.url}
            </li>
          ))}
        </ul>
        <form onSubmit={onSubmitCustomLink} className="space-y-4">
          <Input name="title" placeholder="Title" />
          <Input name="url" placeholder="URL" />
          <Button type="submit">Add Custom Link</Button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Music Player</h2>
        <form onSubmit={onSubmitMusicPlayer} className="space-y-4">
          <Input
            name="type"
            defaultValue={musicPlayer?.type}
            placeholder="Type (TRACK or PLAYLIST)"
          />
          <Input
            name="spotifyId"
            defaultValue={musicPlayer?.spotifyId}
            placeholder="Spotify ID"
          />
          <Button type="submit">Update Music Player</Button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">View Stats</h2>
        {viewStats && (
          <div>
            <p>Unique Views: {viewStats.uniqueViews}</p>
            <p>Total Views: {viewStats.totalViews}</p>
          </div>
        )}
      </section>
    </div>
  );
}
