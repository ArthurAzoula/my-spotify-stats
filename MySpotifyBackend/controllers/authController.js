// authController.js
//const fetch = require('node-fetch');
const querystring = require('querystring');

const CLIENT_ID = 'c17101d3ed1d44fc943329fe3cd447fb';
const CLIENT_SECRET = '4fb43990c51f4605ac4481cf9b0dce1c';
const REDIRECT_URI = 'http://localhost:3000/auth/callback';
const SCOPES = 'user-read-private user-read-email user-top-read user-library-read';

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

  // Autres méthodes liées à l'authentification
};

module.exports = authController;
