const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const UserKey = require("../models/UserKey");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    oldInput: null,
    error: {
      status: false,
      errorMessage: null,
    },
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  let requestedUser = null;
  User.findOne({ username: req.body.username })
    .then((user) => {
      requestedUser = user;
      if (!requestedUser) {
        console.log("User not found.!");
        return res.json({
          error: {
            status: true,
            errorMessage: "Invalid login credentials",
          },
        });
      }
      bcrypt
        .compare(req.body.password, requestedUser.password)
        .then((doMatch) => {
          console.log("Password matched", doMatch);
          if (!doMatch) {
            console.log("Password not matched..");
            return res.json({
              error: {
                status: true,
                errorMessage: "Invalid login credentials",
              },
            });
          }
          req.session.isLoggedIn = true;
          req.session.user = requestedUser;
          return req.session.save((err) => {
            return res.json({
              error: {
                status: false,
                error: null,
              },
            });
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res, next) => {
  return req.session.destroy((err) => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  return res.render("auth/signup", {
    pageTitle: "SignUp",
    path: "/signup",
    oldInput: null,
    error: {
      status: false,
      errorMessage: null,
    },
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  console.log("Form errors: ", errors.array());
  if (!errors.isEmpty()) {
    return res.render("auth/signup", {
      pageTitle: "signup",
      path: "/signup",
      oldInput: {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        key: req.body.key,
      },
      error: {
        status: true,
        errorMessage: errors.array()[0].msg,
      },
      isLoggedIn: req.session.isLoggedIn,
    });
  }

  UserKey.findOne({})
    .then((oneTimeKey) => {
      if (oneTimeKey.key.toString() !== req.body.key.toString()) {
        return res.render("auth/signup", {
          pageTitle: "signup",
          path: "/signup",
          oldInput: {
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            key: req.body.key,
          },
          error: {
            status: true,
            errorMessage: "One Time key is not authorized.!",
          },
          isLoggedIn: req.session.isLoggedIn,
        });
      }
      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        role: 2,
      });
      return user.save();
    })
    .then((user) => {
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCreateUser = (req, res, next) => {
  res.render("auth/create-user", {
    pageTitle: "signup",
    path: "/signup",
    oldInput: {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      key: req.body.key,
    },
    error: {
      status: false,
      errorMessage: null,
    },
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postCreateUser = (req, res, next) => {
  console.log("[Auth.js]", req.body);
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("auth/create-user", {
      pageTitle: "create-user",
      path: "/create-user",
      oldInput: {
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      },
      error: {
        status: true,
        errorMessage: errors.array()[0].msg,
      },
      isLoggedIn: req.session.isLoggedIn,
    });
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.render("auth/signup", {
          pageTitle: "create-user",
          path: "/create-user",
          oldInput: {
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
          },
          error: {
            status: true,
            errorMessage: "The user already exist with this same username.!",
          },
          isLoggedIn: req.session.isLoggedIn,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPassword) => {
      console.log("Password hashed");
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        role: 1,
      });
      return user.save();
    })
    .then((user) => {
      console.log("Sucessful registered user");
      res.redirect("/create-user");
    })
    .catch((err) => {
      console.log(err);
    });
};
