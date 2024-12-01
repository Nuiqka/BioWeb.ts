"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SocialLinksPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [newLink, setNewLink] = useState({ platform: "", icon: "", url: "" });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const response = await fetch("/api/private/social-links");
    if (response.ok) {
      const data = await response.json();
      setLinks(data);
    }
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/private/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLink),
    });
    if (response.ok) {
      setNewLink({ platform: "", icon: "", url: "" });
      fetchLinks();
    }
  };

  const handleDeleteLink = async (id: number) => {
    const response = await fetch(`/api/private/social-links/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchLinks();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Social Links</h1>
      <form onSubmit={handleAddLink} className="mb-4 space-y-2">
        <Input
          placeholder="Platform"
          value={newLink.platform}
          onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
        />
        <Input
          placeholder="Icon"
          value={newLink.icon}
          onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
        />
        <Input
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <Button type="submit">Add Link</Button>
      </form>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id} className="flex justify-between items-center">
            <span>
              {link.platform}: {link.url}
            </span>
            <Button
              onClick={() => handleDeleteLink(link.id)}
              variant="destructive"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
