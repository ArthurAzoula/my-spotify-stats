const fetch = require('node-fetch');
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

const handleAPIError = (res, error) => {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the Spotify API.' });
};

const getUserInfo = async (req, res) => {
    try {
        const token = req.session.access_token; // Récupère l'access token de la requête
        const user = await fetch(`${SPOTIFY_API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const userData = await user.json();
        res.status(200).json(userData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getRecentlyPlayed = async (req, res) => {
    try {
        const limit = 20;
        const token = req.session.access_token;

        const recently = await fetch(`${SPOTIFY_API_URL}/me/player/recently-played?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const recentlyData = await recently.json();
        res.status(200).json(recentlyData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getUserPlaylists = async (req, res) => {
    try {
        const token = req.session.access_token;
        const playlists = await fetch(`${SPOTIFY_API_URL}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const playlistsData = await playlists.json();
        res.status(200).json(playlistsData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getUserRecommendations = async (req, res) => {
    try {
        const limit = 20;
        const market = req.params.market;
        const seedArtist = req.params.seedArtist;
        const seedTracks = req.params.seedTracks;
        const token = req.session.access_token; // Retirez l'espace après req.session
        const recommandations = await fetch(`${SPOTIFY_API_URL}/recommendations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const recommandationData = await recommandations.json();
        res.status(200).json(recommandationData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getFollowedArtists = async (req, res) => {
    try {
        const token = req.session.access_token;
        const artists = await fetch(`${SPOTIFY_API_URL}/me/following?type=artist`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const artistsData = await artists.json();
        res.status(200).json(artistsData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getTopTracks = async (req, res) => {
    try {
        const limit = 20;
        const token = req.session.access_token;
        const tracks = await fetch(`${SPOTIFY_API_URL}/me/top/tracks?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const tracksData = await tracks.json();
        res.status(200).json(tracksData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getTopArtists = async (req, res) => {
    try {
        const limit = 20;
        const token = req.session.access_token;
        const artists = await fetch(`${SPOTIFY_API_URL}/me/top/artists?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const artistsData = await artists.json();
        res.status(200).json(artistsData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getTopAlbums = async (req, res) => {
    try {
        const limit = 20;
        const token = req.session.access_token;
        const albums = await fetch(`${SPOTIFY_API_URL}/me/albums?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const albumsData = await albums.json();
        res.status(200).json(albumsData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

const getTopGenres = async (req, res) => {
    try {
        const limit = 20;
        const token = req.session.access_token;
        const genres = await fetch(`${SPOTIFY_API_URL}/me/genres?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const genresData = await genres.json();
        res.status(200).json(genresData);
    } catch (err) {
        handleAPIError(res, err);
    }
}

module.exports = {
    getUserInfo,
    getRecentlyPlayed,
    getUserPlaylists,
    getFollowedArtists,
    getTopTracks,
    getTopArtists,
    getTopAlbums,
    getTopGenres,
    getUserRecommendations,
};
