{
  /**import { prisma } from "@/lib/prisma";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

async function refreshAccessToken() {
  const data = await spotifyApi.refreshAccessToken();
  spotifyApi.setAccessToken(data.body["access_token"]);
}

export async function getCurrentTrack() {
  try {
    await refreshAccessToken();
    const data = await spotifyApi.getMyCurrentPlayingTrack();

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

export async function getDefaultTrack() {
  const defaultTrack = await prisma.musicPlayer.findFirst();
  if (defaultTrack) {
    return {
      name: defaultTrack.trackName,
      artist: defaultTrack.artistName,
      album: defaultTrack.albumName,
      albumArt: defaultTrack.albumArt,
      isCurrentlyPlaying: false,
    };
  }
  return null;
}
*/
}
