const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    oldInput: null,
    error: {
      status: false,
      errorMessage: null,
    },
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log('request body', req.body);
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      console.log('user', user);
      if (!user) {
        console.log('Invalid login');
        return res.json({
          error: {
            status: true,
            errorMessage: 'Invalid login credentials',
          },
        });
      }
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log('[error]', err);
        return res.json({
          error: {
            status: false,
            error: null,
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res, next) => {
  return req.session.destroy((err) => {
    res.redirect('/login');
  });
};
