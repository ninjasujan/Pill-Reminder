const express = require('express');
const router = express.Router();

/* importing all functions of controller */
const { getLogin, postLogin } = require('../controllers/auth');

/* Importing auth middleware */
const { isAuth } = require('../middleware/isAuth');

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/register', isAuth, (req, res, next) => {
  console.log('new register request');
  res.render('auth/simple', {
    path: '/register',
    pageTitle: 'Registration',
    error: {
      status: false,
      errorMessage: '',
    },
    isLoggedIn: true,
  });
});

module.exports = router;
