// authController.js
const fetch = require('node-fetch');
const querystring = require('querystring');
const dotenv = require('dotenv');

// Lire les données du .env
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.SECRET_ID;
const REDIRECT_URI = 'http://localhost:3000/auth/callback';
const SCOPES = 'user-read-private user-read-email user-top-read user-library-read user-read-recently-played ';

const authController = {
  buildAuthUrl: () => {
    const params = querystring.stringify({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params}`;
    return authUrl;
  },

  exchangeCodeForToken: async (code) => {
    const tokenRequestData = querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenRequestData,
    });

    const tokenData = await tokenResponse.json();
    return tokenData;
  },

  logout : async (req, res) => {
    try {
      res.cookie('token', '', { maxAge : 2000, httpOnly : true, sameSite : 'strict'});
      res.status(200).redirect('localhost:3001/');
    } catch(error) {
      console.log(`erreur de déconnexion : ${error.message}`);
      res.status(500).redirect('/localhost:3001/');
    }
  }

  // Autres méthodes liées à l'authentification
};

module.exports = authController;
