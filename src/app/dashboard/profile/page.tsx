"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  // Fetch profile data on component mount

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/private/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
