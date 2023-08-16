const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

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

// Install global middleware
// app.use(error); <- Retire également cette ligne

// ... Ajoute ici tes configurations de routes et middleware

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
