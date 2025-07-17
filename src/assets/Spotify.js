const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://127.0.0.1:5173/';
const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
];


const Spotify = {
    getAccessToken() {
        const accessTokenMatch = window.location.href.match(/acess_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);


        if (acessToken && expiresInMatch) {
            const accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}`;
            window.location = authUrl;
        }
    }
}


export default Spotify;