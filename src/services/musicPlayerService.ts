import { prisma } from "@/lib/prisma";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

async function refreshAccessToken(profileId: string) {
  const profile = await prisma.profile.findUnique({ where: { id: profileId } });
  if (!profile || !profile.spotifyRefreshToken) {
    throw new Error("No Spotify refresh token found");
  }

  spotifyApi.setRefreshToken(profile.spotifyRefreshToken);
  const data = await spotifyApi.refreshAccessToken();

  await prisma.profile.update({
    where: { id: profileId },
    data: { spotifyAccessToken: data.body["access_token"] },
  });

  spotifyApi.setAccessToken(data.body["access_token"]);
}

export async function getCurrentTrack(profileId: string) {
  const profile = await prisma.profile.findUnique({ where: { id: profileId } });
  if (!profile || !profile.isSpotifyEnabled) {
    return null;
  }

  try {
    await refreshAccessToken(profileId);
    const data = await spotifyApi.getMyCurrentPlaybackState();

    if (data.body && data.body.is_playing && data.body.item) {
      const track = data.body.item;
      return {
        name: track.name,
        artist: track.artists[0]?.name ?? "Unknown Artist",
        album: track.album?.name ?? "Unknown Album",
        albumArt: track.album?.images[0]?.url ?? "/placeholder.png",
        isCurrentlyPlaying: true,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching current track:", error);
    return null;
  }
}

export async function getDefaultTrack(profileId: string) {
  const musicPlayer = await prisma.musicPlayer.findUnique({
    where: { profileId },
  });
  if (musicPlayer) {
    return {
      name: musicPlayer.trackName,
      artist: musicPlayer.artistName,
      album: musicPlayer.albumName,
      albumArt: musicPlayer.albumArt,
      isCurrentlyPlaying: false,
    };
  }
  return null;
}

export async function updateDefaultTrack(profileId: string, data: any) {
  return prisma.musicPlayer.upsert({
    where: { profileId },
    update: data,
    create: { ...data, profileId },
  });
}
