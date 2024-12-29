// tests/services/spotifyService.test.js
import axios from 'axios';
import { searchTrack } from '../../services/spotifyService.js';

jest.mock('axios');

describe('spotifyService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('searchTrack returns track data', async () => {
    // 1. Mock token request
    axios.post.mockResolvedValueOnce({
      data: { access_token: 'fake_token', expires_in: 3600 }
    });

    // 2. Mock search response
    axios.get.mockResolvedValueOnce({
      data: {
        tracks: {
          items: [
            {
              id: 'track123',
              name: 'Song A',
              artists: [{ name: 'Artist A' }],
              album: { images: [{ url: 'http://image.url' }] },
              preview_url: 'http://preview.url'
            }
          ]
        }
      }
    });

    const track = await searchTrack("Song A", "Artist A");
    expect(track).toEqual({
      spotify_id: 'track123',
      title: 'Song A',
      artist: 'Artist A',
      album_art_url: 'http://image.url',
      preview_url: 'http://preview.url'
    });
  });

  test('searchTrack returns null if no tracks found', async () => {
    // Token fetch
    axios.post.mockResolvedValueOnce({
      data: { access_token: 'fake_token', expires_in: 3600 }
    });

    // Empty items
    axios.get.mockResolvedValueOnce({
      data: { tracks: { items: [] } }
    });

    const track = await searchTrack("Random Song", "Random Artist");
    expect(track).toBeNull();
  });

  test('searchTrack handles errors gracefully', async () => {
    // Token fetch
    axios.post.mockResolvedValueOnce({
      data: { access_token: 'fake_token', expires_in: 3600 }
    });

    // Force error
    axios.get.mockRejectedValueOnce(new Error('Spotify error'));

    const track = await searchTrack("Song X", "Artist X");
    expect(track).toBeNull();
  });
});
