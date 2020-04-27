const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const 

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

const port = 3000;
app.listen(port, () => {
  console.log('server is running');
});
