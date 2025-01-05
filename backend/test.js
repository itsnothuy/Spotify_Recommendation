import { searchTrack } from './services/spotifyService.js';

(async () => {
  const result = await searchTrack('Blinding Lights', 'The Weeknd', 'After Hours');
  console.log('Search Track Result:', result);
})();

import { likeTrack } from './services/spotifyService.js';

(async () => {
  const accessToken = 'your_valid_user_access_token';
  const trackId = '0VjIjW4GlUZAMYd2vXMi3b'; // Example ID
  const result = await likeTrack(accessToken, trackId);
  console.log('Like Track Result:', result);
})();


import { addToPlaylist } from './services/spotifyService.js';

(async () => {
  const accessToken = 'your_valid_user_access_token';
  const playlistId = 'your_playlist_id';
  const trackUri = 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b';
  const result = await addToPlaylist(accessToken, playlistId, trackUri);
  console.log('Add to Playlist Result:', result);
})();