exports.getRegister = (req, res, next) => {
  res.render('patient/register', {
    pageTitle: 'Register',
    path: '/register',
    isLoggedIn: true,
    error: {
      status: false,
      errorMessage: '',
    },
  });
};

exports.postRegister = (req, res, next) => {};
