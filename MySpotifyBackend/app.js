const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const spotifyRoutes = require('./routes/spotifyRoute');
const session = require('express-session');
const dotenv = require('dotenv');


// database

// define routers
// const error = require('./routes/error.route'); <- Retire cette ligne

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

const SECRET_SESSION = process.env.SESSION_SECRET || 'default_secret';

// session
app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
  }
}))

// Install global middleware
// app.use(error); <- Retire également cette ligne

app.use('/spotify', spotifyRoutes)
app.use('/auth', authRoutes);

// ... Ajoute ici tes configurations de routes et middleware

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
