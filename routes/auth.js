const express = require('express');
const router = express.Router();

/* importing all functions of controller */
const {
  getLogin,
  postLogin,
  logout,
  getSignup,
} = require('../controllers/auth');

/* Importing auth middleware */
const { isAuth } = require('../middleware/isAuth');

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/logout', logout);

router.get('/signup', getSignup);

module.exports = router;
