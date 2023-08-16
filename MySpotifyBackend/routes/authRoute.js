// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', (req, res) => {
  const authUrl = authController.buildAuthUrl();
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  const tokenData = await authController.exchangeCodeForToken(code);

  // Gère ici la logique pour stocker les tokens, par exemple, dans une session
  
  console.log(`token ID : ${tokenData._id}`)

  res.send('Authorization successful!');
});

module.exports = router;
