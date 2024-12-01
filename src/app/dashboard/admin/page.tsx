"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { getPublicMode, setPublicMode } from "@/services/settingsService";

export default function AdminDashboard() {
  const [isPublicMode, setIsPublicMode] = useState(false);

  useEffect(() => {
    const fetchPublicMode = async () => {
      const mode = await getPublicMode();
      setIsPublicMode(mode);
    };
    fetchPublicMode();
  }, []);

  const handleTogglePublicMode = async () => {
    await setPublicMode(!isPublicMode);
    setIsPublicMode(!isPublicMode);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Switch
          checked={isPublicMode}
          onCheckedChange={handleTogglePublicMode}
          id="public-mode"
        />
        <label htmlFor="public-mode">
          {isPublicMode ? "Public Mode" : "Private Mode"}
        </label>
      </div>
      {/* Ajoutez d'autres options d'administration ici */}
    </div>
  );
}
