import { generateCodeChallenge, generateCodeVerifier } from "./pkcs";

const clientId = 'ff477fd26c104765bd85f53d400888c4';
const redirectUri = 'https://65407de4d87e.ngrok-free.app/';
let accessToken;
let tokenExpirationTime;

const Spotify = {
  async authorize() {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    // Save the verifier for use after redirect
    localStorage.setItem('verifier', verifier);

    const scope = 'playlist-modify-public';

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&code_challenge_method=S256&code_challenge=${challenge}`;

    window.location.href = authUrl;
  },

  async getAccessToken() {
    if (accessToken && Date.now() < tokenExpirationTime) {
      return accessToken;
    }

    const code = new URLSearchParams(window.location.search).get('code');
    const verifier = localStorage.getItem('verifier');

    console.log('Authorization code:', code);
    console.log('Code verifier:', verifier);

    if (!code) {
      await Spotify.authorize();
      return;
    }

    if (!verifier) {
      console.error('No code verifier found. Restarting auth flow...');
      await Spotify.authorize();
      return;
    }

    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    }).toString();

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to get access token:', error);
      return null;
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpirationTime = Date.now() + data.expires_in * 1000;

    // Clear URL params
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, "/");
    }

    // Clear stored verifier
    localStorage.removeItem('verifier');

    return accessToken;
  },

  async search(term) {
    const token = await this.getAccessToken();
    console.log('Token:', token);
    if (!token) return [];

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jsonResponse = await response.json();
      console.log('Spotify search response:', jsonResponse);

      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error('Spotify search failed', error);
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    const token = await this.getAccessToken();
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers,
      });
      const userData = await userResponse.json();
      const userId = userData.id;

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ name }),
        }
      );

      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      return fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ uris: trackUris }),
        }
      );
    } catch (error) {
      console.error('Failed to save playlist:', error);
    }
  },
};

export default Spotify;
