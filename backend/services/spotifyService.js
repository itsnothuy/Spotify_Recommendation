// services/spotifyService.js (ESM)
import axios from 'axios';
import querystring from 'querystring';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;



/**
 * -------------------------------------------------------------------
 * PART 1: CLIENT-CREDENTIALS (for searching tracks without user login)
 * -------------------------------------------------------------------
 */

let spotifyAccessToken = null;
let tokenExpiryTime = 0;

/**
 * Obtain a client-credentials token for searching tracks, etc.
 */
async function getSpotifyAccessToken() {
  // If we already have a token and it's not expired, return it
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

/**
 * Search for a single track by title/artist/album using client-credentials.
 */
export async function searchTrack(title, artist, album) {
  try {
    const token = await getSpotifyAccessToken();

    let query = `track:${title}`;
    if (artist) {
      query += ` artist:${artist}`;
    }
    if (album) {
      // album might have spaces, so wrap in quotes
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
    if (!tracks || tracks.length === 0) {
      return null;
    }

    const track = tracks[0];
    return {
      spotify_id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      album_art_url: track.album.images.length > 0 ? track.album.images[0].url : null,
      preview_url: track.preview_url,
      uri: track.uri,
    };
  } catch (error) {
    console.error('Error searching track in Spotify:', error.message);
    return null;
  }
}



/**
 * -------------------------------------------------------------------
 * PART 2: USER-BASED OAUTH FLOW (to let users "like" songs, playlists, etc.)
 * -------------------------------------------------------------------
 */

/**
 * Scopes required to save (like) a song or add to playlists.
 * Adjust if you only need some of them.
 */
const SCOPES = [
  'user-library-modify',
  'playlist-modify-public',
  'playlist-modify-private',
].join(' ');

/**
 * 1) Construct the Spotify login URL
 */
export function getSpotifyLoginUrl(state) {
  // `state` is optional but recommended for CSRF protection
  const params = {
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: SCOPES,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  };
  if (state) {
    params.state = state;
  }

  // Forcing login dialog each time (optional):
  // params.show_dialog = 'true';

  const queryStr = querystring.stringify(params);
  return `https://accounts.spotify.com/authorize?${queryStr}`;
}


/**
 * 2) Exchange authorization code for an access/refresh token
 */
export async function getUserTokens(code) {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const bodyParams = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' +
      Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
        'base64'
      ),
  };

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify(bodyParams),
      { headers }
    );
    return response.data; // { access_token, refresh_token, expires_in, ... }
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response?.data);
    throw error;
  }
}


/**
 * 3) Refresh a user's access token
 */
export async function refreshUserToken(refreshToken) {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const bodyParams = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' +
      Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
        'base64'
      ),
  };

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify(bodyParams),
      { headers }
    );
    return response.data; // { access_token, expires_in, ... }
  } catch (error) {
    console.error('Error refreshing Spotify token:', error.response?.data);
    throw error;
  }
}


/**
 * 4) "Like" (save) a track for the user (requires user-library-modify scope)
 */
export async function likeTrack(accessToken, trackId) {
  try {
    if (!accessToken) {
      throw new Error('No access token provided for likeTrack()');
    }
    if (!trackId) {
      throw new Error('No trackId provided');
    }

    const endpoint = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;
    const response = await axios.put(endpoint, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // On success, Spotify returns 200 or 201 with an empty body
    return { success: true, status: response.status };
  } catch (error) {
    console.error('Error liking track:', error.response?.data || error.message);
    throw error;
  }
}


/**
 * 5) Add a track to a playlist for the user (requires playlist-modify-* scope)
 * Note: trackUri should look like "spotify:track:123ABC..."
 */
export async function addToPlaylist(accessToken, playlistId, trackUri) {
  try {
    if (!accessToken) {
      throw new Error('No access token provided for addToPlaylist()');
    }
    if (!playlistId || !trackUri) {
      throw new Error('Missing playlistId or trackUri');
    }

    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const response = await axios.post(
      endpoint,
      { uris: [trackUri] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // On success, returns status 201 with snapshot_id in body
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    console.error('Error adding track to playlist:', error.response?.data || error.message);
    throw error;
  }
}