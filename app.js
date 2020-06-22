// require express
const express = require('express');
const app = express();

// requiring built-in middleware
const bodyParser = require('body-parser');

// require mongoose
const mongoose = require('mongoose');

/* importing models */
const User = require('./models/user');

// mongoDB session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Environmental variable
require('dotenv').config();

/* setup mongoDB store for session */
const store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'session',
});

/* Session middleware */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Importing all routes */
const authRoute = require('./routes/auth');
const patientRoute = require('./routes/patient');

/* setup template engine */
app.set('view engine', 'ejs');
app.set('views', 'views');

/* setup middleware */
app.use(express.static(__dirname + '/public'));

/* Middleware */
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Use routes */
app.use(authRoute);
app.use(patientRoute);
app.use((req, res, next) => {
  res.render('error/404.ejs', {
    pageTitle: 'SignUp',
    path: '/signup',
    oldInput: null,
    error: {
      status: false,
      errorMessage: null,
    },
    isLoggedIn: req.session.isLoggedIn,
  });
});

/* MongoDB connection */

mongoose
  .connect(process.env.DATABASE)
  .then((res) => {
    console.log('DB CONNECTED');
    app.listen(process.env.PORT, () => {
      console.log('SERVER RUNNING.');
    });
  })
  .catch((err) => {
    console.log(err);
  });
