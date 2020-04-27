const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Importing all routes */
const authRoute = require('./routes/auth');

/* setup template engine */
app.set('view engine', 'ejs');
app.set('views', 'views');

/* setup middleware */
app.use(express.static(__dirname + '/public'));

/* Use routes */
app.use(authRoute);

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
