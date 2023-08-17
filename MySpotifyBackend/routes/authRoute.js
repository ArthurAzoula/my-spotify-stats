// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', (req, res) => {
  const authUrl = authController.buildAuthUrl();
  res.redirect(authUrl);
});

router.get('/logout', authController.logout);

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  const tokenData = await authController.exchangeCodeForToken(code);

  // Stocker le token dans la session
  req.session.access_token = tokenData.access_token;

  // Indiquer que la connexion a réussi
  req.session.loggedIn = true;

  const redirectUrl = 'http://localhost:3001/';

  res.redirect(redirectUrl);
});

// Ajout une route pour vérifier l'état de connexion
router.get('/check-loggedin', (req, res) => {
  const loggedIn = req.session.loggedIn || false; // Par défaut, l'utilisateur n'est pas connecté
  res.json({ loggedIn });
});


module.exports = router;
