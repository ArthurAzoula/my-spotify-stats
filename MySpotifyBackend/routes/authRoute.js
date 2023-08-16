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
  
  // console.log(`token data : ${Object.values(tokenData)}`)

  req.session.access_token = tokenData.access_token;

  res.send('Authorization successful!');
});

module.exports = router;
