interface LanyardData {
  discord_user: {
    username: string;
    avatar: string;
    discriminator: string;
  };
  discord_status: string;
  activities: Array<{
    name: string;
    state?: string;
    details?: string;
    type: number;
  }>;
}

export async function getLanyardData(discordId: string): Promise<LanyardData> {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${discordId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Lanyard data");
  }
  const data = await response.json();
  return data.data;
}
