const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('login/login');
};

exports.postLogin = (req, res, next) => {
  User.findOne(req.body)
    .then((user) => {
      if (!user) {
        console.log('Invalid user');
      }
      console.log('Login successfull');
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
