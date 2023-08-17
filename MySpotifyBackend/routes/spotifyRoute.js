const express = require('express');
const spotifyController = require('../controllers/spotifyController')

const router = express.Router();

// Informations sur l'utilisateur
router.get('/me', spotifyController.getUserInfo);

// Morceaux joués récemment
router.get('/player/recently-played', spotifyController.getRecentlyPlayed);

// Playlists sauvegardées par l'utilisateur
router.get('/playlists', spotifyController.getUserPlaylists);

// Recommandation pour l'utilisateur
router.get('/recommendations', spotifyController.getUserRecommendations);

// Artistes suivis
router.get('/following', spotifyController.getFollowedArtists);

// Statistiques d'écoute des morceaux les plus écoutés
router.get('/top/tracks', spotifyController.getTopTracks);

// Statistiques d'écoute des artistes les plus écoutés
router.get('/top/artists', spotifyController.getTopArtists);

// Statistiques d'écoute des albums les plus écoutés
router.get('/top/albums', spotifyController.getTopAlbums);

// Statistiques d'écoute des genres les plus écoutés
router.get('/top/genres', spotifyController.getTopGenres);

module.exports = router;
