// services/spotifyService.js (ESM)
import axios from 'axios';
import querystring from 'querystring';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

let spotifyAccessToken = null;
let tokenExpiryTime = 0;

async function getSpotifyAccessToken() {
  if (spotifyAccessToken && Date.now() < tokenExpiryTime) {
    return spotifyAccessToken;
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const data = response.data;
    spotifyAccessToken = data.access_token;
    tokenExpiryTime = Date.now() + data.expires_in * 1000;

    return spotifyAccessToken;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.message);
    throw error;
  }
}

export async function searchTrack(title, artist, album) {
  try {
    const token = await getSpotifyAccessToken();

    let query = `track:${title}`;
    if (artist) {
      query += ` artist:${artist}`;
    }
    if (album) {
      query += ` album:"${album}"`;
    }


    const url = `https://api.spotify.com/v1/search?${querystring.stringify({
      q: query,
      type: 'track',
      limit: 1
    })}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const tracks = response.data.tracks.items;
    if (tracks.length === 0) {
      return null;
    }

    const track = tracks[0];
    return {
      spotify_id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      album_art_url: track.album.images.length > 0 ? track.album.images[0].url : null,
      preview_url: track.preview_url
    };
  } catch (error) {
    console.error('Error searching track in Spotify:', error.message);
    return null;
  }
}