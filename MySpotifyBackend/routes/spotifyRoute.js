// spotifyRoute.js

const express = require('express');
const spotifyController = require('../controllers/spotifyController')


const router = express.Router();

router.get('/', spotifyController.home)

module.exports = router;