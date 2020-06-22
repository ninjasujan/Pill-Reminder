const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isAdmin, isAuth } = require("../middleware/isAuth");

/* importing all functions of controller */
const {
  getLogin,
  postLogin,
  logout,
  getSignup,
  postSignup,
  getCreateUser,
  postCreateUser,
} = require("../controllers/auth");

router.get("/login", getLogin);

router.post(
  "/login",
  [
    body("username").custom((username, { req }) => {
      req.body.username = username.toLowerCase();
      return true;
    }),
  ],
  postLogin
);

router.get("/logout", logout);

router.get("/signup", getSignup);

router.post(
  "/signup",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("User Name should not be empty")
      .isLength({ min: 8 })
      .withMessage("User Name must be at least 8 Character in length")
      .custom((username, { req }) => {
        req.body.username = username.toLowerCase();
        return true;
      }),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 character long.!")
      .matches(/\d/)
      .withMessage("Password must contain at least one digit.!")
      .trim(),
    body("confirmPassword")
      .not()
      .isEmpty()
      .withMessage("Confirm password should not be empty.!")
      .custom((password, { req }) => {
        if (password != req.body.password) {
          return Promise.reject(
            "Password should match with confirm Password.!"
          );
        }
        return true;
      }),
    body("key")
      .not()
      .isEmpty()
      .withMessage("Key field is required to sign in as super admin.!"),
  ],
  postSignup
);

router.get("/create-user", isAuth, isAdmin, getCreateUser);

router.post(
  "/create-user",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("User Name should not be empty.!")
      .isLength({ min: 8 })
      .withMessage("User Name must be at least 8 Character in length")
      .custom((username, { req }) => {
        req.body.username = username.toLowerCase();
        console.log("[Auth.js]", req.body);
        return true;
      }),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 character long.!")
      .matches(/\d/)
      .withMessage("Password must contain at least one digit.!")
      .trim(),
    body("confirmPassword")
      .not()
      .isEmpty()
      .withMessage("Confirm password should not be empty.!")
      .custom((password, { req }) => {
        if (password != req.body.password) {
          return Promise.reject(
            "Password should match with confirm Password.!"
          );
        }
        return true;
      }),
  ],
  isAuth,
  isAdmin,
  postCreateUser
);

module.exports = router;
