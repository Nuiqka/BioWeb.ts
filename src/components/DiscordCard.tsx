"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getLanyardData } from "@/services/lanyardService";

export default function DiscordCard({
  isDarkMode,
  discordId,
}: {
  isDarkMode: boolean;
  discordId: string;
}) {
  const [discordData, setDiscordData] = useState<any>(null);
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBg = isDarkMode ? "bg-[#150027]/40" : "bg-white/70";
  const cardBorder = isDarkMode ? "border-white/10" : "border-gray-200";

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const data = await getLanyardData(discordId);
        setDiscordData(data);
      } catch (error) {
        console.error("Failed to fetch Discord data:", error);
      }
    };

    fetchDiscordData();
    const interval = setInterval(fetchDiscordData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [discordId]);

  if (!discordData) return null;

  return (
    <div
      className={`${cardBg} backdrop-blur-xl rounded-2xl p-4 ${cardBorder} border transition-colors duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden">
            <Image
              src={`https://cdn.discordapp.com/avatars/${discordId}/${discordData.discord_user.avatar}.png`}
              alt="Discord Avatar"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={textColor}>
                @{discordData.discord_user.username}
              </span>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                {discordData.discord_status}
              </span>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {discordData.activities[0]?.state || "No current activity"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className={`${
            isDarkMode
              ? "bg-purple-500/10 border-purple-500/20 text-white hover:bg-purple-500/20"
              : "bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200"
          } transition-colors duration-300`}
        >
          Add on Discord
        </Button>
      </div>
    </div>
  );
}
